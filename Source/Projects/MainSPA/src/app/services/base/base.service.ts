import { Injectable, ReflectiveInjector } from "@angular/core";
import { AppInjector } from '../../../app/app-injector.service';
import { Http, Headers, HttpModule, RequestOptions, Response } from "@angular/http";
import { CookieService } from 'ngx-cookie';
import { encrypt, decrypt, SjclCipherEncrypted, } from 'sjcl';
import * as CryptoJS from 'crypto-js';
import { APP_CONFIG } from '../../constants/config';
import { CONNECTIVITY } from '../../constants/connectivity';
import { STORAGE_KEY } from '../../constants/storage-key';

class KeyValueItem {
    key: string;
    value: string;
    type: string;
}

export class DataVault {
    private collections = {};
    private lenght: number = 0;
    private cookieService;

    constructor() {
        const injector = AppInjector.getInjector();
        this.cookieService = injector.get(CookieService);
    }

    count() {
        return this.lenght;
    }

    add(key: string, value: string | object | number | boolean, longterm: boolean = false, userPhrase: string = "") {
        if (value === undefined || value === null) {
            return this.lenght;
        }

        let type = typeof value;
        let item = new KeyValueItem();
        item.key = key;
        item.type = type;

        switch (type) {
            case "object":
                {
                    let json = JSON.stringify(value);
                    item.value = json;
                    break;
                }
            default:
                {
                    item.value = value.toString();
                    break;
                }
        }

        this.collections[key] = item;
        this.lenght++;

        if (longterm) {
            let cookie = JSON.stringify(item);
            let password = APP_CONFIG.DATA_KEY;
            let indexer = key;

            if (userPhrase !== "" && userPhrase.length === 64) {
                password = CryptoJS.SHA256(password + userPhrase);
                indexer = key + ".user";
            }

            let encrypted = encrypt(password, cookie);
            this.cookieService.put(indexer, JSON.stringify(encrypted));
        }

        return this.lenght;
    }

    remove(key: string) {
        let value = this.read(key)
        this.collections[key] = undefined;
        this.lenght--;

        this.cookieService.remove(key);
        this.cookieService.remove(key + ".user");
        return value;
    }

    read(key: string, longterm: boolean = false, userPhrase: string = "") {
        let item = this.collections[key];
        if (item === undefined) {
            if (!longterm) {
                return null;
            }

            let password = APP_CONFIG.DATA_KEY;
            let indexer = key;

            if (userPhrase !== "" && userPhrase.length === 64) {
                password = CryptoJS.SHA256(password + userPhrase);
                indexer = key + ".user";
            }

            let data = this.cookieService.get(indexer);
            if (!data) {
                return null;
            }

            let encrypted = JSON.parse(data) as SjclCipherEncrypted;
            let cookie = decrypt(password, encrypted);
            item = JSON.parse(cookie) as KeyValueItem;
        }

        switch (item["type"]) {
            case "object":
                return JSON.parse(item["value"]);
            case "number":
                return Number.parseFloat(item["value"]);
            case "boolean":
                return item["value"] === "true" ? true : false;
            default:
                return item["value"];
        }
    }
}

@Injectable()
export class BaseService {
    private http: Http;
    private dataVault: DataVault;

    constructor() {
        const injector = AppInjector.getInjector();

        this.http = injector.get(Http);
        this.dataVault = injector.get(DataVault);
    }

    protected handleResponse(response: any) {
        let data = response.json() || null;
        return Promise.resolve(data);
    }

    protected handleError(error: any) {
        if (!error || error.status === 0) {
            return Promise.reject({
                type: "network_error",
                message: "Network Error",
                debug: {
                    message: "network_error"
                }
            });
        }

        if (error.status >= 500) {
            return Promise.reject({
                type: "server_error",
                message: "Server Error",
                debug: error.json()
            });
        }

        if (error.status === 400) {
            return Promise.reject({
                type: "server_error",
                message: "Client Error",
                debug: error.json()
            });
        }

        if (error.status === 401) {
            return Promise.reject({
                type: "session_error",
                message: "Invalid Session",
                debug: error.json()
            });
        }

        if (error.status >= 400) {
            return Promise.reject({
                type: "error",
                message: "Error",
                debug: error.json()
            });
        }
    }

    protected getUrl(env: string) {
        switch (env) {
            case APP_CONFIG.ENVIRONMENT_LOCAL:
                return {
                    api: CONNECTIVITY.API_ENDPOINT_LOCAL
                }
            case APP_CONFIG.ENVIRONMENT_STAGING:
                return {
                    api: CONNECTIVITY.API_ENDPOINT_STAGING
                }
            case APP_CONFIG.ENVIRONMENT_DEV:
                return {
                    api: CONNECTIVITY.API_ENDPOINT_DEV
                }
            default:
                return {
                    api: CONNECTIVITY.API_ENDPOINT
                }
        }
    }

    protected get(url: string, headers: Headers = null) {
        if (headers == null) {
            headers = new Headers({
                'Content-Type': 'application/json',
                'token': this.dataVault.read(STORAGE_KEY.ACCESS_TOKEN, true)
            });
        }

        return this.http
            .get(url, {
                headers: headers
            })
            .toPromise()
            .then(this.handleResponse)
            .catch(this.handleError);
    }

    protected post(url: string, data: any, headers: Headers = null) {
        if (headers == null) {
            headers = new Headers({
                'Content-Type': 'application/json',
                'token': this.dataVault.read(STORAGE_KEY.ACCESS_TOKEN, true)
            });
        }

        return this.http
            .post(url, data, {
                headers: headers
            })
            .toPromise()
            .then(this.handleResponse)
            .catch(this.handleError);
    }

    protected delete(url: string, headers: Headers = null) {
        if (headers == null) {
            headers = new Headers({
                'Content-Type': 'application/json',
                'token': this.dataVault.read(STORAGE_KEY.ACCESS_TOKEN, true)
            });
        }

        return this.http
            .delete(url, {
                headers: headers
            })
            .toPromise()
            .then(this.handleResponse)
            .catch(this.handleError);
    }

    public getHeaders() {
        let headers = {
            'Content-Type': 'application/json'
        };

        let token = this.dataVault.read(STORAGE_KEY.ACCESS_TOKEN, true);
        if (token) {
            headers['token'] = token;
        }

        return headers;
    }

    public store(key: string, value: any, longterm: boolean = false) {
        this.dataVault.add(key, value, longterm);
        return;
    }

    public read(key: string, longterm: boolean = false) {
        return this.dataVault.read(key, longterm);
    }

    public remove(key: string) {
        return this.dataVault.remove(key);
    }
}