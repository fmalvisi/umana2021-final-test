import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmptyLayoutComponent } from '../layout/views/empty-layout/empty-layout.component';

const routes: Routes = [
  {
    path: 'homepage',
    component: EmptyLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: (): Promise<unknown> =>
          import('src/app/modules/homepage/homepage.module').then(
            m => m.HomepageModule,
          ),
      },
    ],
  },
  {
    path: 'items',
    component: EmptyLayoutComponent,
    children: [
      {
        path: '',
        // canActivate: [AuthGuard],
        loadChildren: (): Promise<unknown> =>
          import('src/app/modules/items/items.module').then(m => m.ItemsModule),
      },
    ],
  },
  {
    path: 'categories',
    component: EmptyLayoutComponent,
    children: [
      {
        path: '',
        // canActivate: [AuthGuard],
        loadChildren: (): Promise<unknown> =>
          import('src/app/modules/categories/categories.module').then(
            m => m.CategoriesModule,
          ),
      },
    ],
  },
  {
    path: 'users',
    component: EmptyLayoutComponent,
    children: [
      {
        path: '',
        // canActivate: [AuthGuard],
        loadChildren: (): Promise<unknown> =>
          import('src/app/modules/users/users.module').then(
            m => m.UsersModule,
          ),
      },
    ],
  },
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  { path: '**', redirectTo: 'homepage' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
