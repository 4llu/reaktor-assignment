import { ajax } from 'rxjs/ajax';

// const defaultUrlRoot = 'https://bad-api-assignment.reaktor.com/v2';
const defaultUrlRoot = 'https://ah-cors-proxy.herokuapp.com/v2'; // To prevent cors error

const api = {
    get: (url, forceError = false) =>
        ajax({
            method: 'GET',
            url: `${defaultUrlRoot}${url}`,
            headers: forceError ? { 'x-force-error-mode': 'all' } : {},
            // headers: {},
        }),
};

export default api;
