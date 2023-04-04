import actionLifetime from "../data/actionLifeTime";
import IAction from "../interfaces/IAction";
import { createNewActionFromName, skipNextAction } from "./actionsManagement";

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

describe('skipNextAction function', () => {
    test('Should return an empty queue (1)', () => {
        const result: IAction[] = skipNextAction([]);

        expect(result).toBeDefined();
        expect(result.length).toEqual(0);
    });

    test('Should return an empty queue (2)', () => {
        const result: IAction[] = skipNextAction([{ name: 'leaf', launchDate: '' }]);

        expect(result).toBeDefined();
        expect(result.length).toEqual(0);
    });

    test('Should slice the first queue element', () => {
        const result: IAction[] = skipNextAction([
            { name: 'rock', launchDate: '' },
            { name: 'leaf', launchDate: '' }
        ]);

        expect(result).toBeDefined();
        expect(result.length).toEqual(1);
        expect(result[0].name).toEqual('leaf');
    });

    test('Should reduce all launchDate by actionLifetime', () => {
        const firstDate = new Date();
        const secondDate = new Date();
        secondDate.setTime(secondDate.getTime() + actionLifetime);

        const launchDates = [firstDate, secondDate];
        const result: IAction[] = skipNextAction([
            { name: 'rock', launchDate: '' },
            { name: 'leaf', launchDate: launchDates[0].toISOString() },
            { name: 'scissors', launchDate: launchDates[1].toISOString() }
        ]);

        expect(result).toBeDefined();
        expect(result.length).toEqual(2);
        expect(result[0].name).toEqual('leaf');
        expect(result[1].name).toEqual('scissors');

        result.forEach(({ launchDate }, key) => {
            const date = new Date(launchDate);

            expect(date.getTime()).toEqual(launchDates[key].getTime() - actionLifetime);
        })
    });
})