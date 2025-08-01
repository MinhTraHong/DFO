import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SiteCodeService } from './site-code.service';

@Injectable()
export class YourOtherService {
  
  constructor(
    private http: HttpClient,
    private siteCodeService: SiteCodeService,
    private config: YourConfig
  ) {}

  private put$(siteCode: string): Observable<BaseSite[]> {
    const put$ = this.http.put<CRCAuthorizationResult>(`${this.config?.url}/Location/${siteCode}`, null)
      .pipe(
        tap(() => {
          // Update the site code (will only emit if it's different)
          this.siteCodeService.updateSiteCode(siteCode);
        })
      );
    
    return put$;
  }
}