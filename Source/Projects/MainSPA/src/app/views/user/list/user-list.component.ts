import { Component, Input, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { BaseComponent } from '../../../base/base.component';
import { DataService } from '../../../base/data.service';
import { ScriptLoaderService } from '../../../services/base/script-loader.service';
import { UserService } from "../../../services/index";
import * as $ from 'jquery';

declare let Porlet: any;
declare let UserListTable: any;

@Component({
    selector: "app-user-list",
    templateUrl: "./user-list.component.html",
    encapsulation: ViewEncapsulation.None,
})

export class UserListComponent extends BaseComponent {
    @Input()
    public roles: any;

    constructor(activatedRoute: ActivatedRoute,
        private _script: ScriptLoaderService,
        private _userService: UserService,
        private dataService: DataService,
        private route: Router) {
        super();
    }
    ngOnInit() {
    }

    ngAfterViewInit() {
        this._script.loadScripts('app-user-list',
            ['/assets/app/js/user/list/user-list.component.js'], true).then(() => {
                let serviceParams = this._userService.getAllUsersParams();
                UserListTable.init(serviceParams.method, serviceParams.url, serviceParams.headers);
                this.initTableEvents();

                Porlet.on("reload", function(e) {
                    UserListTable.reload();
                });

                $("#generalSearch").keyup(function(e) {
                    var code = e.which;
                    if (code == 13) e.preventDefault();
                    if (code == 32 || code == 13 || code == 188 || code == 186) {
                        UserListTable.searchName($(this).val());
                    }
                })
            });
    }

    initTableEvents() {
        let $this = this;

        UserListTable.getComponentUI().on("m-datatable--on-layout-updated", function() {
            $(".btn-edit").click(e => {
                $this.dataService.state = UserListTable.getDataRow(e.currentTarget.dataset["id"]);
                $this.route.navigate(['/user-edit']);
            });
        })
    }
}