import { MuscularGroup } from "./muscularGroup";
import { User } from "./user";
import { UserExerciseDetail } from "./userExerciseDetail";

export interface UserExercise {
  id: number;

  user: User;

  title: string;

  muscularGroup: MuscularGroup;

  createdAt: Date;

  updatedAt: Date;

  deletedAt?: Date;

  userExerciseDetails: UserExerciseDetail[];
}