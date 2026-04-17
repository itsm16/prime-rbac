import { Router } from "express";
import * as jobController from "./jobs.controller.js"
import { checkRole, checkToken } from "../auth/auth.middleware.js";
import validate from "../../common/middleware/validate.middleware.js";
import { ApplyJobDto, CreateJobDto } from "./dto/jobs.dto.js";

const jobRoutes : Router = Router()

// add admin role chek
jobRoutes.get("/all", checkToken, jobController.getAll)
jobRoutes.get("/:id", checkToken, jobController.getById)
jobRoutes.post("/create", checkToken, checkRole(["admin"]), validate(CreateJobDto) ,jobController.create)
jobRoutes.put("/update/:id", checkToken, checkRole(["admin"]), validate(CreateJobDto), jobController.update)
jobRoutes.delete("/delete/:id", checkToken, checkRole(["admin"]), jobController.deleteJob)

// add applicant role check
jobRoutes.post("/apply/:id", checkToken, validate(ApplyJobDto), jobController.apply)

export default jobRoutes