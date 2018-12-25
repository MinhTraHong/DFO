import { Injectable } from "@angular/core";
import { BaseService } from "./base/base.service";
import { ActionResult, User } from "../models";
import { APP_CONFIG } from '../constants/config';

@Injectable()
export class UserService extends BaseService {
    constructor() {
        super();
    }

    getAllUsersParams() {
        return {
            method: 'GET',
            url: this.getUrl(APP_CONFIG.CURRENT_ENVIRONMENT).api + `/api/user/get-all`,
            headers: this.getHeaders()
        }
    }

    async getUser(id: string) {
        let result = new ActionResult();

        try {
            let url = this.getUrl(APP_CONFIG.CURRENT_ENVIRONMENT).api + `/api/user/get?id=` + id;
            let resp = await this.get(url);

            return result.data = resp;
        } catch (err) {
            result.error = err;
        }

        return result;
    }

    async createUser(user: User) {
        let result = new ActionResult();

        try {
            let url = this.getUrl(APP_CONFIG.CURRENT_ENVIRONMENT).api + `/api/user/create`;
            let resp = await this.post(url, user);

            return result.data = resp;
        } catch (err) {
            result.error = err;
        }

        return result;
    }

    async editUser(user: User) {
        let result = new ActionResult();

        try {
            let url = this.getUrl(APP_CONFIG.CURRENT_ENVIRONMENT).api + `/api/user/edit`;
            let resp = await this.post(url, user);

            return result.data = resp;
        } catch (err) {
            result.error = err;
        }

        return result;
    }
}