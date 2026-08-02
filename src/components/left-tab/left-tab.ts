import { Component, signal } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { Home } from '@primeicons/angular/home';
import { Inbox } from '@primeicons/angular/inbox';
import { Search } from '@primeicons/angular/search';
import { Users } from '@primeicons/angular/users';
import { Bell } from '@primeicons/angular/bell';
import { Cog } from '@primeicons/angular/cog';
import { Sidebar } from '@primeicons/angular/sidebar';
import { TableView } from '../table-view/table-view';

@Component({
  selector: 'app-left-tab',
  imports: [TableView ,AvatarModule, SidebarModule, ButtonModule, Home, Inbox, Search, Users, Bell, Cog, Sidebar],
  templateUrl: './left-tab.html',
  styleUrl: './left-tab.css',
})
export class LeftTab {
    isMobile = signal(false);

    constructor() {
        if (typeof window === 'undefined') return;
        const mql = window.matchMedia('(max-width: 1023px)');
        this.isMobile.set(mql.matches);
        mql.addEventListener('change', (e) => this.isMobile.set(e.matches));
    }
}
