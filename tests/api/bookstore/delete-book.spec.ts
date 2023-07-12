import { expect, test } from "@playwright/test";
import { generateToken } from "../../../util/tokenGenerator";
import {addBooks} from "../../../util/bookService";
import {deleteUser} from "../../../util/userService";

test.describe('Delete Book', () => {
    let userId;
    let userToken: string | undefined;

    test.beforeEach(async ({ request }) => {
        const { userToken: token, userId: id } = await generateToken(request);
        userToken = token;
        userId = id;

        const isbns = ["9781449325863", "9781449331813"];
        await addBooks(request, userToken, userId, isbns);
    });

    test.afterEach(async ({ request }) => {
        await deleteUser(request, userToken, userId);
    });

    test('Book should be deleted', async ({ request }) => {
        const authorization = 'Bearer ' + userToken;
        const response = await request.delete('./bookStore/v1/book', {
            headers: {
                'Authorization': authorization,
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({
                isbn: "9781449325863",
                userId: userId
            }),
        });
        expect(response.status()).toBe(204);
    });

    test('Error should be present when delete non-existing book', async ({ request }) => {
        const authorization = 'Bearer ' + userToken;
        const response = await request.delete('./bookStore/v1/book', {
            headers: {
                'Authorization': authorization,
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({
                isbn: "9781449325862",
                userId: userId
            }),
        });
        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody).toEqual({
            code: '1206',
            message: 'ISBN supplied is not available in User\'s Collection!'
        });
    });
});