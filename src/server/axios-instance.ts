import axios, {type AxiosInstance} from "axios";
// import https from "https";

let instanced: AxiosInstance | null = null;

const createInstance = (): AxiosInstance => {
    const instance = axios.create({
        baseURL: "https://kxam-x9hq-ta88.f2.xano.io/api:Kq4DG43",
        headers: {
            "Content-Type" : "application/json"
        },
        // httpsAgent: new https.Agent({
        //     rejectUnauthorized: false
        // }),
    })

    instance.interceptors.request.use((config) => {
        const token = localStorage.getItem("authToken"); // use the token from local storage

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`; // add authorization header if token exists
        }

        return config;
    })

    return instance;
}

export const getInstance = (): AxiosInstance => {
    if (!instanced) {
        instanced = createInstance();
    }
    return instanced;
}

export default getInstance();