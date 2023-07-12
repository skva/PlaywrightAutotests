import { expect } from "@playwright/test";

export const deleteUser = async (request: any, userToken: string, userId: string) => {
    const authorization = 'Bearer ' + userToken;
    const response = await request.delete(`./account/v1/user/${userId}`, {
        headers: {
            'Authorization': authorization,
            'Accept': 'application/json',
        }
    });

    expect(response.status()).toBe(204);
    console.log('User deleted with id:', userId);
};
