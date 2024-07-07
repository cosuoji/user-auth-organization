import jwt from "jsonwebtoken"
import blacklist from "../database/schema/blacklistSchema.js";
import { tokenToUse } from "../controllers/authController.js"
export let userId, emailId
import Organization from "../database/schema/organizationSchema.js";


const JWT_SECRET= process.env.JWT_SECRET || "testkey"


export const authMiddleware = async (req, res, next) =>{
        // set the retrieved token to authorization
    const authorization = tokenToUse;
    const checkIfBlackListed = await blacklist.findOne({token: tokenToUse});
    //const organizations = await Organization.find()

    if(checkIfBlackListed){
        return res
            .status(401)
            .json({message: "This session has expired. Please login"})
    }


    if(!authorization){
        return res.status(401).json({message: "Not Authorized to view this page"})
    }

    

      jwt.verify(authorization, JWT_SECRET, (err, decoded)=>{
        if(err){
            return res.status(401).json({message: "Unauthorized"})
        }

        
        req.user = decoded
        emailId = decoded.email
        userId = decoded._id
        next();
    })

}




