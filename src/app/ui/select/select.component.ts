import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SelectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'ui-select',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="select-wrapper">
      <label *ngIf="label" [for]="selectId" class="select-label">
        {{ label }}
      </label>
      <div class="select-container" (click)="toggleDropdown()">
        <select
          [id]="selectId"
          [disabled]="disabled"
          [value]="selectedValue"
          (change)="onChange($event)"
          class="select-field"
          [class.disabled]="disabled"
          [class.open]="isOpen"
        >
          <option *ngFor="let option of options" [value]="option.value">
            {{ option.label }}
          </option>
        </select>
        <svg
          class="select-arrow"
          [class.open]="isOpen"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="#6B7280"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
  `,
  styles: [`
    .select-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      width: 100%;
    }

    .select-label {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      font-size: 0.875rem;
      font-weight: 500;
      color: #1E1E1E;
    }

    .select-container {
      position: relative;
      width: 100%;
    }

    .select-field {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      font-size: 1rem;
      color: #1E1E1E;
      padding: 0.75rem 1rem;
      padding-right: 3rem;
      border: 1px solid #D1D5DB;
      border-radius: 0.5rem;
      background-color: white;
      transition: all 0.2s ease;
      outline: none;
      width: 100%;
      appearance: none;
      cursor: pointer;
    }

    .select-field:hover:not(.disabled) {
      border-color: #9CA3AF;
    }

    .select-field:focus {
      border-color: #FF812D;
      box-shadow: 0 0 0 3px rgba(255, 129, 45, 0.1);
    }

    .select-field.disabled {
      background-color: #F9FAFB;
      color: #9CA3AF;
      cursor: not-allowed;
    }

    .select-arrow {
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      transition: transform 0.2s ease;
      pointer-events: none;
    }

    .select-arrow.open {
      transform: translateY(-50%) rotate(180deg);
    }
  `]
})
export class SelectComponent {
  @Input() label: string = '';
  @Input() options: SelectOption[] = [];
  @Input() disabled: boolean = false;
  @Input() selectedValue: string = '';
  @Input() selectId: string = 'select-' + Math.random().toString(36).substr(2, 9);
  @Output() selectionChange = new EventEmitter<string>();

  isOpen: boolean = false;

  toggleDropdown(): void {
    if (!this.disabled) {
      this.isOpen = !this.isOpen;
    }
  }

  onChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedValue = value;
    this.selectionChange.emit(value);
    this.isOpen = false;
  }
}
