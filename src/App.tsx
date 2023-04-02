import styles from './styles/App.module.scss';

import HomePage from './pages/HomePage/HomePage';
import ActionsProvider from './context/actions/ActionsProvider';

function App() {
	return (
		<div className={styles.container}>
			<ActionsProvider>
				<HomePage />
			</ActionsProvider>
		</div>
	);
}

export default App;
