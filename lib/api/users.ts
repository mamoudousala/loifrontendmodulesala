import { axiosInstance } from "../axios/instance";
import { UsersArraySchema, UserSchema } from "../schemas/user.schema";
import type { User } from "../types/user.type";

export interface LoginResponse {
    success: boolean;
    user?: User;
    message?: string;
}

export async function fetchUsersByEmail(email: string): Promise<User | null> {
    const res = await axiosInstance.get(`/users?email=${email}`);

    const users = UsersArraySchema.parse(res.data);

    if (users.length === 0) return null;

    return UserSchema.parse(users[0]);
}

export async function loginUser(
    email: string,
    password: string
) : Promise<LoginResponse> {

    const user = await fetchUsersByEmail(email);

    if (!user) {
        return { success: false, message: "Gebruiker niet gevonden"};
    }

    if (user.password !== password) {
        return { success: false, message: "Onjuist wachtwoord"};
    }

    return {
        success: true,
        user,
    };
}

export async function verifyTwoFactor(
    email: string,
    code: string,
) : Promise<LoginResponse> {

    const user = await fetchUsersByEmail(email);

    if (!user) {
        return { success: false, message: "Gebruiker niet gevonden"};
    }

    if (user.twoFactorCode !== code) {
        return { success: false, message: "Ongeldige beveiliginscode"};
    }

    return {
        success: true,
        user,
    };
}
