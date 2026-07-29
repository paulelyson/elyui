import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Icon } from '../icon/icon';
import { Size, Variant } from '../../models/ui/common-config.model';
import { SegmentedControlOption } from '../../models/ui/segmented-control.model';

@Component({
  selector: 'ely-segmented-control',
  imports: [CommonModule, Icon],
  templateUrl: './segmented-control.html',
  styleUrl: './segmented-control.css',
})
export class SegmentedControl {
  @Input() options: SegmentedControlOption[] = [];
  @Input() value: string | string[] = '';
  @Input() multiple: boolean = false;
  @Input() size: Size = 'sm';
  @Input() variant: Variant = 'accent';
  @Input() hasBorder: boolean = true;
  @Input() hasRadius: boolean = true;
  @Input() vertical: boolean = false;
  @Input() disabled: boolean = false;
  @Output() valueChange: EventEmitter<string | string[]> = new EventEmitter<string | string[]>();

  isSelected(optionValue: string): boolean {
    return this.multiple
      ? Array.isArray(this.value) && this.value.includes(optionValue)
      : this.value === optionValue;
  }

  onOptionClick(optionValue: string): void {
    if (this.multiple) {
      const current = Array.isArray(this.value) ? this.value : [];
      const next = current.includes(optionValue)
        ? current.filter((v) => v !== optionValue)
        : [...current, optionValue];
      this.value = next;
      this.valueChange.emit(next);
    } else {
      this.value = optionValue;
      this.valueChange.emit(optionValue);
    }
  }
}
