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
          // Notify about site code change (only emits if different)
          this.siteCodeService.notifySiteCodeChanged(siteCode);
        })
      );
    
    return put$;
  }
}