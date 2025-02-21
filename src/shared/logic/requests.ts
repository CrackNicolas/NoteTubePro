import axios, { AxiosRequestConfig, Method } from "axios";

type PropsRequest = {
    type: Method,
    url: string,
    body?: object,
    config?: AxiosRequestConfig
}

export async function httpRequest(props: PropsRequest): Promise<any> {
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