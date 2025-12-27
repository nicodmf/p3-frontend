import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ui-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="input-wrapper">
      <label *ngIf="label" [for]="inputId" class="input-label">
        {{ label }}
        <span *ngIf="optional" class="input-optional">(Optionnel)</span>
      </label>
      <input
        [id]="inputId"
        [type]="type"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [value]="value"
        (input)="onInput($event)"
        class="input-field"
        [class.disabled]="disabled"
        [class.focused]="focused"
      />
    </div>
  `,
  styles: [`
    .input-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      width: 100%;
    }

    .input-label {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      font-size: 0.875rem;
      font-weight: 500;
      color: #1E1E1E;
    }

    .input-optional {
      font-weight: 400;
      color: #6B7280;
      margin-left: 0.25rem;
    }

    .input-field {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      font-size: 1rem;
      color: #1E1E1E;
      padding: 0.75rem 1rem;
      border: 1px solid #D1D5DB;
      border-radius: 0.5rem;
      background-color: white;
      transition: all 0.2s ease;
      outline: none;
    }

    .input-field:hover:not(.disabled) {
      border-color: #9CA3AF;
    }

    .input-field.focused {
      border-color: #FF812D;
      box-shadow: 0 0 0 3px rgba(255, 129, 45, 0.1);
    }

    .input-field:disabled {
      background-color: #F9FAFB;
      color: #9CA3AF;
      cursor: not-allowed;
    }

    .input-field::placeholder {
      color: #B3B3B3;
    }
  `]
})
export class InputComponent {
  @Input() label: string = '';
  @Input() optional: boolean = false;
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() disabled: boolean = false;
  @Input() value: string = '';
  @Input() inputId: string = 'input-' + Math.random().toString(36).substr(2, 9);

  focused: boolean = false;

  onInput(event: Event): void {
    if (!this.disabled) {
      this.value = (event.target as HTMLInputElement).value;
    }
  }

  onFocus(): void {
    if (!this.disabled) {
      this.focused = true;
    }
  }

  onBlur(): void {
    this.focused = false;
  }
}
