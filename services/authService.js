import User from "../database/schema/userSchema.js";
import Organization from "../database/schema/organizationSchema.js"
import ErrorWithStatus from "../exceptions/errorStatus.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import blacklist from "../database/schema/blacklistSchema.js";
const JWT_SECRET = process.env.JWT_SECRET || "testkey";


export const login = async (email, password) =>{
    try{
            //check if email exists
    const user = await User.findOne({email})
    if(!user){
        throw new ErrorWithStatus("user not found, 404")
    }

    //Check if password works

    if(!bcrypt.compareSync(password, user.password)){
        throw new ErrorWithStatus("username or password incorrect", 400)
    }

    //Generate the JWT Token
   
    const token = jwt.sign({
        email: user.email,
        _id: user._id,
        sub: user._id
    },

        //Set it to expire in an hour
        JWT_SECRET, {expiresIn: "1hr"}   
)


        return{
            status: "success",
            message: "Login Successful",
            data: { 
            accessToken : token,
            user: {
                userId: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone
                 }
            }
        }
    }
    catch(err){
        return {
            status: "Bad Request",
            message: "Authentication Failed",
            message: err.message,
            statusCode: 401
        }
    }

}

export const register = async (firstName,lastName, email, password, phone) =>{
    //check if email exists
try{
    const user = await User.findOne({email})
    if(user){
        throw new ErrorWithStatus("user already exists", 400)
    }

    password = await bcrypt.hash(password, 10);


    let organizationName = firstName + "-organization";
    const newOrganization = new Organization({name: organizationName})
    await newOrganization.save()

    const newUser = new User({
        firstName,lastName, password,email, phone, organization: [newOrganization] 
    })

    Organization.updateOne(
        {_id: newUser.id},
        {$addToSet: {users: [newUser.id]}},
    )    

    //Generate login token
    const token = jwt.sign({
        email: newUser.email,
        _id: newUser._id,
        sub: newUser._id
    },

        //Set it to expire in an hour
        JWT_SECRET, {expiresIn: "1hr"})

    await newUser.save()
 
    return {
        status: "Success",
        message: "Registration successful",
        data: {
        accessToken: token,
         user: {
	      userId: newUser._id,
	      firstName: newUser.firstName,
	      lastName: newUser.lastName,
		  email: newUser.email,
		  phone: newUser.phone
          }
        }
    }

}catch(error){
    return {
    "status": "Bad request",
    "message": "Registration unsuccessful",
    "error": error.message,
    "statusCode": 400 
    }
}

}


export const logout = async(tokenToUse) =>{
    try{
    const checkIfBlackListed = await blacklist.findOne({token: tokenToUse});
    if(checkIfBlackListed) return res.sendStatus(204);
    const newBlacklist = new blacklist({
        token: tokenToUse
    });

    await newBlacklist.save();

    return {
        message: "You have been logged out",
    }
    }

    catch(err){
        return {
            "status": err
        }
    }
}