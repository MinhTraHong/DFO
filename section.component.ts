import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil, of } from 'rxjs';
import { SiteCodeService } from './site-code.service';

export class SectionComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    private siteCodeService: SiteCodeService,
    private crcApiService: CrcApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Subscribe to site code changes
    this.siteCodeService.siteCodeChanged$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const { page } = this.route.snapshot.data;
        
        this.crcApiService.sections$(
          page.pageType,
          this.route.snapshot.paramMap.get('productId') ?? undefined,
          true
        ).subscribe(sections => {
          this.sections$ = of(sections);
        });
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}