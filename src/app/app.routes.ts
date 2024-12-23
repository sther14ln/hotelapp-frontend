import { Routes } from '@angular/router';
import { Not404Component } from './pages/not404/not404.component';
import { LayoutComponent } from './pages/layout/layout.component';

export const routes: Routes = [
    {
        path: 'pages',
        component: LayoutComponent,
        loadChildren: () => import('./pages/pages.routes').then(x => x.pagesRoutes)
    },
    
    { path: '**', component: Not404Component}

];
