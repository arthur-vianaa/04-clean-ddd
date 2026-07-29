import { UniqueEntityID } from "@/core/entities"
import { AnswersRepository } from "../repositories/answers-repository"
import { Answer, AnswerAttachment } from "../../enterprise/entities"
import { Either, right } from "@/core/either"
import { AnswerAttachmentList } from "../../enterprise/entities/answer-attachment-list"

interface AnswerQuestionUseCaseRequest {
    instructorId: string
    questionId: string
    attachmentIds: string[]
    content: string
}

type AnswerQuestionUseCaseResponse = Either <null, { answer: Answer }>

export class AnswerQuestionUseCase {
    constructor(
        private answersRepository: AnswersRepository
    ) {}

    async execute({instructorId, questionId, content, attachmentIds}: AnswerQuestionUseCaseRequest): Promise <AnswerQuestionUseCaseResponse> {
        const answer = Answer.create({
            content,
            authorId: new UniqueEntityID(instructorId),
            questionId: new UniqueEntityID(questionId)
        })

    const answerAttachments = attachmentIds.map(attachmentId => {
            return AnswerAttachment.create({
              attachmentId: new UniqueEntityID(attachmentId),
              answerId: answer.id,
            })
          })
          
          answer.attachments = new AnswerAttachmentList(answerAttachments)

    await this.answersRepository.create(answer)

    return right({answer})
    }
}