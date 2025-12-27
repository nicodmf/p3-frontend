import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-callout',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './callout.component.html',
  styleUrls: ['./callout.component.scss']
})
export class CalloutComponent {
  @Input() type: 'info' | 'success' | 'warning' | 'error' = 'info';
  @Input() message: string = '';
  @Input() closable: boolean = false;

  isVisible: boolean = true;

  close() {
    this.isVisible = false;
  }

  getIconName(): 'circle' | 'octagon' | 'triangle' | 'circle-check' {
    const iconMap = {
      info: 'circle' as const,
      success: 'circle-check' as const,
      warning: 'triangle' as const,
      error: 'octagon' as const,
    };
    return iconMap[this.type];
  }
}
