import { useState, useEffect } from 'react';
import { type IuserTokenData } from '@/types/shared-types';
import { fetchUserDataAsync } from '@/server/auth-api-call';

interface IuseFetchUserDataProps {
    userData: IuserTokenData | null;
    loading: boolean;
    error: string | null;
}

export function useFetchUserData() : IuseFetchUserDataProps {
    const [userData, setUserData] = useState<IuserTokenData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () : Promise<void> =>  {
            try {
                const data = await fetchUserDataAsync();
                setUserData(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load user data');
            } finally {
                setLoading(false);
            }
        };

        void fetchData();
    }, []);

    return { userData, loading, error };
}
