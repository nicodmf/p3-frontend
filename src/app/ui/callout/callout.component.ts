import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type CalloutType = 'info' | 'success' | 'warning' | 'error';

@Component({
  selector: 'ui-callout',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="callout"
      [class.info]="type === 'info'"
      [class.success]="type === 'success'"
      [class.warning]="type === 'warning'"
      [class.error]="type === 'error'"
    >
      <div class="callout-icon">
        <svg *ngIf="type === 'info'" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
          <path d="M12 16V12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M12 8H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <svg *ngIf="type === 'success'" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
          <path d="M8 12L10.5 14.5L16 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg *ngIf="type === 'warning'" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 9V11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M12 15H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <svg *ngIf="type === 'error'" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
          <path d="M15 9L9 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M9 9L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
      <div class="callout-content">
        <h4 *ngIf="title" class="callout-title">{{ title }}</h4>
        <p class="callout-message">
          <ng-content></ng-content>
          {{ message }}
        </p>
      </div>
    </div>
  `,
  styles: [`
    .callout {
      display: flex;
      gap: 1rem;
      padding: 1rem;
      border-radius: 0.5rem;
      border-left: 4px solid;
    }

    .callout-icon {
      flex-shrink: 0;
      margin-top: 0.125rem;
    }

    .callout-content {
      flex: 1;
      min-width: 0;
    }

    .callout-title {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      font-size: 1rem;
      font-weight: 600;
      margin: 0 0 0.25rem 0;
      color: #1E1E1E;
    }

    .callout-message {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      font-size: 0.875rem;
      line-height: 1.5;
      margin: 0;
      color: #4B5563;
    }

    /* Variants */
    .callout.info {
      background-color: #EFF6FF;
      border-left-color: #3B82F6;
      color: #1E40AF;
    }

    .callout.info .callout-icon,
    .callout.info .callout-title,
    .callout.info .callout-message {
      color: #1E40AF;
    }

    .callout.success {
      background-color: #F0FDF4;
      border-left-color: #22C55E;
    }

    .callout.success .callout-icon,
    .callout.success .callout-title,
    .callout.success .callout-message {
      color: #15803D;
    }

    .callout.warning {
      background-color: #FFFBEB;
      border-left-color: #F59E0B;
    }

    .callout.warning .callout-icon,
    .callout.warning .callout-title,
    .callout.warning .callout-message {
      color: #B45309;
    }

    .callout.error {
      background-color: #FEF2F2;
      border-left-color: #EF4444;
    }

    .callout.error .callout-icon,
    .callout.error .callout-title,
    .callout.error .callout-message {
      color: #B91C1C;
    }
  `]
})
export class CalloutComponent {
  @Input() type: CalloutType = 'info';
  @Input() title: string = '';
  @Input() message: string = '';
}
