import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';

import { MatInputModule } from '@angular/material/input'; // Import MatInputModule
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule, // Add MatInputModule here
    MatButtonModule, 
    MatFormFieldModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'] 
})
export class ProfileComponent implements OnInit {
  userForm: FormGroup;
  editable: boolean = false;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
  ) {
    // Build a form 
    this.userForm = this.fb.group({
      name: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      age: [{ value: '', disabled: true }],
      creditCardNumber: [{ value: '', disabled: true }, [this.creditCardValidator]]
    });
  }

  ngOnInit(): void {
    this.userService.getUserDetails().subscribe({
      next: (data) => {
        this.userForm.patchValue(data);
        console.log(data);
        
        // check this
      },
      error: (err) => {
        console.error("Error fetching user details", err);
      }
    });
  }

  toggleEdit(): void {
    this.editable = !this.editable;
    if (this.editable) {
      this.userForm.enable(); 
    } else {
      this.userForm.disable();
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const updatedData = this.userForm.value;

      this.userService.updateUserDetails(updatedData).subscribe({
        next: () => {
          console.log('User information updated');
          this.toggleEdit(); 
          window.location.reload();
          //change this if you get time, setup a service to dynamically refresh header
        },
        error: (err) => {
          console.error("Error updating user details", err);
        }
      });
    }
  }

  creditCardValidator(control: AbstractControl){
    const value = control.value;
    const regex = /^(?:\d{4}-?\d{4}-?\d{4}-?\d{4}|\d{16}|)$/;

    return regex.test(value) ? null: {invalidCreditCard: true};
  }
}
