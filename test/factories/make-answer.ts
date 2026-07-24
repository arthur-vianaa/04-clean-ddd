import { UniqueEntityID } from "@/core/entities";
import { Answer, AnswerProps } from "@/domain/forum/enterprise/entities";
import { faker } from '@faker-js/faker'

export function makeAnswer(override: Partial<AnswerProps>, id?: UniqueEntityID,) {
    const answer = Answer.create({            
        authorId: new UniqueEntityID(),
        questionId: new UniqueEntityID(),
        content: faker.lorem.text(),
        ...override,
    }, id, )

    return answer
}