import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../_models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  userName: string = "";
  constructor(public accountService: AccountService ,
              private snackBar: MatSnackBar ,
              private router: Router) { }

  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user: User = JSON.parse(userString);
    this.userName = user.username;
  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: (response: any) => {
        this.userName = response.user.username.toUpperCase();
        this.snackBar.open(response.message, 'Close', { duration: 3000 });
        this.router.navigateByUrl('/project')
      },
      error: error => {
        this.snackBar.open('An error occurred. Please try again.', 'Close', { duration: 3000 });
      }
    });
  }
  
  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/');
    // Reset the form fields
    this.model.userName = '';
    this.model.password = '';
  }
}
