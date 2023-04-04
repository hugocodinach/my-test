import renderer from 'react-test-renderer';
import ActionsProvider from '../../context/actions/ActionsProvider';
import HomePage from './HomePage'
 
describe('HomePage', () => {
    test('Should render correctly', async () => {
        const tree = renderer.create(
            <ActionsProvider>
                <HomePage />
            </ActionsProvider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })
})