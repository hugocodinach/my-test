import { fireEvent, render, screen } from '@testing-library/react'
import { useContext } from 'react';
import renderer from 'react-test-renderer';
import SnackbarsContext from '../../context/snackbar/SnackbarsContext';
import SnackbarsProvider from '../../context/snackbar/SnackbarsProvider';
import apiErrors from '../../data/apiErrors';
import TApiReturn from '../../types/TApiReturn';
import TSnackbar from '../../types/TSnackbar';
import Snackbar from './Snackbar';
 
describe('Snackbar', () => {
    test('Should render without crash', async () => {
        render(
            <Snackbar snackbar={{ type: 'success', text: '', id: '' }} />
        );
    })

    test('Should render the given text', async () => {
        const snackbar: TSnackbar = { type: 'success', text: 'text', id: '' };
        render(<Snackbar snackbar={snackbar} />);

        const snackbarTextElement = screen.getByText(snackbar.text);

        expect(snackbarTextElement.textContent).toEqual(snackbar.text);
        const tree = renderer.create(<Snackbar snackbar={snackbar} />).toJSON();
        expect(tree).toMatchSnapshot();
    })

    test('Should call onClick prop and send id', async () => {
        let value = '';
        const snackbar: TSnackbar = { type: 'error', text: 'text', id: 'myId' };
        render(<Snackbar snackbar={snackbar} onClick={(id) => value = id} />);

        const snackbarTextElement = screen.getByText(snackbar.text);

        expect(snackbarTextElement.textContent).toEqual(snackbar.text);

        fireEvent.click(snackbarTextElement.closest('div')); // eslint-disable-line
        expect(value).toEqual(snackbar.id);

        const tree = renderer.create(<Snackbar snackbar={snackbar} />).toJSON();
        expect(tree).toMatchSnapshot();
    })

    test('Should render the given snackbar', async () => {
        const apiReturn: TApiReturn = { status: 'error', code: 'GS1', data: {} };
        const RenderContent = () => {
            const { addSnackbar } = useContext(SnackbarsContext);

            return (
                <button onClick={() => addSnackbar(apiReturn)} />
            );
        }
        const snackbar: TSnackbar = { type: 'success', text: 'text', id: '' };
        render(<SnackbarsProvider><RenderContent /></SnackbarsProvider>);

        const buttonElement = screen.getByRole('button');
        fireEvent.click(buttonElement);

        const snackbarTextElement = screen.getByText(apiErrors[apiReturn.code]);

        expect(snackbarTextElement.textContent).toEqual(apiErrors[apiReturn.code]);
    })
})