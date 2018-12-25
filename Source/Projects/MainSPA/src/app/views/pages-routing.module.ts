import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { Routes, RouterModule } from '@angular/router';
import { BaseService, DataVault } from '../services/base/base.service';
import { DataService } from '../base/data.service';
import { UserService } from '../services/index';

const routes: Routes = [
    {
        "path": "",
        "component": PagesComponent,
        "children": [
            {
                "path": "404",
                "loadChildren": ".\/not-found\/not-found.module#NotFoundModule"
            },
            {
                "path": "user-edit",
                "loadChildren": ".\/user\/edit\/user-edit.module#UserEditModule"
            },
            {
                "path": "user-list",
                "loadChildren": ".\/user\/list\/user-list.module#UserListModule"
            },
            {
                "path": "",
                "redirectTo": "user-list",
                "pathMatch": "full"
            }
        ]
    },
    {
        "path": "**",
        "redirectTo": "404",
        "pathMatch": "full"
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        BaseService, UserService, DataVault, DataService
    ],

})
export class PagesRoutingModule { }