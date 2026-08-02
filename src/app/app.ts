import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LeftTab } from '../components/left-tab/left-tab';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LeftTab],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('jobhafen');
}
