import axios, { AxiosInstance } from 'axios';
import TApiReturn from '../types/TApiReturn';

class Caller {
    axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: process.env.REACT_APP_API_ROOT
        });
    }

    async get(url: string, body?: any): Promise<TApiReturn | null> {
        try {
            const { data } = await this.axiosInstance.get(url);
            return data;
        } catch (error) {
            return error.response?.data || null;
        }
    }

    async post(url: string, body?: any): Promise<TApiReturn | null> {
        try {
            const { data } = await this.axiosInstance.post(url, body);
            return data;
        } catch (error) {
            return error.response?.data || null;
        }
    }

    async put(url: string, body?: any): Promise<TApiReturn | null> {
        try {
            const { data } = await this.axiosInstance.put(url, body);
            return data;
        } catch (error) {
            return error.response?.data || null;
        }
    }

    async del(url: string, body?: any): Promise<TApiReturn | null> {
        try {
            const { data } = await this.axiosInstance.delete(url);
            return data;
        } catch (error) {
            return error.response?.data || null;
        }
    }
}

const caller = new Caller();

export default caller;