import ErrorWithStatus from "../exceptions/errorStatus.js";
import { userId } from "../middleware/authMiddleware.js";
import User from "../database/schema/userSchema.js";
import Organization from "../database/schema/organizationSchema.js";

export const getOrganizations = async() =>{
    try{
        const result = await User.findById(userId)
        return{
             "status": "success",
		     "message": "He's the info you requested ",
              "data": {
                 "organisations": result.organization
              }
}

    } catch(error){
        throw new ErrorWithStatus(error.message, 500)
    }
}

export const getOrganizationInfo = async(orgId) =>{
    try{
        const organztionInfo = await Organization.findById(orgId)
        return {
            "status": "success",
            "message": "Here's the organization info",
            "data": {
                    "orgId": organztionInfo._id, // Unique
                    "name": organztionInfo.name, // Required and cannot be null
                    "description": organztionInfo.description
	}
}
    } catch(error){
        throw new ErrorWithStatus(error.message, 500)
        }
}

export const addOrganization = async(name, description)=>{
    try{
        const organization = new Organization({name, description})
        await organization.save()
        return {
        "status": "success",
        "message": "Organisation created successfully",
        "data": {
            "orgId": organization._id, 
            "name": organization.name, 
            "description": organization.description
        }
}
    } catch(error){
        return {
            status: "Bad Request",
            message: "Client Error"
        }
    }
}

export const addUserToOrganization = async(userId, orgId) =>{
    try{
        console.log(userId)
        const organizationToAddTo = await Organization.findOne({_id: orgId});
        console.log(organizationToAddTo)
        if(organizationToAddTo){
        // organizationToAddTo.users.push(userId)
        await organizationToAddTo.users.push(userId);
        organizationToAddTo.save(done)
        }
         else{
            throw new ErrorWithStatus("Org doesn't exist", 400)
        }

    } catch(error){
        throw new ErrorWithStatus(error.message, 400)
    }
}

