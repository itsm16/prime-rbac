import z from "zod";
import BaseDto from "../../../common/dto/base.dto.js";

class CreateJobDto extends BaseDto{
    static schema = z.object({
        role: z.string({error: "Role is required"}).nonoptional(),
        company: z.string({error : "Company is required"}).nonoptional(),
        location: z.string({error: "Location is required"}).nonoptional(),
        description: z.string({error: "Description is required"}).nonoptional()
    })
}

class ApplyJobDto extends BaseDto{
    static schema = z.object({
        userId: z.number({error: "User id is required"}).nonoptional(),
        jobId: z.number({error: "Job id is required"}).nonoptional(),
        resume_url: z.string({error: "Resume url is required"})
    })
}

// types
type CreateJobInput = z.infer<typeof CreateJobDto.schema>
type ApplyJobInput = z.infer<typeof ApplyJobDto.schema>

export {
    CreateJobDto,
    ApplyJobDto
}

export type {
    CreateJobInput,
    ApplyJobInput
}