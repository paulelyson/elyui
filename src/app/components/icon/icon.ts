import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Size, Variant } from '@/models/ui/common-config.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-icon',
  imports: [CommonModule, MatIconModule, MatTooltipModule],
  templateUrl: './icon.html',
  styleUrl: './icon.css',
})
export class Icon {
  @Input() name: string = 'info';
  @Input() size: Size = 'sm';
  @Input() variant: Variant = 'primary';
  @Input() tooltip: string = '';
  @Input() clickable: boolean = true;
  @Output() iconclicked: EventEmitter<string> = new EventEmitter<string>();

  onClicked(): void {
    this.iconclicked.emit(this.name);
  }
}
