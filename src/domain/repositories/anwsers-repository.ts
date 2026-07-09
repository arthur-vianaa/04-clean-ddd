import { Anwser } from "../entities";

export interface AnwsersRepository {
    create(anwser: Anwser): Promise <void>
}