import { User } from "./user";

export interface UserNotificationFrequency {
  id: number;

  user: User;

  weekDays: string;

  hour: string;
}