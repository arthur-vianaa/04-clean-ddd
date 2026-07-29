import { InMemoryAnswersRepository } from 'test/repositories/in-memory-anwsers-repository';
import { UniqueEntityID } from '@/core/entities';
import { makeAnswer } from 'test/factories/make-answer';
import { EditAnswerUseCase } from './edit-answer';
import { NotAllowedError } from './errors/not-allowed-error';

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit Answer', () => {

    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository
        sut = new EditAnswerUseCase(inMemoryAnswersRepository)
    })

    it('should be able to edit a answer by its id', async () => {
        const newAnswer = makeAnswer({authorId: new UniqueEntityID('author-1')}, new UniqueEntityID('answer-1'))

        inMemoryAnswersRepository.create(newAnswer)

        await sut.execute({
            authorId: 'author-1',
            answerId: newAnswer.id.toValue(),
            content: 'Conteudo'
        })
        
        expect(inMemoryAnswersRepository.items[0]).toMatchObject({
            content: 'Conteudo'
        })

    })

    it('shouldnt be able to edit a answer from another user', async () => {
        const newAnswer = makeAnswer({authorId: new UniqueEntityID('author-2')}, new UniqueEntityID('answer-2'))

        inMemoryAnswersRepository.create(newAnswer)

        const result = await sut.execute({
            authorId: 'author-1',
            answerId: newAnswer.id.toValue(),
            content: 'Conteudo'
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(NotAllowedError)
    })
})

