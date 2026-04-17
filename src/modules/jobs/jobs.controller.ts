import ApiResponse from '../../common/utils/api-response.js'
import * as jobService from './jobs.service.js'
import {Request, Response} from 'express'

const getAll = async (req: Request, res: Response) => {
    const jobs = await jobService.getAll()
    ApiResponse.ok(res, "fetched jobs successfully", jobs)
}

const getById = async (req: Request, res: Response) => {
    const job = await jobService.getById(req?.params?.id as string)
    ApiResponse.ok(res, "fetched job successfully", job)
}

const create = async (req: Request, res: Response) => {
    const job = await jobService.create(req.body)
    ApiResponse.ok(res, "Job created successfuly", job)
}

const update = async (req: Request, res: Response) => {
    const job = await jobService.update(req?.params?.id as string, req.body)
    ApiResponse.ok(res, "Job updated successfuly", job)
}

const deleteJob = async (req: Request, res: Response) => {
    const job = await jobService.deleteJob(req?.params?.id as string)
    ApiResponse.ok(res, "Job deleted successfuly", job)
}

// applicant
const apply = async (req: Request, res: Response) => {
    const job = await jobService.apply(req?.params?.id as string, req.body)
    ApiResponse.ok(res, "Job applied successfuly", job)
}

export {
    getAll,
    create,
    getById,
    update,
    deleteJob,
    apply
}