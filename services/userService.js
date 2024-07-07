import User from "../database/schema/userSchema.js";
import { userId } from "../middleware/authMiddleware.js";
import ErrorWithStatus from "../exceptions/errorStatus.js";


export const getUserInfo = async(userToCheck) =>{
    try{
        const user = await User.findById(userToCheck);
        if(user){
            return {
                "status": "success",
                "message": "This is the user info you requested",
                "data": {
                "userId": user._id,
                "firstName": user.firstName,
                "lastName": user.lastName,
                "email": user.email,
                "phone": user.phone,
                        }
            }
        }

    } catch(error){
        throw new ErrorWithStatus(error.message, 500)
    }
}