import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-toggle',
  imports: [FormsModule, MatTooltipModule, MatBadgeModule],
  templateUrl: './toggle.html',
  styleUrl: './toggle.css',
})
export class Toggle {
  @Input() isChecked: boolean = false;
  @Input() label: string = '';
  @Input() labelPosition: 'before' | 'after' = 'before';
  @Input() tooltip: string = '';
  @Input() badge: string | number = '0';
  @Input() hasFocusGlow: boolean = true;
  @Output() toggle = new EventEmitter<boolean>();

  get hideBadge(): boolean {
    return this.badge == '0';
  }

  onToggleChange(event: boolean): void {
    this.toggle.emit(event);
  }
}
