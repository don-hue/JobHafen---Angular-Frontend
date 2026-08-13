import { Component, signal } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { Inbox } from '@primeicons/angular/inbox';
import { Search } from '@primeicons/angular/search';
import { Users } from '@primeicons/angular/users';
import { Bell } from '@primeicons/angular/bell';
import { Cog } from '@primeicons/angular/cog';
import { Sidebar } from '@primeicons/angular/sidebar';
import { TableView } from '../../components/table-view/table-view';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'home',
  imports: [RouterLink, RouterLinkActive,RouterLink, TableView, AvatarModule, SidebarModule, ButtonModule, Inbox, Search, Users, Bell, Cog, Sidebar, RouterOutlet],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
    isMobile = signal(false);

    constructor() {
        if (typeof window === 'undefined') return;
        const mql = window.matchMedia('(max-width: 1023px)');
        this.isMobile.set(mql.matches);
        mql.addEventListener('change', (e) => this.isMobile.set(e.matches));
    }
}
