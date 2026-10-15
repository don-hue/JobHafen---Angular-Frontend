import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table'

@Component({
  selector: 'app-setting-table',
  imports: [CardModule, ButtonModule,TableModule],
  templateUrl: './setting-view.html',
  styleUrl: './setting-view.css',
})
export class SettingView {}
