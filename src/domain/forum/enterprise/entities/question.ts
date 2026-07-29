import { Slug } from "./value-objects"
import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/entities"
import { Optional } from "@/core/types/optional"
import dayjs from "dayjs"
import { AggregateRoot } from "@/core/entities/aggregate-root"
import { QuestionAttachment } from "./question-attachment"
import { QuestionAttachmentList } from "./question-attachment-list"

export interface QuestionProps {
    title: string
    content: string
    slug: Slug
    authorId: UniqueEntityID 
    bestAnswerId?: UniqueEntityID | undefined
    createdAt: Date
    updatedAt?: Date | undefined
    attachments: QuestionAttachmentList
}

export class Question extends AggregateRoot<QuestionProps> {
    get authorId() {
        return this.props.authorId
    }

    get content() {
        return this.props.content
    }

    get bestAnswerId() {
        return this.props.bestAnswerId
    }

    get title() {
        return this.props.title
    }

    get createdAt() {
        return this.props.createdAt
    }

    get updatedAt() {
        return this.props.updatedAt
    }

    get slug() {
        return this.props.slug
    }

    get isNew(): boolean {
        return dayjs().diff(this.createdAt, 'days') <= 3
    }

    get excerpt() {
        return this.content
            .substring(0, 120)
            .trimEnd()
            .concat('...')
    }

    get attachments() {
        return this.props.attachments
    }

    private touch() {
        this.props.updatedAt = new Date()
    }

    set content(content: string) {
        this.props.content = content
        this.touch()
    }

    set title(title: string) {
        this.props.title = title
        this.props.slug = Slug.createFromText(title)
        this.touch()
    }

    set bestAnswerId(bestAnswerId: UniqueEntityID | undefined) {
        this.props.bestAnswerId = bestAnswerId
        this.touch()
    }

    set attachments(attachments: QuestionAttachmentList) {
        this.props.attachments = attachments
        this.touch()
    }

    static create(props: Optional<QuestionProps, 'createdAt' | 'slug' | 'attachments'>, id?: UniqueEntityID) {
        const question = new Question({
            ...props,
            attachments: props.attachments ?? new QuestionAttachmentList,
            slug: props.slug ?? Slug.createFromText(props.title),
            createdAt: props.createdAt ?? new Date(), 
        }, id)

        return question
    }
}