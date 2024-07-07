import * as organizationService from "../services/organizationService.js"

export const getOrganizations = async(req, res) =>{
try{
    const result = await organizationService.getOrganizations();
    console.log(result)
    res.status(200).json(result)
} catch(error){
    res.status(500).json(error)
}
}

export const getOrganizationInfo = async(req, res)=>{
    try{
        const orgId = req.params.orgid
        const result = await organizationService.getOrganizationInfo(orgId)
        res.status(200).json(result)

    } catch(error){
        res.status(500).json(error)
    }
}

export const addOrganization = async(req, res)=>{
    try{
        const {name, description} = req.body;
        const result = await organizationService.addOrganization(name, description);
        res.status(201).json(result) 
    } catch(error){
        res.status(400).json(error)
    }
}

export const addUserToOrganization = async(req, res) =>{
    try{
        const {userId} = req.body;
        const orgId = req.params.orgid
        const result = await organizationService.addUserToOrganization(userId, orgId);
        res.status(201).json(result)
    }  catch(error){
        res.status(400).json(error)
    }
}
