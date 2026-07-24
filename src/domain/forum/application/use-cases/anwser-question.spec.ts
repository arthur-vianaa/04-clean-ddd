import { InMemoryAnwsersRepository } from 'test/repositories/in-memory-anwsers-repository';
import { AnwserQuestionUseCase } from './anwser-question';

let inMemoryAnwsersRepository:  InMemoryAnwsersRepository
let sut: AnwserQuestionUseCase

describe('Anwser Question', () => {

    beforeEach(() => {
        inMemoryAnwsersRepository = new InMemoryAnwsersRepository
        sut = new AnwserQuestionUseCase(inMemoryAnwsersRepository)
    })

    it('should be able to anwser a question', async () => {

        const { anwser } = await sut.execute({
            questionId: '1',
            instructorId: '123',
            content: 'Content anwser'
        })

        expect(anwser.id).toBeTruthy()
        expect(inMemoryAnwsersRepository.items[0]!.id).toEqual(anwser.id)
    })
})

