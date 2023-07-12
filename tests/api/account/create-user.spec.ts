import {expect, test} from "@playwright/test";
import users from "../../../fixtures/users.json"

test.describe('User', () => {
    test("User should be created", async ({ request }) => {
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
    });

    test("Error should be present when create existing user", async ({ request}) => {
        const response = await request.post('./account/v1/user', {
            data: {
                userName: `${users.existingUser.username}`,
                password: `${users.existingUser.password}`,
            },
        });
        expect(response.status()).toBe(406);
        expect(await response.json()).toEqual({
            code: '1204',
            message: 'User exists!'
        });
    });
})