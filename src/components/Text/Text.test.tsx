import { render, screen } from '@testing-library/react'
import Text from './Text'
 
describe('Text', () => {
    test('Should render without crash', async () => {
        render(<Text>text</Text>);
    })

    test('Should render the given text', async () => {
        render(<Text>text</Text>);

        const element = screen.getByText('text');
        expect(element.textContent).toBe('text');
    })
})