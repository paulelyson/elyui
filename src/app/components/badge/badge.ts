import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Size, Variant } from '@/models/ui/common-config.model';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-badge',
  imports: [CommonModule, Icon],
  templateUrl: './badge.html',
  styleUrl: './badge.css',
})
export class Badge {
  @Input() size: Size = 'sm';
  @Input() variant: Variant = 'neutral';
  @Input() hasBadgeIcon: boolean = false;
  @Input() hasCloseIcon: boolean = false;
  @Input() hasBorder: boolean = true;
  @Input() clickable: boolean = true;
  @Output() closed: EventEmitter<string> = new EventEmitter<string>();

  onClosed(): void {
    this.closed.emit();
  }
}
