import { Injectable } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { ConstructorProvider } from '@angular/core';
Injectable({
  providedIn: 'root'
})

export const authGuard: CanActivateFn = (route, state) => {
  let router = new Router();

  const token = localStorage.getItem('token'); // Obtiene el token del localStorage

  console.log('Token obtenido del localStorage:', token); // Imprime el token
  if (token) {
    console.log('Paso por true'); 
    // Si el token existe, permite la navegación
    return true;
  } else {
    console.log('Paso por false');

    router.navigate(['/']);
    return false;
  }
};

// servicio e interface aqui dentro importados

