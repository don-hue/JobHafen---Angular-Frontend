import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { Inbox } from '@primeicons/angular/inbox';
import { Search } from '@primeicons/angular/search';
import { Users } from '@primeicons/angular/users';
import { Bell } from '@primeicons/angular/bell';
import { Cog } from '@primeicons/angular/cog';
import { Sidebar } from '@primeicons/angular/sidebar';
import { TableView } from '../components/table-view/table-view';
import { Home } from '../pages/home/home';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Home,TableView ,AvatarModule, SidebarModule, ButtonModule, Inbox, Search, Users, Bell, Cog, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  
}
