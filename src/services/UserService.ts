import axios from "axios";

class UserService {
  static #instance: UserService;

  private client = axios.create({
    baseURL: 'http://localhost:8080/api/v1/',
  })

  private constructor() {}

  public static get instance() {
    if (!UserService.#instance) {
      UserService.#instance = new UserService();
    }

    return UserService.#instance;
  }

  public authenticate(email: string, password: string){

  }
}

export default UserService;