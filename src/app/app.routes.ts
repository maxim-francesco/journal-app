import { Routes } from '@angular/router';
import { SignInComponent } from './features/auth/sign-in/sign-in.component';
import { MainComponent } from './features/jurnal/main/main.component';
import { LogInComponent } from './features/auth/log-in/log-in.component';

export const routes: Routes = [
  {
    path: '',
    component: SignInComponent,
  },
  {
    path: 'sign-up',
    component: SignInComponent,
  },
  {
    path: 'log-in',
    component: LogInComponent,
  },
  {
    path: 'main',
    component: MainComponent,
  },
  {
    path: '**',
    component: SignInComponent,
  },
];
