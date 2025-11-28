import { User } from "../domain/user";
import { Api, ServiceResponse } from "./api";

export type LoginDTO = {
  email: string;
  password: string;
}

export type SignupDTO = {
  email: string;
  password: string;
}

class AuthAPI extends Api {
  login = async (loginDTO: LoginDTO): Promise<ServiceResponse<{ user: User, jwt: string }>> => {
    return this.post('/user/login', loginDTO);
  }

  signup = async (signupDTO: SignupDTO): Promise<ServiceResponse<User>> => {
    return this.post('/user/signup', signupDTO)
  }
}

export default new AuthAPI();