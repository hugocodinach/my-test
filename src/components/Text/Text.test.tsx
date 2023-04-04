import { render, screen } from '@testing-library/react'
import renderer from 'react-test-renderer';
import Text from './Text'
 
describe('Text', () => {
    test('Should render without crash', async () => {
        render(<Text>text</Text>);

        const tree = renderer.create(<Text>text</Text>).toJSON();
        expect(tree).toMatchSnapshot();
    })

    test('Should render the given text', async () => {
        render(<Text>text</Text>);

        const element = screen.getByText('text');
        expect(element.textContent).toBe('text');
    })
})