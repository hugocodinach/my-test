import { useContext } from 'react';
import caller from '../api/axiosInstance';
import SnackbarsContext from '../context/snackbar/SnackbarsContext';

export function useApi(requestType: 'get' | 'post' | 'put' | 'del', url) {
    const { addSnackbar } = useContext(SnackbarsContext);

    const call = async (body = {}) => {
        const res = await caller[requestType](url, body);

        if (!res)
            return null;

        if (res.status === 'error') {
            addSnackbar(res);
            return null;
        }

        return res.data;
    };

    return {
        call
    };
}