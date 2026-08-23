import { Routes } from '@angular/router';
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
