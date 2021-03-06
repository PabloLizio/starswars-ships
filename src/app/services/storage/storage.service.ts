import { Router } from '@angular/router';
import { SessionToken } from './../../models/session-token';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private currentSession: SessionToken = null;

  constructor(private router: Router) {
    this.currentSession = this.loadSessionData();
  }

  setCurrentSession(session: SessionToken): void {
    this.currentSession = session;
    localStorage.setItem('currentUser', JSON.stringify(session));
  }

  loadSessionData(): SessionToken {
    const savedSession = localStorage.getItem('currentUser');
    return savedSession ? JSON.parse(savedSession) : null;
  }

  removeCurrentSession(): void {
    localStorage.removeItem('currentUser');
    this.currentSession = null;
  }

  isAuthenticated(): boolean {
    return this.currentSession
      ? this.currentSession.token
        ? true
        : false
      : false;
  }

  logout(): void {
    this.removeCurrentSession();
    this.router.navigate(['/login']);
  }
}
