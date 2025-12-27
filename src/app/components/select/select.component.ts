import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SelectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  @Input() label: string = '';
  @Input() options: SelectOption[] = [];
  @Input() value: string = '';
  @Input() placeholder: string = 'Sélectionnez une option';
  @Input() disabled: boolean = false;

  onChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.value = target.value;
  }
}
