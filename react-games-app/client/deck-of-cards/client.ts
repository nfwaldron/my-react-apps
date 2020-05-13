import axios, {AxiosInstance} from "axios";

export const deckOfCardsClient = (): AxiosInstance => {
    const baseUrl = "https://deckofcardsapi.com/api/"
    return axios.create({
        baseURL: baseUrl
    });
};
