import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatMenuModule, MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  name: string = 'user';  //default name
  userId: string='';
  constructor(private router: Router, private userService: UserService){}

  ngOnInit(): void {
    this.userService.getUserDetails().subscribe({
      next: (data)=>{
        // console.log('User details:', data); 
        this.name = data.name;
        this.userId = data._id;
      },
      error: (err)=>{
        console.error('Error fetching user details', err);
      }
    });
  }

  goToHome(): void{
    this.router.navigate(['/home'])
  }

  goToProfile(): void {
    if (this.userId) {
      this.router.navigate([`/profile/${this.userId}`]);
    } else {
      console.error('User ID is not available');
    }
  }  

  logout(): void{
    sessionStorage.removeItem('token');
    // this.userService.resetUserState();
    this.router.navigate(['/'])
  }

}
