import { getDateDelay } from "./date";

describe('getDateDelay function', () => {
    test('Should return a positive delay', () => {
        const date = new Date();
        date.setTime(date.getTime() + 2 * 60 * 1000);

        const result = getDateDelay(date.toISOString());
        expect(result).toBeGreaterThan(0);
    });

    test('Should return zero', () => {
        const date = new Date();

        const result = getDateDelay(date.toISOString());
        expect(result).toEqual(0);
    });

    test('Should return a negative delay', () => {
        const date = new Date();
        date.setTime(date.getTime() - 2 * 60 * 1000);

        const result = getDateDelay(date.toISOString());
        expect(result).toBeLessThan(0);
    });
})