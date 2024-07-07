import * as userService from "../services/userService.js"

export const getUserInfo = async(req, res) =>{
    try {
        const userToCheck = req.params.id
        console.log(userToCheck)
        const result = await userService.getUserInfo(userToCheck)
        res.status(200).json(result)
    }
    catch(err){
       res.status(500).json({message: error.message}) 
    }
}