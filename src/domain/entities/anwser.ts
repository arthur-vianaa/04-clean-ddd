import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/entities"
import { Optional } from "@/core/types/optional"

interface AnwserProps {
    authorId: UniqueEntityID
    questionId: UniqueEntityID
    content: string
    createdAt: Date
    updatedAt?: Date
}

export class Anwser extends Entity<AnwserProps> {
    get content() {
        return this.props.content
    }

    get questionId() {
        return this.props.questionId
    }

    get authorId() {
        return this.props.authorId
    }

    get createdAt() {
        return this.props.createdAt
    }

    get updatedAt() {
        return this.props.updatedAt
    }

    get excerpt() {
        return this.content
        .substring(0, 120)
        .trimEnd()
        .concat('...')
    }

    private touch() {
        this.props.updatedAt = new Date()
    }

    set content(content:string) {
        this.props.content = content
        this.touch()
    }

    static create(props: Optional<AnwserProps, 'createdAt'>, id?: UniqueEntityID) {
        const anwser = new Anwser({
            ...props,
            createdAt: new Date(),
        }, id)
    
        return anwser
    }
}

