import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventBusService {
  public siteCodeChanged = new EventEmitter<void>();
  
  public emitSiteCodeChanged(): void {
    this.siteCodeChanged.emit();
  }
}