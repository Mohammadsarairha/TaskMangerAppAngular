import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { map } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const snackBar = inject(MatSnackBar);
  return accountService.currentUser$.pipe(
    map(user =>{
      if(user)
      { 
        return true;
      }
      else
      {
        snackBar.open('Please login first.', 'Close', { duration: 2000 });
        return false;
      }
    })
  )
};
