import { UniqueEntityID } from "@/core/entities";
import { Question, QuestionProps } from "@/domain/forum/enterprise/entities";
import { faker } from '@faker-js/faker'

export function makeQuestion(override: Partial<QuestionProps>, id?: UniqueEntityID,) {
    const question = Question.create({            
        title: faker.lorem.sentence(),
        authorId: new UniqueEntityID(),
        content: faker.lorem.text(),
        ...override,
    }, id, )

    return question
}