import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FileInfo {
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
export class DownloadService {
  private readonly API_URL = '/api/files';

  constructor(private http: HttpClient) {}

  getFileInfo(id: string): Observable<FileInfo> {
    return this.http.get<FileInfo>(`${this.API_URL}/${id}`);
  }

  downloadFile(id: string): Observable<Blob> {
    return this.http.get(`${this.API_URL}/${id}/download`, { responseType: 'blob' });
  }
}
