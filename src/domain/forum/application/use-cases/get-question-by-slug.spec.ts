import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { GetQuestionBySlugUseCase } from './get-question-by-slug';
import { Question, Slug } from '../../enterprise/entities';
import { UniqueEntityID } from '@/core/entities';
import { makeQuestion } from 'test/factories/make-question';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question by Slug', () => {

    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository
        sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
    })

    it('should be able to get a question by its slug', async () => {
        const newQuestion = makeQuestion({
            slug: Slug.create('example-question')
        })

        inMemoryQuestionsRepository.create(newQuestion)

        const { question } = await sut.execute({
            slug: 'example-question',
        })
        
        expect(question.id).toBeTruthy()
        expect(question.title).toEqual(newQuestion.title)
        expect(inMemoryQuestionsRepository.items[0]!.id).toEqual(question.id)

    })
})

