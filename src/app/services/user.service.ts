import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpClient = inject(HttpClient);
  readonly baseURL = 'http://localhost:3000/user';
  constructor() { }

  getUsers() {
    return this.httpClient.get<User[]>(this.baseURL);
  };

  getUserById(userId: number) {
    return this.httpClient.get<User>(`${this.baseURL}/${userId}`);
  }

  addUser(user: User) {
    return this.httpClient.post(this.baseURL, user);
  };

  updateUser(user: User, userId: number) {
    return this.httpClient.put(`${this.baseURL}/${userId}`, user);
  }

  Delete(userId: number) {
    // return this.httpClient.delete(`${this.baseURL}/${userId}`);
    return this.httpClient.delete(this.baseURL + '/' + userId);
  };
}
