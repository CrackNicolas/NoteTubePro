import axios, { AxiosRequestConfig } from "axios";

type types = 'GET' | 'POST' | 'PUT' | 'DELETE';

export async function Request(type: types, url: string, body?: object, config?: AxiosRequestConfig): Promise<any> {
    let response;

    switch (type) {
        case 'GET':
            response = await axios.get(url, config);
            break;
        case 'POST':
            response = await axios.post(url, body, config);
            break;
        case 'PUT':
            response = await axios.put(url, body, config);
            break;
        case 'DELETE':
            response = await axios.delete(url, { ...config, data: body });
            break;
    }

    return response;
}