import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get<Response>(
      `${environment.api_url}${path}`,
      { params }
    ).pipe(
      catchError(this.handleError)
    );
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put<Response>(
      `${environment.api_url}${path}`,
      body
    ).pipe(
      catchError(this.handleError)
    );
  }

  patch(path: string, body: Object = {}): Observable<any> {
    return this.http.patch<Response>(
      `${environment.api_url}${path}`,
      body
    ).pipe(
      catchError(this.handleError)
    );
  }

  post(path: string,  body: Object = {}): Observable<any> {
    return this.http.post<Response>(
      `${environment.api_url}${path}`,
      body
    ).pipe(
      catchError(this.handleError)
    );
  }

  delete(path: string): Observable<any> {
    return this.http.delete<Response>(
      `${environment.api_url}${path}`
    ).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.log(error);
    return throwError(error.error);
  }
}
