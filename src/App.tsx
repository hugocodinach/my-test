import styles from './styles/App.module.scss';

import HomePage from './pages/HomePage/HomePage';
import ActionsProvider from './context/actions/ActionsProvider';
import SnackbarsProvider from './context/snackbar/SnackbarsProvider';

function App() {
	return (
		<div className={styles.container}>
			<SnackbarsProvider>
				<ActionsProvider>
					<HomePage />
				</ActionsProvider>
			</SnackbarsProvider>
		</div>
	);
}

export default App;
