import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { UniqueEntityID } from '@/core/entities';
import { makeQuestion } from 'test/factories/make-question';
import { EditQuestionUseCase } from './edit-question';
import { NotAllowedError } from './errors/not-allowed-error';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit Question', () => {

    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository
        sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
    })

    it('should be able to edit a question by its id', async () => {
        const newQuestion = makeQuestion({authorId: new UniqueEntityID('author-1')}, new UniqueEntityID('question-1'))

        inMemoryQuestionsRepository.create(newQuestion)

        await sut.execute({
            authorId: 'author-1',
            questionId: newQuestion.id.toValue(),
            title: 'Novo titulo',
            content: 'Conteudo'
        })
        
        expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
            title: 'Novo titulo',
            content: 'Conteudo'
        })

    })

    it('shouldnt be able to edit a question from another user', async () => {
        const newQuestion = makeQuestion({authorId: new UniqueEntityID('author-2')}, new UniqueEntityID('question-2'))

        inMemoryQuestionsRepository.create(newQuestion)

        const result = await sut.execute({
            authorId: 'author-1',
            questionId: newQuestion.id.toValue(),
            title: 'Novo titulo',
            content: 'Conteudo'
            })
            
        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(NotAllowedError)
    })
})

