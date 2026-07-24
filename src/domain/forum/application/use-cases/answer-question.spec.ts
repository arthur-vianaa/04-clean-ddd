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

        const { answer } = await sut.execute({
            questionId: '1',
            instructorId: '123',
            content: 'Content answer'
        })

        expect(answer.id).toBeTruthy()
        expect(inMemoryAnswersRepository.items[0]!.id).toEqual(answer.id)
    })
})

