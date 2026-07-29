import { UniqueEntityID } from "@/core/entities";
import { QuestionAttachment, QuestionAttachmentProps } from "@/domain/forum/enterprise/entities";
import { faker } from '@faker-js/faker'

export function makeQuestionAttachment(override: Partial<QuestionAttachmentProps>, id?: UniqueEntityID,) {
    const questionAttachment = QuestionAttachment.create({            
        questionId: new UniqueEntityID(),
        attachmentId: new UniqueEntityID(),
        ...override,
    }, id, )

    return questionAttachment
}