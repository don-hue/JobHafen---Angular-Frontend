import { Routes } from '@angular/router';
import { TableView } from '../components/table-view/table-view';
import { SearchTable } from '../components/search-view/search-view';
import { SettingView } from '../components/setting-view/setting-view';

export const routes: Routes = [
    {
        path: '',
        component: TableView
    },
    {
        path: 'search',
        component: SearchTable
    },
    {
        path: 'setting',
        component: SettingView
    },
];
