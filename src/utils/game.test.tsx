import IAction from "../interfaces/IAction";
import { whoWin } from "./game";

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
})