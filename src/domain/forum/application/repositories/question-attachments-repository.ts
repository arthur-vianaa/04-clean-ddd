import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionAttachment } from "../../enterprise/entities";

export interface QuestionAttachmentsRepository {
    findManyByQuestionId(id: string): Promise <QuestionAttachment[]>
    deleteManyByQuestionId(id: string): Promise <void>
}