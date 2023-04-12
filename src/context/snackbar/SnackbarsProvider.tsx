import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import SnackbarsContext from './SnackbarsContext';

import Snackbar from '../../components/Snackbar/Snackbar';
import TSnackbar from '../../types/TSnackbar';
import TApiReturn from '../../types/TApiReturn';

import styles from './SnackbarsProvider.module.scss';
import apiErrors from '../../data/apiErrors';

export default function SnackbarsProvider(props) {
    //States
    const [snackbars, setSnackbars] = useState<TSnackbar[]>([]);

    const removeSnackbar = (id: string) => {
        setSnackbars((currentSnackbars) => currentSnackbars.filter(el => el.id !== id));
    }

    const addSnackbar = (apiReturn: TApiReturn) => {
        const finalSnackbar: TSnackbar = { type: apiReturn.status, text: '', id: uuidv4() };

        finalSnackbar.text = apiErrors[apiReturn.code] ? apiErrors[apiReturn.code] : 'erreur';

        setSnackbars(prevState => [...prevState, finalSnackbar]);

        setTimeout(() => {
            removeSnackbar(finalSnackbar.id);
        }, 4000);
    }

    return (
        <SnackbarsContext.Provider
            value={{ addSnackbar }}
        >
            <>
                <div className={styles.container}>
                    {snackbars.map(snackbar => (
                        <div key={snackbar.id} className={styles.snackbarContainer}>
                            <Snackbar snackbar={snackbar} onClick={removeSnackbar} />
                        </div>
                    ))}
                </div>
                {props.children}
            </>
        </SnackbarsContext.Provider>
    );
}