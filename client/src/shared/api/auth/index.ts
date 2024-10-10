import { api, errorHandler, ValidationError } from "../api";
import { Body, Response } from "./model";

export const signIn = async (
    json: Pick<Body, "email" | "password">
): Promise<Response> => {
    try {
        if (!isValidEmail(json.email)) {
            throw new ValidationError("Неверно указана почта");
        }

        if (!isValidPassword(json.password)) {
            throw new ValidationError(
                "Длина пароля должна составлять не менее 8 символов"
            );
        }

        const res = await api.post("auth/login", { json }).json<Response>();

        console.log("Response from signIn:", res);
        return res;
    } catch (error) {
        console.error("Error during sign-in:", error);
        return await errorHandler(error);
    }
};

export const signUp = async (json: Omit<Body, "id">): Promise<Response> => {
    try {
        if (!isValidEmail(json.email)) {
            throw new ValidationError("Неверно указана почта");
        }

        if (!isValidPassword(json.password)) {
            throw new ValidationError(
                "Длина пароля должна составлять не менее 8 символов"
            );
        }

        const res = await api
            .post("auth/registration", { json })
            .json<Response>();
        console.log("Response from signUp:", res);

        return res;
    } catch (error) {
        return await errorHandler(error);
    }
};

function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPassword(password: string): boolean {
    return password.length >= 8;
}
