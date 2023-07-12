import { expect, test } from "@playwright/test";
import { generateToken } from "../../../util/tokenGenerator";
import {deleteUser} from "../../../util/userService";

test.describe('Add Book', () => {
    let userId;
    let userToken: string | undefined;

    test.beforeEach(async ({ request }) => {
        const { userToken: token, userId: id } = await generateToken(request);
        userToken = token;
        userId = id;
    });

    test.afterEach(async ({ request }) => {
        await deleteUser(request, userToken, userId);
    });

    test('Book should be added', async ({ request }) => {
        const authorization = 'Bearer ' + userToken;
        const response = await request.post('./bookStore/v1/books', {
            headers: {
                'Authorization': authorization,
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({
                userId: userId,
                collectionOfIsbns: [
                    {
                        isbn: "9781449325862"
                    },
                    {
                        isbn: "9781449331818"
                    }
                ]
            }),
        });
        expect(response.status()).toBe(201);
        const responseBody = await response.json();
        console.log('Book added to user collection:', responseBody);
    });

    test('Error should be present when add empty book isbn body', async ({ request }) => {
        const authorization = 'Bearer ' + userToken;
        const response = await request.post('./bookStore/v1/books', {
            headers: {
                'Authorization': authorization,
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({
                userId: userId,
                collectionOfIsbns: []
            }),
        });

        expect(response.status()).toBe(400);

        const responseBody = await response.json();
        expect(responseBody).toEqual({
            code: '1207',
            message: 'Collection of books required.'
        });
        console.log('Book added to user collection:', responseBody);
    });
});