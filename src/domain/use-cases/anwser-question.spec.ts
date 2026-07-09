import { AnwserQuestionUseCase } from './anwser-question'
import { AnwsersRepository } from '../repositories/anwsers-repository'
import { Anwser } from '../entities'

const fakeAnwsersRepository: AnwsersRepository = {
    create: async (anwser: Anwser) => {
        return;
    }
}

test('create an anwser', async () => {
    const anwserQuestion = new AnwserQuestionUseCase(fakeAnwsersRepository)

    const anwser = await anwserQuestion.execute({
        questionId: '1',
        instructorId: '2',
        content: 'nova resposta'
    })

    expect(anwser.content).toEqual('nova resposta')
})