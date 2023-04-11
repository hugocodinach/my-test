import React from 'react';
import TApiReturn from '../../types/TApiReturn';

interface SnackbarContextInterface {
    addSnackbar: (snackbar: TApiReturn) => void;
}

export default React.createContext<SnackbarContextInterface>({} as SnackbarContextInterface);