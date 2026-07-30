import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository';
import { UniqueEntityID } from '@/core/entities';
import { SendNotificationUseCase } from './send-notification';

let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sut: SendNotificationUseCase

describe('Send Notification', () => {

    beforeEach(() => {
        inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
        sut = new SendNotificationUseCase(inMemoryNotificationsRepository)
    })

    it('should be able to create a notification', async () => {

        const result = await sut.execute({
            recipientId: '1',
            title: 'Notification 1',
            content: 'Content notification',
        })

        expect(result.isRight()).toBe(true)
        expect(inMemoryNotificationsRepository.items[0]).toEqual(result.value?.notification)

    })
})

