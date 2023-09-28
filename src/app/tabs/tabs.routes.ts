import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'tab1',
                loadComponent: () =>
                import('../tab1/tab1.page').then((m) => m.Tab1Page),
            },{
                path: 'tab2',
                loadComponent: () =>
                import('../tab2/tab2.page').then((m) => m.Tab2Page),
            },{
                path: 'tab3',
                loadComponent: () =>
                import('../tab3/tab3.page').then((m) => m.Tab3Page),
            },{
                path: 'edit',
                loadComponent: () => import('../edit/edit.page').then((m) => m.EditPage),
            },{
                path: 'update',
                loadComponent: () => import('../update/update.page').then((m) => m.UpdatePage),
            },{
                path: '',
                redirectTo: '/tabs/tab1',
                pathMatch: 'full',
            },
        ],
    },{
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full',
    },
];
