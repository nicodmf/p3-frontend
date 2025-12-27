import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      [attr.viewBox]="getViewBox()"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      stroke-width="32"
      [attr.stroke-linejoin]="getStrokeLineJoin()"
      [attr.stroke-linecap]="getStrokeLineCap()">
      <ng-container [ngSwitch]="name">
        <!-- Circle (info) -->
        <ng-container *ngSwitchCase="'circle'">
          <circle cx="256" cy="256" r="208"/>
          <line x1="256" y1="140" x2="256" y2="300"/>
          <circle cx="256" cy="360" r="18" fill="currentColor" stroke="none"/>
        </ng-container>

        <!-- Octagon (error) -->
        <ng-container *ngSwitchCase="'octagon'">
          <path d="M215 48h82l169 169v82L297 464h-82L48 297v-82z"/>
          <line x1="256" y1="160" x2="256" y2="300"/>
          <circle cx="256" cy="360" r="18" fill="currentColor" stroke="none"/>
        </ng-container>

        <!-- Triangle (warning) -->
        <ng-container *ngSwitchCase="'triangle'">
          <path d="M288 64 Q296 64 300 72 L520 448 Q524 456 520 464 Q516 472 508 472 H68 Q60 472 56 464 Q52 456 56 448 L276 72 Q280 64 288 64 Z"/>
          <line x1="288" y1="200" x2="288" y2="320"/>
          <circle cx="288" cy="380" r="18" fill="currentColor" stroke="none"/>
        </ng-container>

        <!-- Circle Check (success) -->
        <ng-container *ngSwitchCase="'circle-check'">
          <circle cx="256" cy="256" r="208"/>
          <polyline points="152,256 216,320 360,176" stroke-linecap="round"/>
        </ng-container>
      </ng-container>
    </svg>
  `,
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
  `]
})
export class IconComponent {
  @Input() name: 'circle' | 'octagon' | 'triangle' | 'circle-check' = 'circle';

  getViewBox(): string {
    return this.name === 'triangle' ? '0 0 576 512' : '0 0 512 512';
  }

  getStrokeLineJoin(): string | null {
    return (this.name === 'octagon' || this.name === 'triangle') ? 'round' : null;
  }

  getStrokeLineCap(): string | null {
    return this.name === 'circle' ? 'round' : (this.name === 'triangle' ? 'round' : null);
  }
}
