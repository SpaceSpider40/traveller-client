import axios from "axios";
import {getToken, Token} from "../utils/jwt";
import { removeCookie, setCooke } from "../utils/cookie";

export interface IUserBasicInfo {
    id:number;
    username:string;
    firstName:string;
    lastName:string;
    email:string;
    role:string[];
}

class UserService {
    static #instance: UserService;

    private loggedUser?: IUserBasicInfo;

    private client = axios.create({
        baseURL: "/api/v1/",
    });

    private constructor() {}

    public static get instance() {
        if (!UserService.#instance) {
            UserService.#instance = new UserService();
        }

        return UserService.#instance;
    }

    public static isAuthenticated(): boolean {
        return getToken() !== null;
    }

    public async authenticate(email: string, password: string) {
        const response = await this.client
        .post("auth/authenticate", {
            email: email,
            password: password,
        });

        const token = new Token(response.data.token);

        setCooke("t", token.toString(), token.exp);

        return true;
    }

    public async logout(): Promise<boolean> {
        removeCookie("t");
        this.loggedUser = undefined;

        return true;
    }

    public async getBasicInfo(): Promise<IUserBasicInfo> {
        if (!UserService.isAuthenticated()) throw new Error("Unauthorized");
        if (this.loggedUser) return this.loggedUser;

        const token = getToken();

        const response = await this.client
            .get("user", {
                headers:{
                    Authorization: `Bearer ${token?.str}`,
                },
                params: {
                    email: token?.sub
                }
            });

        const data = response.data;

        this.loggedUser = {
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            role: data.role,
            username: data.username,
            email: data.email,
        };

        return this.loggedUser;
    }
}

export default UserService;