import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';  


// angular material.io modules
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,
    CommonModule, 
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // these 2 are properties bound to the input field uisng ngModel (this allows 2way data binding)
  email: string='';
  password: string='';
  loginError: string | null=null;

  //  The constructor method is called when an instance of the component is created
  constructor(private authService: AuthService, private router: Router){}   // Inject AuthService and Router

  // susbcribe: to execute an Observable and handle the results. Observables are lazy by default, meaning they don’t execute until they are subscribed to.
  onSubmit(loginForm: any){
    if (loginForm.valid) {
      this.authService.login(this.email, this.password).subscribe({
        next: (response) => {
          console.log("login successful");
          sessionStorage.setItem('token',response.token);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.loginError = "Invalid credentials"; // Update the error message
          console.error(error);
        },
        complete: () => {
          console.log("login request completed");
        }
      });
      
    }
  }
}
