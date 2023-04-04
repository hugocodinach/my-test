import { fireEvent, render, screen } from '@testing-library/react';
import { useContext } from 'react';
import ActionsContext from '../../context/actions/ActionsContext';
import ActionsProvider from '../../context/actions/ActionsProvider';
import IAction from '../../interfaces/IAction';
import getTranslatedActionName from '../../utils/actionsTranslations';
import Playground from './Playground';
 
describe('Playground', () => {
    beforeEach(() => {
        Object.defineProperty(window, "localStorage", {
          value: {
            getItem: jest.fn(() => null),
            setItem: jest.fn(() => null),
          },
          writable: true,
        });
        jest.spyOn(global.Math, 'random').mockReturnValue(0);
    });

    afterAll(() => {
        jest.spyOn(global.Math, 'random').mockRestore();
    })

    test('Should render without crash', async () => {
        render(
            <ActionsProvider>
                <Playground />
            </ActionsProvider>
        );

        expect(window.localStorage.getItem).toHaveBeenCalledTimes(4);
        expect(window.localStorage.setItem).toHaveBeenCalledTimes(4);
    });

    test('Should render no card sentence', async () => {
        render(
            <ActionsProvider>
                <Playground />
            </ActionsProvider>
        );

        const text = 'Ajoutez une carte à votre deck pour commencer un round';
        const element = screen.getByText(text);
        expect(element.textContent).toEqual(text);
    });

    test('Should render last round victory', async () => {
        const playerAction: IAction = { name: 'leaf', launchDate: '' };
        const TestComp = () => {
            const { play } = useContext(ActionsContext);
      
            return (
                <button onClick={() => play(playerAction)}>click</button>
            )
        }

        render(
            <ActionsProvider>
                <Playground />
                <TestComp />
            </ActionsProvider>
        );

        fireEvent.click(screen.getByRole('button', { name: 'click' }));

        const vsText = 'VS';
        const vsElement = screen.getByText(vsText);
        const computerText = getTranslatedActionName('rock');
        const computerElement = screen.getByText(computerText);
        const playerText = getTranslatedActionName(playerAction.name);
        const playerElement = screen.getByText(playerText);
        const resultText = 'Gagné !';
        const resultElement = screen.getByText(resultText);

    
        expect(vsElement.textContent).toEqual(vsText);
        expect(computerElement.textContent).toEqual(computerText);
        expect(playerElement.textContent).toEqual(playerText);
        expect(resultElement.textContent).toEqual(resultText);
    });

    test('Should render last round defeat', async () => {
        const playerAction: IAction = { name: 'scissors', launchDate: '' };
        const TestComp = () => {
            const { play } = useContext(ActionsContext);
      
            return (
                <button onClick={() => play(playerAction)}>click</button>
            )
        }

        render(
            <ActionsProvider>
                <Playground />
                <TestComp />
            </ActionsProvider>
        );

        fireEvent.click(screen.getByRole('button', { name: 'click' }));

        const vsText = 'VS';
        const vsElement = screen.getByText(vsText);
        const computerText = getTranslatedActionName('rock');
        const computerElement = screen.getByText(computerText);
        const playerText = getTranslatedActionName(playerAction.name);
        const playerElement = screen.getByText(playerText);
        const resultText = 'Perdu !';
        const resultElement = screen.getByText(resultText);

    
        expect(vsElement.textContent).toEqual(vsText);
        expect(computerElement.textContent).toEqual(computerText);
        expect(playerElement.textContent).toEqual(playerText);
        expect(resultElement.textContent).toEqual(resultText);
    });

    test('Should render last round draw', async () => {
        const playerAction: IAction = { name: 'rock', launchDate: '' };
        const TestComp = () => {
            const { play } = useContext(ActionsContext);
      
            return (
                <button onClick={() => play(playerAction)}>click</button>
            )
        }

        render(
            <ActionsProvider>
                <Playground />
                <TestComp />
            </ActionsProvider>
        );

        fireEvent.click(screen.getByRole('button', { name: 'click' }));

        const vsText = 'VS';
        const vsElement = screen.getByText(vsText);
        const playerAndComputerText = getTranslatedActionName('rock');
        const playerAndComputerElements = screen.getAllByText(playerAndComputerText);
        const resultText = 'Égalité';
        const resultElement = screen.getByText(resultText);


        expect(playerAndComputerElements.length).toEqual(2);
        expect(vsElement.textContent).toEqual(vsText);
        expect(resultElement.textContent).toEqual(resultText);
    });
})