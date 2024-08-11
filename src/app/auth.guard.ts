import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router);
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      router.navigate(['/signin']); // Redirect to login page if not authenticated
      return false;
    }
  } else {
    router.navigate(['/signin']); // Redirect to login page if not authenticated

    return false; // For  (Server-Side Rendering)
  }
};
