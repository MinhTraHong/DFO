import { OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { AppInjector } from '../../app/app-injector.service';

declare let mApp: any;

export class BaseComponent implements OnInit, OnDestroy, AfterViewInit {
    protected activatedRoute: ActivatedRoute;
    protected onQueriesApplied: Subject<any> = new Subject<any>();
    protected onParamsApplied: Subject<any> = new Subject<any>();
    protected onAfterViewInit: Subject<any> = new Subject<any>();
    protected onNgDestroy: Subject<any> = new Subject<any>();
    protected query: any = {};
    protected params: any = {};
    public isLoading = true;
    constructor() {
        const injector = AppInjector.getInjector();

        this.activatedRoute = injector.get(ActivatedRoute);

        if (!this.activatedRoute) {
            return;
        }

        this.activatedRoute.queryParams.subscribe(inputs => {
            this.query = inputs;
            this.onQueriesApplied.next(inputs);
        });

        this.activatedRoute.params.subscribe(inputs => {
            this.params = inputs;
            this.onParamsApplied.next(inputs);
        })
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.onAfterViewInit.next();
    }

    showLoadingBar(isShow: boolean, callback = {}) {
        this.isLoading = isShow;

        if (window.hasOwnProperty('mApp')) {
            if (isShow) {
                mApp.block(".m-content", callback);
            } else {
                mApp.unblock(".m-content", callback);
            }
        }
    }

    ngOnDestroy() {
        this.onNgDestroy.next();
    }

    normalizeNumber(value: number) {
        return Math.round(value * 100) / 100;
    }

    formatCurrencyValue(price) {
        if (price) {
            return price.toString().replace(/\./g, "").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.").trim();
        }
        return "";
    }

    unformatCurrencyValue(price) {
        if (price) {
            return Number.parseFloat(price.toString().replace(/\./g, "").trim());
        }
        return "";
    }
}
