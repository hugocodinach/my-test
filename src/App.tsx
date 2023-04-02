import styles from './styles/App.module.scss';

import HomePage from './pages/HomePage/HomePage';

function App() {
	return (
		<div className={styles.container}>
			<HomePage />
		</div>
	);
}

export default App;
