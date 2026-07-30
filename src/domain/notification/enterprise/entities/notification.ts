import { Entity } from "@/core/entities";

export interface NotificationProps {
  title: string
  content: StorageManager
  readAt?: Date
  createdAt: Date
}

export class Notification extends Entity<NotificationProps> {

}