import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignInComponent } from './features/auth/sign-in/sign-in.component';
import { ProfileComponent } from './features/auth/profile/profile.component';
import { ThanksComponent } from './features/auth/thanks/thanks.component';
import { MainComponent } from './features/jurnal/main/main.component';
import { JurnalComponent } from './features/jurnal/jurnal/jurnal.component';
import { PageComponent } from './features/jurnal/page/page.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    SignInComponent,
    ProfileComponent,
    ThanksComponent,
    MainComponent,
    JurnalComponent,
    PageComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'journal-app';
}
