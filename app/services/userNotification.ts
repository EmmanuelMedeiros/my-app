import { UserNotificationFrequency } from "../domain/userNotificationFrequency";
import { Api, ServiceResponse } from "./api";

export type CreateUserNotificationFrequencyDTO = {
  weekDays: string;
  hour: string;
}

class UserNotification extends Api {
  create = async (createUserNotificationFrequencyDTO: CreateUserNotificationFrequencyDTO): Promise<ServiceResponse<UserNotificationFrequency>> => {
    return this.post('/user-notification-frequency', createUserNotificationFrequencyDTO);
  }

  getByUser = async (): Promise<ServiceResponse<UserNotificationFrequency>> => {
    return this.get('/user-notification-frequency');
  }
}

export default new UserNotification();