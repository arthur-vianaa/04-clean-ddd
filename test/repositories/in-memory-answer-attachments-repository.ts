import { PaginationParams } from "@/core/repositories/pagination-params"
import { AnswerAttachment } from "@/domain/forum/enterprise/entities"
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'

export class InMemoryAnswerAttachmentsRepository implements AnswerAttachmentsRepository {
    public items: AnswerAttachment[] = []

    async findManyByAnswerId(answerId: string) {
      const answerAttachment = this.items.filter(item => item.answerId.toString() === answerId)

      return answerAttachment
    }

    async deleteManyByAnswerId(answerId: string) {
      const answerAttachment = this.items.filter(item => item.answerId.toString() !== answerId)
      this.items = answerAttachment
    }

}