import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { GetQuestionBySlugUseCase } from './get-question-by-slug';
import { Question, Slug } from '../../enterprise/entities';
import { UniqueEntityID } from '@/core/entities';
import { makeQuestion } from 'test/factories/make-question';
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question by Slug', () => {

    beforeEach(() => {
        inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository)
        sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
    })

    it('should be able to get a question by its slug', async () => {
        const newQuestion = makeQuestion({
            slug: Slug.create('example-question')
        })

        await inMemoryQuestionsRepository.create(newQuestion)

        const result = await sut.execute({
            slug: 'example-question',
        })
        
        expect(result.isRight()).toBe(true)
        expect(result.value).toEqual({
            question: expect.objectContaining({
                title: newQuestion.title,
            }),
        })

    })
})

