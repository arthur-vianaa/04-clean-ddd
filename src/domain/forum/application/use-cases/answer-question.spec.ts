import { InMemoryAnswersRepository } from 'test/repositories/in-memory-anwsers-repository';
import { AnswerQuestionUseCase } from './answer-question';

let inMemoryAnswersRepository:  InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Answer Question', () => {

    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository
        sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
    })

    it('should be able to answer a question', async () => {

        const result = await sut.execute({
            questionId: '1',
            instructorId: '123',
            content: 'Content answer'
        })

        expect(result.isRight()).toBe(true)
        expect(inMemoryAnswersRepository.items[0]).toEqual(result.value?.answer)
    })
})

