import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';
import { Icon } from '../icon/icon';
import { Variant } from '../../models/ui/common-config.model';

type SnackBarType = 'primary' | 'success' | 'warning' | 'error' | 'dafault';

export interface ISnackBarConfig {
  type: SnackBarType;
  message: string[];
  header?: string;
  action?: string[];
  icon: string;
  duration?: number;
  hasBorder?: boolean;
}

@Component({
  selector: 'ely-snackbar',
  imports: [CommonModule, Icon, MatSnackBarModule],
  templateUrl: './snackbar.html',
  styleUrl: './snackbar.css',
})
export class Snackbar {
  isList: boolean = false;
  hasHeader: boolean = false;
  type = 'primary';
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public config: ISnackBarConfig,
    private snackbarRef: MatSnackBarRef<Snackbar>,
  ) {}

  onClose(): void {
    this.snackbarRef.dismiss();
  }

  get iconVariant(): Variant {
    switch (this.config.type) {
      case 'error':
        return 'danger';
      case 'dafault':
        return 'neutral';
      default:
        return this.config.type;
    }
  }

  get hasBorder(): boolean {
    return this.config.hasBorder ?? true;
  }
}
