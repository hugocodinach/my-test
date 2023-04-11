import renderer from 'react-test-renderer';
import Chronometer from './Chronometer';
 
describe('Chronometer', () => {
    test('Should render without crash', async () => {
        const tree = renderer.create(<Chronometer />).toJSON();
        expect(tree).toMatchSnapshot();
    });
})