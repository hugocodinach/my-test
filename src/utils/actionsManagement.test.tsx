import actionLifetime from "../data/actionLifeTime";
import IAction from "../interfaces/IAction";
import { createNewActionFromName } from "./actionsManagement";

describe('createNewActionFromName function', () => {
    test('Should return a valid IAction', () => {
        const result: IAction = createNewActionFromName([], 'rock');

        expect(result).toBeDefined();
        expect(result.launchDate).toBeDefined();
        expect(result.name).toEqual('rock');
    });

    test('Should return a IAction with a launch date depending on empty queue and actionLifetime', () => {
        const now = new Date();
        const result: IAction = createNewActionFromName([], 'rock');

        const resultDate = new Date(result.launchDate);

        now.setSeconds(0, 0);
        resultDate.setSeconds(0, 0);
        expect(resultDate.getTime()).toEqual(now.getTime() + actionLifetime);
    });

    test('Should return a IAction with a launch date depending on queue and actionLifetime', () => {
        const nextActionDate = new Date('March 13, 08 04:20');
        const nextAction: IAction = { name: 'rock', launchDate: nextActionDate.toISOString() };
        const result: IAction = createNewActionFromName([nextAction], 'rock');

        const resultDate = new Date(result.launchDate);
        expect(resultDate.getTime()).toEqual(nextActionDate.getTime() + actionLifetime);
    });
})