import axios, { AxiosRequestConfig } from "axios";

type types = 'GET' | 'POST' | 'PUT' | 'DELETE';

type Props = {
    type: types,
    url: string,
    body?: object,
    config?: AxiosRequestConfig
}

export async function Request(props: Props): Promise<any> {
    const { type, url, body, config } = props;

    let response;

    switch (type) {
        case 'GET':
            response = await axios.get(url, config);
            break;
        case 'POST':
            response = await axios.post(url, body, config);
            break;
        case 'PUT':
            response = await axios.put(url, body);
            break;
        case 'DELETE':
            response = await axios.delete(url, { ...config, data: body });
            break;
    }

    return response;
}