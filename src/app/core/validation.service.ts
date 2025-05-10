import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  isValidEmail(email: string): boolean {
    const cleanedEmail = email.trim().toLowerCase();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(cleanedEmail);
  }

  isValidPassword(password: string): boolean {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  isValidPin(pin: string): boolean {
    const pinRegex = /^\d{4}$/;
    return pinRegex.test(pin);
  }
}
