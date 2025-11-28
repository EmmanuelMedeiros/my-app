import { UserExercise } from "./userExercise";

export interface UserExerciseDetail {
  id: number;

  userExercise: UserExercise;

  weight: number;

  didWeightChange?: boolean;

  createdAt: Date;
}