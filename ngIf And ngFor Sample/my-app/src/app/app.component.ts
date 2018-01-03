import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private url: string = 'http://dummy.restapiexample.com/api/v1/employees';
  employeeList;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getEmployees().subscribe(result => {
      this.employeeList = result;
    });
  }

  getEmployees(): Observable<object[]> {
    return this.http.get<object[]>(this.url)
    .pipe(catchError(this.handleError<object[]>('getEmployees', [])));
  }

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
