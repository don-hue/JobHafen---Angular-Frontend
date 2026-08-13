import { Component, signal } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { Home } from '@primeicons/angular/home';
import { Inbox } from '@primeicons/angular/inbox';
import { Users } from '@primeicons/angular/users';
import { Bell } from '@primeicons/angular/bell';
import { Cog } from '@primeicons/angular/cog';
import { Sidebar } from '@primeicons/angular/sidebar';
import { TableView } from '../../components/table-view/table-view';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'search',
  imports: [RouterLink,TableView ,AvatarModule, SidebarModule, ButtonModule, Home, Inbox, Users, Bell, Cog, Sidebar],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
   isMobile = signal(false);

    constructor() {
        if (typeof window === 'undefined') return;
        const mql = window.matchMedia('(max-width: 1023px)');
        this.isMobile.set(mql.matches);
        mql.addEventListener('change', (e) => this.isMobile.set(e.matches));
    }
}
