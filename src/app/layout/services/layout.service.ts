import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class LayoutService {
    private preloaderStateSource = new Subject<string>();
    private searchOverlaySource = new Subject<string>();

    preloaderState$ = this.preloaderStateSource.asObservable();
    searchOverlayState$ = this.searchOverlaySource.asObservable();

    updatePreloaderState(state: string) {
        this.preloaderStateSource.next(state);
    }

    updateSearchOverlayState(state: string) {
        this.searchOverlaySource.next(state);
    }
}
