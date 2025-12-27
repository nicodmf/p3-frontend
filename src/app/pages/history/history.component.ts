import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { HistoryService, FileHistory } from '../../services/history.service';
import { SidebarService } from '../../services/sidebar.service';
import { CalloutComponent } from '../../components/callout/callout.component';
import { ButtonComponent } from '../../components/button/button.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, RouterModule, CalloutComponent, ButtonComponent, SidebarComponent],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, OnDestroy {
  files: FileHistory[] = [];
  isLoading = true;
  errorMessage = '';
  isSidebarOpen = false;
  private sidebarSubscription?: Subscription;

  constructor(
    private historyService: HistoryService,
    private sidebarService: SidebarService
  ) {}

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;
  }

  ngOnInit(): void {
    this.loadHistory();

    // Écouter les événements de toggle de la sidebar depuis le header
    this.sidebarSubscription = this.sidebarService.toggle$.subscribe(() => {
      this.toggleSidebar();
    });
  }

  ngOnDestroy(): void {
    if (this.sidebarSubscription) {
      this.sidebarSubscription.unsubscribe();
    }
  }

  loadHistory(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.historyService.getUserFiles().subscribe({
      next: (files) => {
        this.files = files;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Erreur lors du chargement de l\'historique';
      }
    });
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  deleteFile(token: string): void {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce fichier ?')) {
      return;
    }

    this.historyService.deleteFile(token).subscribe({
      next: () => {
        this.files = this.files.filter(file => file.token !== token);
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Erreur lors de la suppression';
      }
    });
  }

  getStatusBadgeText(file: FileHistory): string {
    return file.isActive ? 'Actif' : 'Expiré';
  }

  getStatusBadgeClass(file: FileHistory): string {
    return file.isActive ? 'badge-active' : 'badge-expired';
  }
}
