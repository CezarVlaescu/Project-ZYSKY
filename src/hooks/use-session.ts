import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { fetchUserDataAsync } from '@/server/auth-api-call';
import { type IuserTokenData } from '@/types/shared-types';

export function useSession(){
    const [userData, setUserData] = useState<IuserTokenData | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            fetchUserDataAsync().then((user) => {
                setUserData(user);
                if (!user.verified) {
                    void router.push('/policy-agreement');
                }
            }).catch(() => {
                localStorage.removeItem('authToken');
                void router.push('/login');
            });
        } else {
            void router.push('/login');
        }
    }, [router]);

    return { userData };
}