import { UniqueEntityID } from "@/core/entities"
import { Answer, Question } from "../../enterprise/entities"
import { QuestionsRepository } from "../repositories/questions-repository"

interface FetchRecetQuestionsUseCaseRequest {
    page: number
}

interface FetchRecentQuestionsUseCaseResponse {
    questions: Question[]
}

export class FetchRecentQuestionsUseCase {
    constructor(
        private questionsRepository: QuestionsRepository
    ) {}

    async execute({page}: FetchRecetQuestionsUseCaseRequest): Promise <FetchRecentQuestionsUseCaseResponse> {
        const questions = await this.questionsRepository.findManyRecent({page})

        return { questions, }
    
    }
}