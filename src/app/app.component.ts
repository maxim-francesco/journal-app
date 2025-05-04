import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignInComponent } from './features/auth/sign-in/sign-in.component';
import { ProfileComponent } from './features/auth/profile/profile.component';
import { ThanksComponent } from './features/auth/thanks/thanks.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SignInComponent, ProfileComponent, ThanksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'journal-app';
}
