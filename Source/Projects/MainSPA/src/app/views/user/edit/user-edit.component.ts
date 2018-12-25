import { Component, Input, OnInit, ViewEncapsulation, AfterViewInit, Injectable } from '@angular/core';
import { BaseComponent } from '../../../base/base.component';
import { DataService } from '../../../base/data.service';
import { UserService } from '../../../services/index';

declare let toastr: any;
declare let moment: any;

@Component({
    selector: "app-user-edit",
    templateUrl: "./user-edit.component.html",
    encapsulation: ViewEncapsulation.None
})

export class UserEditComponent extends BaseComponent {
    @Input()
    public userId: string = null;
    public name: string = null;
    public age: number = 0;
    public address: string = null;

    constructor(private _userService: UserService,
        private dataService: DataService) {
        super();
    }

    ngOnInit() {
        if (this.dataService.state) {
            this.userId = this.dataService.state.id;
            this.name = this.dataService.state.name;
            this.age = this.dataService.state.age;
            this.address = this.dataService.state.address;

            this.dataService.state = null;
        }
    }

    ngAfterViewInit() {
    }

    onSave() {
        let user: any = {
            id: this.userId,
            name: this.name,
            age: this.age,
            address: this.address,
        };

        this.showLoadingBar(true);

        if (!this.userId) {
            this._userService.createUser(user).then(
                result => {
                    this.showLoadingBar(false);

                    if (!result || result.error) {
                        toastr.error("Fail! " + result.error.debug.message);
                        return;
                    }

                    this.userId = result.id;

                    toastr.success("Success");
                });
        }
        else {
            this._userService.editUser(user).then(
                result => {
                    this.showLoadingBar(false);

                    if (!result || result.error) {
                        toastr.error("Fail! " + result.error.debug.message);
                        return;
                    }

                    toastr.success("Success");
                });
        }
    }
}