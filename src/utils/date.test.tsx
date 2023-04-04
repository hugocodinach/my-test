import actionLifetime from "../data/actionLifeTime";
import { getDateDelay } from "./date";

describe('getDateDelay function', () => {
    test('Should return a positive delay', () => {
        const date = new Date();
        date.setTime(date.getTime() + actionLifetime);

        const result = getDateDelay(date.toISOString());
        expect(result).toEqual(actionLifetime);
    });

    test('Should return zero', () => {
        const date = new Date();

        const result = getDateDelay(date.toISOString());
        expect(result).toEqual(0);
    });

    test('Should return a negative delay', () => {
        const date = new Date();
        date.setTime(date.getTime() - actionLifetime);

        const result = getDateDelay(date.toISOString());
        expect(result).toEqual(-actionLifetime);
    });
})