import { UniqueEntityID } from "@/core/entities"
import { Answer, Question } from "../../enterprise/entities"
import { QuestionsRepository } from "../repositories/questions-repository"

interface GetQuestionBySlugUseCaseRequest {
    slug: string
}

interface GetQuestionBySlugUseCaseResponse {
    question: Question
}

export class GetQuestionBySlugUseCase {
    constructor(
        private questionsRepository: QuestionsRepository
    ) {}

    async execute({slug}: GetQuestionBySlugUseCaseRequest): Promise <GetQuestionBySlugUseCaseResponse> {
        const question = await this.questionsRepository.findBySlug(slug)

        if (!question) {
            throw new Error('Question not found.')
        }

        return { question }
    
    }
}