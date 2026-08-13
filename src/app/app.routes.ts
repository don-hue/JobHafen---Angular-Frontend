import { Routes } from '@angular/router';
import { Search } from '../pages/search/search';
import { Home } from '../pages/home/home';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'search',
        component: Search
    },
];
