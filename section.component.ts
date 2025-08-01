import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil, of } from 'rxjs';
import { SiteCodeService } from './site-code.service';

export class SectionComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private isLoadingSections = false;

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
        this.loadSections();
      });
  }

  private loadSections(): void {
    // Prevent multiple simultaneous calls
    if (this.isLoadingSections) {
      return;
    }
    
    this.isLoadingSections = true;
    const { page } = this.route.snapshot.data;
    
    this.crcApiService.sections$(
      page.pageType,
      this.route.snapshot.paramMap.get('productId') ?? undefined,
      true
    ).subscribe({
      next: (sections) => {
        this.sections$ = of(sections);
        this.isLoadingSections = false;
      },
      error: (error) => {
        console.error('Error loading sections:', error);
        this.isLoadingSections = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}