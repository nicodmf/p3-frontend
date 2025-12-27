import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'ui-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header">
      <div class="header-container">
        <div class="header-left">
          <h1 class="header-logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="url(#header-logo-gradient)"/>
              <path d="M16 8L24 12V20L16 24L8 20V12L16 8Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M16 16V8" stroke="white" stroke-width="2" stroke-linecap="round"/>
              <path d="M8 12L16 16L24 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <defs>
                <linearGradient id="header-logo-gradient" x1="0" y1="0" x2="32" y2="32">
                  <stop offset="0%" style="stop-color:#FFB88C"/>
                  <stop offset="100%" style="stop-color:#DE6262"/>
                </linearGradient>
              </defs>
            </svg>
            <span>{{ title }}</span>
          </h1>
        </div>
        <div class="header-right">
          <ng-content></ng-content>
          <button *ngIf="showLoginButton" class="header-login-btn" (click)="onLoginClick()">
            {{ loginButtonText }}
          </button>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      width: 100%;
      background-color: white;
      border-bottom: 1px solid #E5E7EB;
      padding: 1rem 0;
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .header-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .header-left {
      display: flex;
      align-items: center;
    }

    .header-logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      font-size: 1.5rem;
      font-weight: 700;
      color: #2C2C2C;
      cursor: pointer;
    }

    .header-logo svg {
      flex-shrink: 0;
    }

    .header-logo span {
      letter-spacing: -0.025em;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .header-login-btn {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      font-size: 0.875rem;
      font-weight: 600;
      padding: 0.625rem 1.25rem;
      background-color: #2C2C2C;
      color: white;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .header-login-btn:hover {
      background-color: #1A1A1A;
    }
  `]
})
export class HeaderComponent {
  @Input() title: string = 'DataShare';
  @Input() showLoginButton: boolean = true;
  @Input() loginButtonText: string = 'Se connecter';

  onLoginClick(): void {
    // Navigate to login page or emit event
    console.log('Login button clicked');
  }
}
