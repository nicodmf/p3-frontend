import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SwitchOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-switch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent {
  @Input() label: string = '';
  @Input() options: SwitchOption[] = [];
  @Input() value: string = '';
  @Input() disabled: boolean = false;

  @Output() valueChange = new EventEmitter<string>();

  selectOption(optionValue: string) {
    if (!this.disabled) {
      this.value = optionValue;
      this.valueChange.emit(optionValue);
    }
  }

  isSelected(optionValue: string): boolean {
    return this.value === optionValue;
  }
}
