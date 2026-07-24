import { AnwsersRepository } from "@/domain/forum/application/repositories/anwsers-repository"
import { Anwser } from "@/domain/forum/enterprise/entities"

export class InMemoryAnwsersRepository implements AnwsersRepository {
    public items: Anwser[] = []

    async create(anwser: Anwser) {
        this.items.push(anwser)
    }
}