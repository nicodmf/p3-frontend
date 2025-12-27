import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface UploadResponse {
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
export class UploadService {
  private readonly API_URL = 'http://localhost:5000/api/files';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  uploadFile(formData: FormData): Observable<UploadResponse> {
    const token = this.authService.getAccessToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<UploadResponse>(`${this.API_URL}/upload`, formData, { headers });
  }
}
