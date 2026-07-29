import { InMemoryAnswersRepository } from 'test/repositories/in-memory-anwsers-repository';
import { UniqueEntityID } from '@/core/entities';
import { makeAnswer } from 'test/factories/make-answer';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { ChooseQuestionBestAnswer } from './choose-question-best-answer';
import { makeQuestion } from 'test/factories/make-question';
import { NotAllowedError } from './errors/not-allowed-error';
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository';
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository';

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let sut: ChooseQuestionBestAnswer

describe('Choose Question Best Answer', () => {

    beforeEach(() => {
        inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository
        inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository)
        inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository)
        sut = new ChooseQuestionBestAnswer(inMemoryQuestionsRepository, inMemoryAnswersRepository)
    })

    it('should be able to choose question best answer', async () => {
        const question = makeQuestion({})
        const answer = makeAnswer({
            questionId: question.id,
        })

        await inMemoryQuestionsRepository.create(question)
        await inMemoryAnswersRepository.create(answer)

        await sut.execute({
            authorId: question.authorId.toString(),
            answerId: answer.id.toString(),
        })
        
        expect(inMemoryQuestionsRepository.items[0]?.bestAnswerId).toEqual(answer.id)

    })

    it('shouldnt not be able to choose another user questions best answer', async () => {
        const question = makeQuestion({
            authorId: new UniqueEntityID('author-1')
        })
        const answer = makeAnswer({
            questionId: question.id,
        })

        await inMemoryQuestionsRepository.create(question)
        await inMemoryAnswersRepository.create(answer)

        await sut.execute({
            authorId: question.authorId.toString(),
            answerId: answer.id.toString(),
        })

        const result = await sut.execute({
            authorId: 'author-2',
            answerId: answer.id.toString(),
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(NotAllowedError)

    })
})

