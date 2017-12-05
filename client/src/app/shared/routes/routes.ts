import { Routes } from '@angular/router';

import { AppComponent } from './../../app.component';

export const router: Routes = [
  { path: '', component: AppComponent, pathMatch: 'full' },
];
