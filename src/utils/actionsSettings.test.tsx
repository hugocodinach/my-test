import actionsCreditCost from "../data/actionsCreditCost";
import actionsMaxCredit from "../data/actionsMaxCredit";
import actionTypes from "../data/actionTypes";
import IActionsSettings from "../interfaces/IActionsSettings";
import computeActionsSettings from "./actionsSettings"

describe('computeActionsSettings function', () => {
    test('Should return a result containing actionsCredits for all actionTypes', () => {
        const result: IActionsSettings = computeActionsSettings();

        actionTypes.forEach(type => {
            expect(result.actionsCredits[type]).toBeDefined();
            expect(result.actionsCredits[type].maxCredit).toEqual(actionsMaxCredit[type]);
            expect(result.actionsCredits[type].creditCost).toEqual(actionsCreditCost[type]);
            expect(result.actionsCredits[type].remainingCredits).toBeDefined();
        });
    });

    test('Should compute remainingCredits according to maxCredits', () => {
        const result: IActionsSettings = computeActionsSettings();

        actionTypes.forEach(type => {
            const minValue = Math.round(result.actionsCredits[type].maxCredit * 0.85);
            const maxValue = result.actionsCredits[type].maxCredit;

            expect(result.actionsCredits[type].maxCredit).toEqual(actionsMaxCredit[type]);
            expect(result.actionsCredits[type].creditCost).toEqual(actionsCreditCost[type]);
            expect(result.actionsCredits[type].remainingCredits).toBeGreaterThanOrEqual(minValue);
            expect(result.actionsCredits[type].remainingCredits).toBeLessThanOrEqual(maxValue);
        });
    });

    test('Should create a valid nextRefresh date', () => {
        const testDate = new Date();
        const result: IActionsSettings = computeActionsSettings();

        expect(result.nextRefresh).toBeDefined();

        const nexRefreshDate = new Date(result.nextRefresh);

        expect(nexRefreshDate.getHours()).toEqual(testDate.getHours());
        expect(nexRefreshDate.getMinutes()).toEqual(testDate.getMinutes());
        expect(nexRefreshDate.getDay()).toEqual(testDate.getDay() === 6 ? 0 : testDate.getDay() + 1);
    });

    test('Should create a valid nextRefresh date depending on given date', () => {
        const testDate = new Date('August 19, 1975 23:15:30');
        const result: IActionsSettings = computeActionsSettings(testDate.toISOString());

        expect(result.nextRefresh).toBeDefined();

        const nexRefreshDate = new Date(result.nextRefresh);

        expect(nexRefreshDate.getHours()).toEqual(testDate.getHours());
        expect(nexRefreshDate.getMinutes()).toEqual(testDate.getMinutes());
        expect(nexRefreshDate.getDay()).toEqual(testDate.getDay() === 6 ? 0 : testDate.getDay() + 1);
    });
});