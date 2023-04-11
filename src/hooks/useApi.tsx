import caller from '../api/axiosInstance';

export function useApi(requestType: 'get' | 'post' | 'put' | 'del', url) {
    const call = async (body = {}) => {
        const res = await caller[requestType](url, body);

        if (!res)
            return null;

        if (res.status === 'error')
            return null;

        return res.data;
    };

    return {
        call
    };
}