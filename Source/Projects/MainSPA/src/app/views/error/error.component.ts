import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Helpers } from '../../helpers';
import { BaseComponent } from '../../base/base.component';

@Component({
    selector: ".m-grid.m-grid--hor.m-grid--root.m-page",
    templateUrl: "./error.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class ErrorsComponent extends BaseComponent {


    constructor(activatedRoute: ActivatedRoute) {
        super();
    }
    ngOnInit() {

    }
    ngAfterViewInit() {

        Helpers.bodyClass('m--skin- m-header--fixed m-header--fixed-mobile m-aside-left--enabled m-aside-left--skin-dark m-aside-left--fixed m-aside-left--offcanvas m-footer--push m-aside--offcanvas-default');

    }

}