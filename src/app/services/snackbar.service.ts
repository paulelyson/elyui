import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ISnackBarConfig, Snackbar } from '../components/snackbar/snackbar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  openSnackbar(data: ISnackBarConfig): void {
    this.snackBar.openFromComponent(Snackbar, {
      panelClass: ['snackbar-override'],
      data: data,
      verticalPosition: 'top',
      duration: data.duration ?? 10 * 1000,
    });
  }
}
