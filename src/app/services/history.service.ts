import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface FileHistory {
  id: string;
  title: string;
  description: string;
  fileName: string;
  fileSize: number;
  downloadUrl: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private readonly API_URL = 'http://localhost:5000/api/files';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getUserFiles(): Observable<FileHistory[]> {
    const token = this.authService.getAccessToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<FileHistory[]>(`${this.API_URL}/history`, { headers });
  }

  deleteFile(id: string): Observable<void> {
    const token = this.authService.getAccessToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete<void>(`${this.API_URL}/${id}`, { headers });
  }
}
