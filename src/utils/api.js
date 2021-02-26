import { ajax } from 'rxjs/ajax';

const defaultUrlRoot = 'https://bad-api-assignment.reaktor.com/v2';

const api = {
    get: (url, forceError = false) =>
        ajax({
            method: 'GET',
            url: `${defaultUrlRoot}${url}`,
            headers: forceError ? { 'x-force-error-mode': 'all' } : {},
        }),
};

export default api;
