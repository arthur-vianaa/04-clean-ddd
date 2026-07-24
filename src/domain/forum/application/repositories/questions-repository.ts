import { Question } from "../../enterprise/entities";

export interface QuestionsRepository {
    findById(id: string): Promise <Question | null>
    findBySlug(slug: string): Promise <Question | null>
    create(question: Question): Promise <void>
    delete(question: Question): Promise <void>
}