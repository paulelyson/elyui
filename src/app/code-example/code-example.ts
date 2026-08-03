import { Component, Input } from '@angular/core';

/**
 * Demo-only wrapper that pairs a code snippet with its live rendering.
 * Not part of the published library — it lives in the demo app so the
 * overview page can double as documentation.
 */
@Component({
  selector: 'app-code-example',
  imports: [],
  templateUrl: './code-example.html',
  styleUrl: './code-example.css',
})
export class CodeExample {
  @Input() label: string = '';
  @Input() code: string = '';

  copied: boolean = false;

  async onCopy(): Promise<void> {
    await navigator.clipboard.writeText(this.code);
    this.copied = true;
    setTimeout((): void => {
      this.copied = false;
    }, 1500);
  }
}
