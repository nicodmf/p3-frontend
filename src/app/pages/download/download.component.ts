import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DownloadService } from '../../services/download.service';
import { CalloutComponent } from '../../components/callout/callout.component';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-download',
  standalone: true,
  imports: [CommonModule, RouterModule, CalloutComponent, ButtonComponent],
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent {
  fileId: string = '';
  fileInfo: any = null;
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private downloadService: DownloadService
  ) {
    this.route.params.subscribe(params => {
      this.fileId = params['id'];
      this.loadFileInfo();
    });
  }

  loadFileInfo(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.downloadService.getFileInfo(this.fileId).subscribe({
      next: (info) => {
        this.fileInfo = info;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Fichier non trouvé';
      }
    });
  }

  downloadFile(): void {
    this.downloadService.downloadFile(this.fileId).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = this.fileInfo?.fileName || 'download';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Erreur lors du téléchargement';
      }
    });
  }
}
