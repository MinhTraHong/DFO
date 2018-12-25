import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ErrorsComponent } from './error.component';
import { LayoutModule } from '../_layouts/layout.module';

const routes: Routes = [
    {
        "path": "",
        "component": ErrorsComponent
    }
];
@NgModule({
    imports: [
        CommonModule, RouterModule.forChild(routes), LayoutModule
    ], exports: [
        RouterModule
    ], declarations: [
        ErrorsComponent
    ]
})
export class ErrorsError1Module {



}