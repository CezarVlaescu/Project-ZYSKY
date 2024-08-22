export interface IuserTokenData {
    id: number;
    created_at: Date;
    email: string;
    pp_user_roles_id: number;
    pp_companies_id: number;
    phone: string;
    firstname: string;
    lastname: string;
    verified: boolean;
}

export interface IuserLoginData {
    email: string;
    password: string;
}

export interface IuserRegisterData {
    email: string;
    password: string;
    phone: string;
    company_name: string;
    company_nip: string;
    role: number;
    firstname: string;
    lastname: string;
    company_street: string;
    company_zip: string;
    company_city: string;
}

export interface IauthToken {
    token: string;
}