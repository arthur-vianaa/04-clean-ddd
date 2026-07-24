import { PaginationParams } from "@/core/repositories/pagination-params"
import { Answer } from "../../enterprise/entities"

export interface AnswersRepository {
    create(answer: Answer): Promise <void>
    delete(answer: Answer): Promise <void>
    findById(id: string): Promise <Answer | null>
    save(question: Answer): Promise <void>
    findManyByQuestionId(questionId: string, params: PaginationParams): Promise <Answer[]>
}