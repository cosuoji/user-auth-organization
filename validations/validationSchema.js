import Joi from "joi";

export const registerSchema = Joi.object({
    firstName: Joi.string().required(),  
    lastName: Joi.string().required(),    
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(), 
    phone: Joi.string().required()
    
})

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const organizationSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string()
})