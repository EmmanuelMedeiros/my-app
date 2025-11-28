import { UserExercise } from "./userExercise";
import { UserNotificationFrequency } from "./userNotificationFrequency";

export interface User {
  id: number;

  uuid: string;

  name: string;

  email: string;

  password: string;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date;

  userNotificationFrequency: UserNotificationFrequency

  userExercises: UserExercise[]
}