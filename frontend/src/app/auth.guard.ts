import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  const token = sessionStorage.getItem('token');
  if(!token){
    router.navigate(['/'])
    return false;
  }
  return true;
};

/* this authguard is used to prevent unauthorized access to pages. once you logged out, u cant access anything using the url
*/