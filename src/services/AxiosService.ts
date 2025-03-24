import axios from "axios";
import { getToken } from "../utils/jwt";

export default class AxiosService {
    static #instatnce: AxiosService;

    public readonly authenticatedClient;

    public readonly unauthenticatedClient;

    private constructor() {
        this.authenticatedClient = axios.create({
            baseURL: "/api/v1/",
            headers: {
                Authorization: `Bearer ${getToken()?.str}`,
            },
        });
        this.unauthenticatedClient = axios.create({
            baseURL: "/api/v1/",
        });
    }
    public static get instance() {
        if (!AxiosService.#instatnce) {
            AxiosService.#instatnce = new AxiosService();
        }

        return AxiosService.#instatnce;
    }
}
