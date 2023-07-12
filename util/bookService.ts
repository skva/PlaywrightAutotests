import { expect } from "@playwright/test";

export const addBooks = async (request: any, userToken: string, userId: string, isbns: string[]) => {
    const authorization = 'Bearer ' + userToken;
    const response = await request.post('./bookStore/v1/books', {
        headers: {
            'Authorization': authorization,
            'Content-Type': 'application/json',
        },
        data: JSON.stringify({
            userId: userId,
            collectionOfIsbns: isbns.map(isbn => ({ isbn })),
        }),
    });

    expect(response.status()).toBe(201);

    const responseBody = await response.json();
    console.log('Book added to user collection:', responseBody);

    return responseBody;
};
