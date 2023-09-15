import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomResponse } from '../interface/custom-response';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, tap } from 'rxjs/operators';
import { Server } from '../interface/server';
import { Status } from '../enum/status.enum';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class ServerService {


  private readonly apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {

    console.log("location.origin: " + location.origin);
    console.log("location.hrf: " + location.href);
    console.log("location.pathname: " + location.pathname);

   }

  // Procedural approach for reference
  //   getServers(): Observable<CustomResponse>{
  //     return this.http.get<CustomResponse>('http://localhost/server/list');
  //   }

  server$ = <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.apiUrl}/server/list`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      )

  save$ = (server: Server) => <Observable<CustomResponse>>
    this.http.post<CustomResponse>(`${this.apiUrl}/server/save`, server)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      )

  ping$ = (ipAddress: string) => <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.apiUrl}/server/ping/${ipAddress}`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      )

  delete$ = (serverId: number) => <Observable<CustomResponse>>
    this.http.delete<CustomResponse>(`${this.apiUrl}/server/delete/${serverId}`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      )

  filter$ = (status: Status, response: CustomResponse) => <Observable<CustomResponse>>
    new Observable<CustomResponse>(
      Subscriber => {
        console.log(response);
        Subscriber.next(
          status === Status.ALL ? { ...response, message: `Servers filtered by ${status} status` } :
            {
              ...response,

              message: response.data.servers
                .filter(server => server.status === status).length > 0 ? `Servers filtered by 
                ${status === Status.SERVER_UP ? 'SERVER UP' : 'SERVER DOWN'} status` : `No servers of ${status} found`,

              data: {
                servers: response.data.servers
                  .filter(server => server.status === status)
              }

            }
        );
        Subscriber.complete();
      }
    )
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    )


  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error)
    return throwError(() => new Error(`An error occurred - Error code: ${error.status}`));
  }

}
