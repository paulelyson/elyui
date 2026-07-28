import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Icon } from './components/icon/icon';
import { Badge } from './components/badge/badge';
import { Button } from './components/button/button';
import { Toggle } from './components/toggle/toggle';
import { ISnackBarConfig } from './components/snackbar/snackbar';
import { SnackbarService } from './services/snackbar.service';
import { SegmentedControl } from './components/segmented-control/segmented-control';
import { SegmentedControlOption } from './models/ui/segmented-control.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Icon, Badge, Button, Toggle, SegmentedControl],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('elyui');

  protected readonly paperSizeOptions: SegmentedControlOption[] = [
    { value: 'A4', label: 'A4', icon: 'description' },
    { value: 'LETTER', label: 'Letter', icon: 'description' },
    { value: 'LEGAL', label: 'Legal (long bond)', icon: 'description' },
  ];

  protected readonly orientationOptions: SegmentedControlOption[] = [
    { value: 'portrait', label: 'Portrait', icon: 'crop_portrait' },
    { value: 'landscape', label: 'Landscape', icon: 'crop_landscape' },
  ];

  constructor(private snackbarService: SnackbarService) {}

  showSnackbar(type: ISnackBarConfig['type'], hasBorder: boolean = true): void {
    this.snackbarService.openSnackbar({
      type,
      message: [`This is a ${type} snackbar message.`],
      icon: 'info',
      hasBorder,
    });
  }
}
