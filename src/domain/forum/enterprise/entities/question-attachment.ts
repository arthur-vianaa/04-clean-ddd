import { Entity, UniqueEntityID } from "@/core/entities";

export interface QuestionAttachmentProps {
  questionId: UniqueEntityID
  attachmentId: UniqueEntityID
}

export class QuestionAttachment extends Entity<QuestionAttachmentProps> {
  get questionId() {
    return this.props.questionId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  set attachmentId(attachmentId: UniqueEntityID) {
    this.props.attachmentId = attachmentId;
  }

  static create(props: QuestionAttachmentProps, id?: UniqueEntityID) {
    const attachment = new QuestionAttachment(props, id)
    return attachment
  }
}