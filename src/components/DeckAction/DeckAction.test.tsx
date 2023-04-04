import { render, screen } from '@testing-library/react'
import emojis from '../../data/actionEmojis';
import IAction from '../../interfaces/IAction';
import getTranslatedActionName from '../../utils/actionsTranslations';
import DeckAction from './DeckAction';
 
describe('DeckAction', () => {
    test('Should render without crash', async () => {
        render(<DeckAction action={{ name: 'leaf', launchDate: '' }} />);
    })

    test('Should render the given action', async () => {
        const action: IAction = { name: 'rock', launchDate: '' };
        render(<DeckAction action={action} />);

        const actionNameElement = screen.getByText(getTranslatedActionName(action.name));
        const actionEmojiElement = screen.getByText(emojis[action.name]);

        expect(actionNameElement.textContent).toEqual(getTranslatedActionName(action.name));
        expect(actionEmojiElement.textContent).toEqual(emojis[action.name]);
    })

    test('Should render the given action with subtitle', async () => {
        const action: IAction = { name: 'leaf', launchDate: '' };
        render(<DeckAction action={action} subtitle='subtitle' />);

        const actionNameElement = screen.getByText(getTranslatedActionName(action.name));
        const actionEmojiElement = screen.getByText(emojis[action.name]);;
        const subtitleElement = screen.getByText('subtitle');

        expect(actionNameElement.textContent).toEqual(getTranslatedActionName(action.name));
        expect(actionEmojiElement.textContent).toEqual(emojis[action.name]);
        expect(subtitleElement.textContent).toEqual('subtitle');
    })
})