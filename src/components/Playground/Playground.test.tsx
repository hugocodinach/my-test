import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Playground from './Playground';
 
describe('Playground', () => {
    beforeEach(() => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0);
    });

    afterAll(() => {
        jest.spyOn(global.Math, 'random').mockRestore();
    })

    test('Should render without crash', async () => {
        const tree = renderer.create(
            <Playground />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('Should render no card sentence', async () => {
        render(
            <Playground />
        );

        const text = 'Ajoutez une carte à votre deck pour commencer un round';
        const element = screen.getByText(text);
        expect(element.textContent).toEqual(text);
    });
})