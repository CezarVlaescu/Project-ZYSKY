import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUserAsync, registerUserAsync, fetchUserDataAsync } from '@/server/auth-api-call';
import { type IuserLoginData, type IuserRegisterData, type IauthToken, type IuserTokenData } from '@/types/shared-types';

interface IauthHookReturns {
    login: (userLoginData: IuserLoginData) => Promise<void>;
    register: (userRegisterData: IuserRegisterData) => Promise<void>;
    error: string | null;
    loading: boolean;
    userData: IuserTokenData | null;
    showModal: boolean;
    agreeToPolicies: () => void;
}

export function useAuth(): IauthHookReturns {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [userData, setUserData] = useState<IuserTokenData | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const router = useRouter();

    const login = async (userLoginData: IuserLoginData): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            const authToken: IauthToken = await loginUserAsync(userLoginData);
            localStorage.setItem('authToken', authToken.token);
            const user: IuserTokenData = await fetchUserDataAsync();
            setUserData(user);

            if (!user.verified) {
                setShowModal(true);
            } else {
                router.push('/dashboard');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    const register = async (userRegisterData: IuserRegisterData): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            const authToken: IauthToken = await registerUserAsync(userRegisterData);
            localStorage.setItem('authToken', authToken.token);
            const user: IuserTokenData = await fetchUserDataAsync();
            setUserData(user);
            router.push('/dashboard');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    const agreeToPolicies = () : void => {
        setShowModal(false);
        router.push('/dashboard'); 
    };

    return { login, register, error, loading, userData, showModal, agreeToPolicies };
}
