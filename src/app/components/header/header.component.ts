import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SidebarService } from '../../services/sidebar.service';
import { Observable, map, filter } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;
  userEmail$!: Observable<string>;
  isUserMenuOpen = false;
  hasSidebar = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private sidebarService: SidebarService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.currentUser$.pipe(
      map(user => user !== null && this.authService.isAuthenticated())
    );

    this.userEmail$ = this.authService.currentUser$.pipe(
      map(user => user?.email || '')
    );

    // Détecter la route courante pour savoir si on doit afficher le mode sidebar
    this.updateSidebarState(this.router.url);

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.updateSidebarState(event.url);
    });
  }

  private updateSidebarState(url: string): void {
    this.hasSidebar = url.includes('/history');
  }

  onToggleSidebar(): void {
    this.sidebarService.toggle();
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
    this.isUserMenuOpen = false;
  }
}
