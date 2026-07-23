import { Question } from '../../enterprise/entities';
import { QuestionsRepository } from '../repositories/questions-repository';
import { CreateQuestionUseCase } from './create-question';

const fakeQuestionsRepository: QuestionsRepository = {
    create: async (question: Question) => {
        return;
    }
}

test('create a question', async () => {
    const createQuestion = new CreateQuestionUseCase(fakeQuestionsRepository)

    const { question } = await createQuestion.execute({
        authorId: '1',
        title: 'Question 1',
        content: 'Content question'
    })

    expect(question.id).toBeTruthy()
})