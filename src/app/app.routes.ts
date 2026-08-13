import { Routes } from '@angular/router';
import { Search } from '../pages/search/search';
import { Home } from '../pages/home/home';
import { TableView } from '../components/table-view/table-view';
import { SearchTable } from '../components/search-table/search-table';

export const routes: Routes = [
    {
        path: '',
        component: TableView
    },
    {
        path: 'search',
        component: SearchTable
    },
];
