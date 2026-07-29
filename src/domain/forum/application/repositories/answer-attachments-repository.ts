import { AnswerAttachment } from "../../enterprise/entities";

export interface AnswerAttachmentsRepository {
    findManyByAnswerId(id: string): Promise <AnswerAttachment[]>
    deleteManyByAnswerId(id: string): Promise <void>
}