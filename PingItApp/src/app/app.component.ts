import { Component, OnInit } from '@angular/core';
import { ServerService } from './service/server.service';
import { AppState } from './interface/app-state';
import { CustomResponse } from './interface/custom-response';
import { Observable, catchError, map, of, startWith } from 'rxjs';
import { DataState } from './enum/data-state.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  appState$: Observable<AppState<CustomResponse>>;

  constructor(private sererService: ServerService) { }

  ngOnInit(): void {
    this.appState$ = this.sererService.server$
      .pipe(
        map(response => {
          return { dataState: DataState.LOADED_STATE, appData: response }
        }),

        startWith({ dataState: DataState.LOADING_STATE }),

        catchError((error: string) => {
          return of({ dataState: DataState.ERROR_STATE, error })
        })
      );

  }

}
