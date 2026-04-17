import { eq } from "drizzle-orm"
import db from "../../common/db/db.js"
import { jobsTable, applicationsTable } from "../../common/db/schema.js"
import ApiError from "../../common/utils/api-error.js"
import { CreateJobInput } from "./dto/jobs.dto.js"

const getAll = async () => {
    const jobs = await db.select().from(jobsTable)

    if(!jobs){
        throw ApiError.badRequest("Couldn't fetch jobs")
    }
    
    return jobs
}

const getById = async (id: string) => {
    const job = await db.select().from(jobsTable).where(eq(jobsTable.id, parseInt(id)))

    if(!job){
        throw ApiError.badRequest("Couldn't fetch job")
    }

    return job[0]
}

const create = async ({role, company, location, description}: CreateJobInput) => {
    const job = await db.insert(jobsTable).values({
        role,
        company,
        location,
        description
    }).returning()

    if(!job){
        throw ApiError.badRequest("Couldn't create job")
    }

    return job
}

const update = async (id: string, {role, company, location, description}: CreateJobInput) => {
    const jobExists = await db.select().from(jobsTable).where(eq(jobsTable.id, parseInt(id)))
    
    if(!jobExists){
        throw ApiError.badRequest("Job not found")
    }

    const job = await db.update(jobsTable).set({
        role,
        company,
        location,
        description
    }).where(eq(jobsTable.id, parseInt(id))).returning()

    if(!job){
        throw ApiError.badRequest("Couldn't update job")
    }

    return job
}

const deleteJob = async (id: string) => {
    const jobExists = await db.select().from(jobsTable).where(eq(jobsTable.id, parseInt(id)))
    
    if(!jobExists){
        throw ApiError.badRequest("Job not found")
    }

    const job = await db.delete(jobsTable).where(eq(jobsTable.id, parseInt(id))).returning()

    if(!job){
        throw ApiError.badRequest("Couldn't delete job")
    }

    return job
}

const apply = async (id: string, data: { userId: number, resume_url: string }) => {
    const jobExists = await db.select().from(jobsTable).where(eq(jobsTable.id, parseInt(id)))
    
    if(!jobExists || jobExists.length === 0){
        throw ApiError.badRequest("Job not found")
    }

    const application = await db.insert(applicationsTable).values({
        user_id: data.userId,
        job_id: parseInt(id),
        resume_url: data.resume_url
    }).returning()

    if(!application){
        throw ApiError.badRequest("Couldn't create application")
    }

    return application
}

export {
    getAll,
    getById,
    create,
    update,
    deleteJob,
    apply
}