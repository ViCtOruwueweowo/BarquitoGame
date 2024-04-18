import { Injectable } from '@angular/core';
import { HttpInterceptorFn, HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

    console.log('Pasando por el interceptor'); // Esta línea se imprimirá cada vez que una solicitud pase por el interceptor

    const token = localStorage.getItem('token'); 

    let headers = req.headers

    // Si tienes un token válido, agrégalo al encabezado
    if (token) {
      console.log('Paso por true en interceptor'); 
      headers = headers.set('Authorization', 'Bearer' +token)
    }

      headers = headers.set('Accept', 'Application/json')

      req = req.clone({headers: headers})

      return next(req);
      /*
      const authRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(authRequest);
     
    } else {
      console.log('Paso por false en interceptor'); 
      // Si no hay token, simplemente continúa con la solicitud original
      return next.handle(req);
    }
     */
  };



// aqui adentro el guard importados