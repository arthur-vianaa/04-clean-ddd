import { UniqueEntityID } from "@/core/entities"
import { Answer, Question } from "../../enterprise/entities"
import { QuestionsRepository } from "../repositories/questions-repository"
import { Either, right } from "@/core/either"

interface FetchRecetQuestionsUseCaseRequest {
    page: number
}

type FetchRecentQuestionsUseCaseResponse = Either <null, {
    questions: Question[]
}>

export class FetchRecentQuestionsUseCase {
    constructor(
        private questionsRepository: QuestionsRepository
    ) {}

    async execute({page}: FetchRecetQuestionsUseCaseRequest): Promise <FetchRecentQuestionsUseCaseResponse> {
        const questions = await this.questionsRepository.findManyRecent({page})

        return right({ questions, })
    
    }
}