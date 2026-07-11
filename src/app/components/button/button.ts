import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Icon } from '../icon/icon';
import { Size, Variant } from '@/models/ui/common-config.model';
import { ButtonAppearance, ButtonShade, ButtonWidth } from '@/models/ui/button-config.model';

@Component({
  selector: 'app-button',
  imports: [CommonModule, MatIconModule, Icon, MatTooltipModule],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  @Input() action: string = '';
  @Input() variant: Variant = 'neutral';
  @Input() appearance: ButtonAppearance = 'tonal';
  @Input() size: Size = 'sm';
  @Input() type: 'submit' | 'button' | 'reset' = 'button';
  @Input() shade: ButtonShade = 'default';
  @Input() width: ButtonWidth = 'width-auto';
  @Input() icon: string = '';
  @Input() tooltip: string = '';
  @Input() disabled: boolean = false;
  @Output() btnclicked: EventEmitter<string> = new EventEmitter<string>();

  onClicked(): void {
    this.btnclicked.emit(this.action);
  }
}
