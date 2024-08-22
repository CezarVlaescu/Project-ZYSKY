import { 
    type IuserRegisterData, 
    type IauthToken, 
    type IuserLoginData, 
    type IuserTokenData 
} from "@/types/shared-types";
import axiosInstance from "./axios-instance";
import axios, { type AxiosError } from "axios";

function handleError(message: string, error: unknown): never {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message: string }>;
        const errorMessage = axiosError.response?.data?.message || message;
        throw new Error(errorMessage);
    } else if (error instanceof Error) {
        throw new Error(error.message || message);
    } else {
        throw new Error(message);
    }
}

export async function loginUserAsync(loginUserData : IuserLoginData) : Promise<IauthToken>{
    try {
        const response = await axiosInstance.post<IauthToken>("/auth/pplogin", loginUserData)
        if (response.status === 201 || response.status === 200) return response.data;
        throw new Error("Unable to login user");
    }
    catch(error){      
        handleError("Unable to login user", error);
    }
}

export async function registerUserAsync(registerUserData : IuserRegisterData) : Promise<IauthToken> {
    try {
        const response = await axiosInstance.post<IauthToken>("/auth/ppsignup", registerUserData);
        if (response.status === 201 || response.status === 200) return response.data;
        throw new Error("Unable to register user");
    }
    catch (error){
        handleError("Unable to register user", error);
    }
}

export async function fetchUserDataAsync() : Promise<IuserTokenData> {
    try {
        const response = await axiosInstance.get<IuserTokenData>("/auth/me");
        if (response.status === 200) return response.data;
        throw new Error("Unable to get user token data");
    }
    catch (error){
        handleError("Unable to get user token data", error);
    }
}