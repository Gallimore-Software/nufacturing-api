import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  private apiUrl = `${environment.apiUrl}/users/all-users`;

  getAllUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
