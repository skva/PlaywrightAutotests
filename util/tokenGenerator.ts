import { expect } from "@playwright/test";
import users from "../fixtures/users.json";

export const generateToken = async (request: any) => {
    const uniqueUserName = `${users.apiUser.username}` + new Date().getTime();
    const password = `${users.apiUser.password}`;

    const response = await request.post('./account/v1/user', {
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify({
            userName: uniqueUserName,
            password: password,
        }),
    });

    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    const userId = responseBody.userID;
    console.log('User created with id:', userId, 'and username:', uniqueUserName);

    // Generate Token
    const tokenResponse = await request.post('./account/v1/generateToken', {
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
        },
        data: JSON.stringify({
            userName: uniqueUserName,
            password: password,
        }),
    });
    expect(tokenResponse.status()).toBe(200);
    const tokenResponseBody = await tokenResponse.json();
    const userToken = tokenResponseBody.token;

    return { userToken, userId };
};
