import { fireEvent, render, screen } from '@testing-library/react'
import Button from './Button'
 
describe('Button', () => {
    test('Should render without crash', async () => {
        render(<Button text='Cliquer' />);
    })

    test('Should render the given text', async () => {
        render(<Button text='Cliquer' />);

        const button = screen.getByRole('button');
        expect(button.textContent).toBe('Cliquer');
    })

    test('Should call onClick callback when clicked', async () => {
        let value = null;
        render(<Button text='Cliquer' onClick={() => value = 'clicked'} />);

        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(value).toBe('clicked');
    })
})