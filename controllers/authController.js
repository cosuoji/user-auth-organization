import * as authService from "../services/authService.js"
export let tokenToUse



export const login = async (req, res, next)=>{
    try {
        const { email, password} = req.body;
        const token = await authService.login(email, password)

        console.log(token)

        tokenToUse = token.data.accessToken

        if(tokenToUse){
            req.header.authorization = "Bearer" + tokenToUse
        }
    
        res.status(200).json(token)
    
    }
    catch(err){
        res.status(err.status || 401);
        res.json({message: err.message})
    }
}


export const register = async (req, res)=>{
    try {
    const {firstName,lastName,email, password, phone} = req.body
    const result =  await authService.register(firstName, lastName,email, password, phone)
    res.status(201).json(result)
    }
    catch(err){
        res.status(err.status || 400);
        res.json({messsage: err.message}) 
    }
}
