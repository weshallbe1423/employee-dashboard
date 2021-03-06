import { Injectable } from '@angular/core';
import{ Register } from '../register'
import { Observable,throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError,tap, map } from 'rxjs/operators';


//http header data 
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  
  uri="http://localhost:4000/api/register"
  constructor(private http:HttpClient) { }
//register user
createUser(user:Register){
console.log(".................user"+JSON.stringify(user));
return this.http.post(`${this.uri}/`,user,{responseType:'arraybuffer'})
}

//get all users
getUsers(): Observable<any> {
  return this.http.get(this.uri, httpOptions).pipe(
    map(this.extractData),
    catchError(this.handleError));
}
private extractData(res: Response) {
  let body = res;
  return body || { };
}
private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // return an observable with a user-facing error message
  return throwError('Something bad happened; please try again later.');
};

//delete user
deleteUser(id) {
  return this.http.delete(`${this.uri}/${id}`);
}
editUser(id) {
  return this
          .http
          .get(`${this.uri}/edit/${id}`);
  }

updateUser (id, Register): Observable<any> {
  const url = `${this.uri}/${id}`;
  return this.http.post(url,Register,httpOptions)
  .pipe( tap(_ => console.log(`updated product id=${id}`)),
    catchError(this.handleError)
   
    
  );
  
}
}
