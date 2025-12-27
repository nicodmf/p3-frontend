import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type"
      [disabled]="disabled || loading"
      (click)="onClick()"
      class="btn"
      [class.primary]="variant === 'primary'"
      [class.secondary]="variant === 'secondary'"
      [class.outline]="variant === 'outline'"
      [class.ghost]="variant === 'ghost'"
      [class.sm]="size === 'sm'"
      [class.md]="size === 'md'"
      [class.lg]="size === 'lg'"
      [class.disabled]="disabled"
      [class.loading]="loading"
    >
      <span class="btn-content">
        <svg
          *ngIf="loading"
          class="btn-spinner"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
            stroke-linecap="round"
            stroke-dasharray="32"
            stroke-dashoffset="32"
          />
        </svg>
        <ng-content></ng-content>
        <span *ngIf="!hasProjectedContent">{{ label }}</span>
      </span>
    </button>
  `,
  styles: [`
    .btn {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      font-weight: 600;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: all 0.2s ease;
      outline: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      position: relative;
    }

    .btn:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }

    .btn-content {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    /* Variants */
    .btn.primary {
      background: linear-gradient(135deg, #FFB88C 0%, #DE6262 100%);
      color: white;
    }

    .btn.primary:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(255, 129, 45, 0.3);
    }

    .btn.secondary {
      background-color: #2C2C2C;
      color: white;
    }

    .btn.secondary:hover:not(:disabled) {
      background-color: #1A1A1A;
    }

    .btn.outline {
      background-color: transparent;
      color: #FF812D;
      border: 2px solid #FF812D;
    }

    .btn.outline:hover:not(:disabled) {
      background-color: #FF812D;
      color: white;
    }

    .btn.ghost {
      background-color: transparent;
      color: #6B7280;
    }

    .btn.ghost:hover:not(:disabled) {
      background-color: #F3F4F6;
      color: #1E1E1E;
    }

    /* Sizes */
    .btn.sm {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
    }

    .btn.md {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
    }

    .btn.lg {
      padding: 1rem 2rem;
      font-size: 1.125rem;
    }

    /* Loading */
    .btn.loading .btn-content > *:not(.btn-spinner) {
      opacity: 0;
    }

    .btn-spinner {
      animation: spin 1s linear infinite;
      position: absolute;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `]
})
export class ButtonComponent {
  @Input() label: string = '';
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  get hasProjectedContent(): boolean {
    return false;
  }

  onClick(): void {
    if (!this.disabled && !this.loading) {
      // Click handler can be added here
    }
  }
}
