import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  Icon,
  Badge,
  Button,
  Toggle,
  SegmentedControl,
  ISnackBarConfig,
  SnackbarService,
  SegmentedControlOption,
} from 'elyui';
import { CodeExample } from './code-example/code-example';
import { SNIPPETS } from './demo-snippets';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Icon, Badge, Button, Toggle, SegmentedControl, CodeExample],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('elyui');

  protected readonly snippets = SNIPPETS;

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
