import IAction from "../interfaces/IAction";
import { createComputerAction, whoWin, isThereANextRound } from "./game";

describe('whoWin function', () => {
    test('Should return computer (1)', () => {
        const computerAction: IAction = {
            name: 'rock',
            launchDate: ''
        };
        const playerAction: IAction = {
            name: 'scissors',
            launchDate: ''
        };
        const result = whoWin(playerAction, computerAction);
        expect(result).toEqual('computer');
    });

    test('Should return computer (2)', () => {
        const computerAction: IAction = {
            name: 'leaf',
            launchDate: ''
        };
        const playerAction: IAction = {
            name: 'rock',
            launchDate: ''
        };
        const result = whoWin(playerAction, computerAction);
        expect(result).toEqual('computer');
    });

    test('Should return computer (3)', () => {
        const computerAction: IAction = {
            name: 'scissors',
            launchDate: ''
        };
        const playerAction: IAction = {
            name: 'leaf',
            launchDate: ''
        };
        const result = whoWin(playerAction, computerAction);
        expect(result).toEqual('computer');
    });

    test('Should return player (1)', () => {
        const computerAction: IAction = {
            name: 'rock',
            launchDate: ''
        };
        const playerAction: IAction = {
            name: 'leaf',
            launchDate: ''
        };
        const result = whoWin(playerAction, computerAction);
        expect(result).toEqual('player');
    });

    test('Should return player (2)', () => {
        const computerAction: IAction = {
            name: 'leaf',
            launchDate: ''
        };
        const playerAction: IAction = {
            name: 'scissors',
            launchDate: ''
        };
        const result = whoWin(playerAction, computerAction);
        expect(result).toEqual('player');
    });

    test('Should return player (3)', () => {
        const computerAction: IAction = {
            name: 'scissors',
            launchDate: ''
        };
        const playerAction: IAction = {
            name: 'rock',
            launchDate: ''
        };
        const result = whoWin(playerAction, computerAction);
        expect(result).toEqual('player');
    });

    test('Should return draw (1)', () => {
        const computerAction: IAction = {
            name: 'rock',
            launchDate: ''
        };
        const playerAction: IAction = {
            name: 'rock',
            launchDate: ''
        };
        const result = whoWin(playerAction, computerAction);
        expect(result).toEqual('draw');
    });

    test('Should return draw (2)', () => {
        const computerAction: IAction = {
            name: 'leaf',
            launchDate: ''
        };
        const playerAction: IAction = {
            name: 'leaf',
            launchDate: ''
        };
        const result = whoWin(playerAction, computerAction);
        expect(result).toEqual('draw');
    });

    test('Should return draw (3)', () => {
        const computerAction: IAction = {
            name: 'scissors',
            launchDate: ''
        };
        const playerAction: IAction = {
            name: 'scissors',
            launchDate: ''
        };
        const result = whoWin(playerAction, computerAction);
        expect(result).toEqual('draw');
    });
});

describe('createComputerAction function', () => {
    test('Should return a valid IAction', () => {
        const result: IAction = createComputerAction();

        expect(result).toBeDefined();
        expect(result.name).toBeDefined();
        expect(result.launchDate).toBeDefined();
    });

    test('Should return a rock IAction', () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0);
        const result: IAction = createComputerAction();

        expect(result).toBeDefined();
        expect(result.name).toEqual('rock');
        jest.spyOn(global.Math, 'random').mockRestore();
    });

    test('Should return a leaf IAction', () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
        const result: IAction = createComputerAction();

        expect(result).toBeDefined();
        expect(result.name).toEqual('leaf');
        jest.spyOn(global.Math, 'random').mockRestore();
    });

    test('Should return a scissors IAction', () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.9);
        const result: IAction = createComputerAction();

        expect(result).toBeDefined();
        expect(result.name).toEqual('scissors');
        jest.spyOn(global.Math, 'random').mockRestore();
    });
});

describe('isThereANextRound function', () => {
    test('Should return false (empty queue)', () => {
        const result: boolean = isThereANextRound([]);

        expect(result).toEqual(false);
    });

    test('Should return false (no next action)', () => {
        const actionDate = new Date();
        actionDate.setTime(actionDate.getTime() - 2 * 60 * 1000);
        const result: boolean = isThereANextRound([{ name: 'leaf', launchDate: actionDate.toISOString() }]);

        expect(result).toEqual(false);
    });

    test('Should return true', () => {
        const actionDate = new Date();
        actionDate.setTime(actionDate.getTime() + 2 * 60 * 1000);
        const result: boolean = isThereANextRound([{ name: 'leaf', launchDate: actionDate.toISOString() }]);

        expect(result).toEqual(true);
    });
});