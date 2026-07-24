import { UniqueEntityID } from "@/core/entities"
import { AnwsersRepository } from "../repositories/anwsers-repository"
import { Anwser } from "../../enterprise/entities"

interface AnwserQuestionUseCaseRequest {
    instructorId: string
    questionId: string
    content: string
}

interface AnwserQuestionUseCaseResponse {
    anwser: Anwser
}

export class AnwserQuestionUseCase {
    constructor(
        private anwsersRepository: AnwsersRepository
    ) {}

    async execute({instructorId, questionId, content}: AnwserQuestionUseCaseRequest): Promise <AnwserQuestionUseCaseResponse> {
        const anwser = Anwser.create({
            content,
            authorId: new UniqueEntityID(instructorId),
            questionId: new UniqueEntityID(questionId)
        })

    await this.anwsersRepository.create(anwser)

    return {anwser}
    }
}