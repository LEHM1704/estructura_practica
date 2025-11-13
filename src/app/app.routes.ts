import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pokemon',
    pathMatch: 'full',
  },

  {
    path: 'pokemon',
    loadChildren: () => import('./features/features-module').then((m) => m.FeaturesModule),
  },
];
