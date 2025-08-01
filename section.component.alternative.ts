import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil, of, finalize } from 'rxjs';
import { SiteCodeService } from './site-code.service';

export class SectionComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private isLoading = false;

  constructor(
    private siteCodeService: SiteCodeService,
    private crcApiService: CrcApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.siteCodeService.siteCode$
      .pipe(
        filter(siteCode => siteCode !== null),
        takeUntil(this.destroy$)
      )
      .subscribe((siteCode) => {
        // Prevent multiple simultaneous API calls
        if (!this.isLoading) {
          this.loadSections();
        }
      });
  }

  private loadSections(): void {
    if (this.isLoading) return; // Guard against multiple calls
    
    this.isLoading = true;
    const { page } = this.route.snapshot.data;
    
    this.crcApiService.sections$(
      page.pageType,
      this.route.snapshot.paramMap.get('productId') ?? undefined,
      true
    ).pipe(
      finalize(() => this.isLoading = false) // Reset loading state
    ).subscribe(sections => {
      this.sections$ = of(sections);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}