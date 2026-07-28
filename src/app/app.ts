import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Icon } from './components/icon/icon';
import { Badge } from './components/badge/badge';
import { Button } from './components/button/button';
import { Toggle } from './components/toggle/toggle';
import { ISnackBarConfig } from './components/snackbar/snackbar';
import { SnackbarService } from './services/snackbar.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Icon, Badge, Button, Toggle],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('elyui');

  constructor(private snackbarService: SnackbarService) {}

  showSnackbar(type: ISnackBarConfig['type']): void {
    this.snackbarService.openSnackbar({
      type,
      message: [`This is a ${type} snackbar message.`],
      icon: 'info',
    });
  }
}
