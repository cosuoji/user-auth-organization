import { Router } from "express";
import * as organizationController from "../controllers/organizationController.js"
import { authMiddleware } from "../middleware/authMiddleware.js";
import { organizationSchema } from "../validations/validationSchema.js";
import { generateMiddleware } from "../middleware/generatedMiddleware.js";

const organizationRoute = Router();

organizationRoute.get("/organizations", authMiddleware, organizationController.getOrganizations)
organizationRoute.post("/organizations", authMiddleware, generateMiddleware(organizationSchema), organizationController.addOrganization)
organizationRoute.get("/organizations/:orgid", authMiddleware, organizationController.getOrganizationInfo)
organizationRoute.post("/organizations/:orgid/users", organizationController.addUserToOrganization)


export default organizationRoute