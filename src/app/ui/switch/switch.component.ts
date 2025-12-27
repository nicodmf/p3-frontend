import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-switch',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="switch-wrapper">
      <label *ngIf="label" class="switch-label">{{ label }}</label>
      <button
        type="button"
        [disabled]="disabled"
        (click)="toggle()"
        class="switch"
        [class.checked]="checked"
        [class.disabled]="disabled"
        role="switch"
        [attr.aria-checked]="checked"
      >
        <span class="switch-track">
          <span class="switch-thumb" [class.checked]="checked"></span>
        </span>
        <span *ngIf="checked" class="switch-text-on">{{ textOn }}</span>
        <span *ngIf="!checked" class="switch-text-off">{{ textOff }}</span>
      </button>
    </div>
  `,
  styles: [`
    .switch-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .switch-label {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      font-size: 0.875rem;
      font-weight: 500;
      color: #1E1E1E;
    }

    .switch {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      font-family: inherit;
    }

    .switch:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }

    .switch-track {
      position: relative;
      width: 48px;
      height: 24px;
      background-color: #E5E7EB;
      border-radius: 9999px;
      transition: background-color 0.2s ease;
      display: flex;
      align-items: center;
    }

    .switch.checked .switch-track {
      background: linear-gradient(135deg, #FFB88C 0%, #DE6262 100%);
    }

    .switch-thumb {
      position: absolute;
      left: 2px;
      width: 20px;
      height: 20px;
      background-color: white;
      border-radius: 50%;
      transition: transform 0.2s ease;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .switch-thumb.checked {
      transform: translateX(24px);
    }

    .switch-text-on,
    .switch-text-off {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      font-size: 0.875rem;
      font-weight: 500;
      transition: color 0.2s ease;
    }

    .switch-text-off {
      color: #9CA3AF;
    }

    .switch.checked .switch-text-on {
      color: #FF812D;
    }

    .switch-text-on {
      color: transparent;
    }

    .switch.checked .switch-text-on {
      color: #1E1E1E;
    }
  `]
})
export class SwitchComponent {
  @Input() label: string = '';
  @Input() checked: boolean = false;
  @Input() disabled: boolean = false;
  @Input() textOn: string = 'Actifs';
  @Input() textOff: string = 'Tous';
  @Output() checkedChange = new EventEmitter<boolean>();

  toggle(): void {
    if (!this.disabled) {
      this.checked = !this.checked;
      this.checkedChange.emit(this.checked);
    }
  }
}
