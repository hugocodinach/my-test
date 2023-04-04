import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import ActionsProvider from '../../context/actions/ActionsProvider';
import Chronometer from './Chronometer';
 
describe('Chronometer', () => {
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
                <Chronometer />
            </ActionsProvider>
        );

        expect(window.localStorage.getItem).toHaveBeenCalledTimes(4);
        expect(window.localStorage.setItem).toHaveBeenCalledTimes(4);

        const tree = renderer.create(<Chronometer />).toJSON();
        expect(tree).toMatchSnapshot();
    });
})