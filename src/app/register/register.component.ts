import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  model:any = {}

  constructor(private accountService : AccountService, private snackBar: MatSnackBar , private router: Router){}

  ngOnInit(): void {
    
  }

  register(){
    this.accountService.register(this.model).subscribe({
        next: (response: any) => {
          if(response.success){
            this.snackBar.open(response.message, 'Close', { duration: 3000 });
            this.cancel();
          }else{
            this.snackBar.open(response.message, 'Close', { duration: 3000 });
          }
        },
        error: error => {
          this.snackBar.open('An error occurred. Please try again.', 'Close', { duration: 3000 });        }
    })
  }

  cancel(){ 
    this.router.navigateByUrl('/home')
  }
}
