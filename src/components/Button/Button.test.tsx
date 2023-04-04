import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import Button from './Button';
 
describe('Button', () => {
    test('Should render without crash', async () => {
        render(<Button text='Cliquer' />);
        const tree = renderer.create(<Button text='Cliquer' />).toJSON();
        expect(tree).toMatchSnapshot();
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
        const tree = renderer.create(<Button text='Cliquer' />).toJSON();
        expect(tree).toMatchSnapshot();
    })

    test('Should render correcly (1)', async () => {
        const tree = renderer.create(<Button text='Cliquer' />).toJSON();
        act(() => {
            tree.props.onMouseEnter();
        })
        expect(tree).toMatchSnapshot();
    })

    test('Should render correcly (2)', async () => {
        const tree = renderer.create(<Button text='Cliquer' />).toJSON();
        act(() => {
            tree.props.onMouseEnter();
            tree.props.onMouseLeave();
        })
        expect(tree).toMatchSnapshot();
    })
})