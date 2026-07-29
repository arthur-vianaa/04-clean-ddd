import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { UniqueEntityID } from '@/core/entities';
import { makeQuestion } from 'test/factories/make-question';
import { DeleteQuestionUseCase } from './delete-question';
import { NotAllowedError } from './errors/not-allowed-error';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase

describe('Delete Question', () => {

    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository
        sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
    })

    it('should be able to delete a question by its id', async () => {
        const newQuestion = makeQuestion({authorId: new UniqueEntityID('author-1')}, new UniqueEntityID('question-1'))

        inMemoryQuestionsRepository.create(newQuestion)

        await sut.execute({
            authorId: 'author-1',
            questionId: 'question-1',
        })
        
        expect(inMemoryQuestionsRepository.items).toHaveLength(0)

    })

    it('shouldnt be able to delete a question from another user', async () => {
        const newQuestion = makeQuestion({authorId: new UniqueEntityID('author-2')}, new UniqueEntityID('question-2'))

        inMemoryQuestionsRepository.create(newQuestion)

        const result = await sut.execute({
            authorId: 'author-1',
            questionId: 'question-2',
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(NotAllowedError)

    })
})

