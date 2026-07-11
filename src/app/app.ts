import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Icon } from './components/icon/icon';
import { Badge } from './components/badge/badge';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Icon, Badge],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('elyui');
}
