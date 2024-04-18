import { Routes } from '@angular/router';
import { authGuard } from './Core/Guards/auth.guard';

export const routes: Routes = 
[
    {path:'',loadComponent:()=>import('../app/Core/Components/index/index.component').then(c=>c.IndexComponent)},
    {path:'Register',loadComponent:()=>import('../app/Core/Components/registro/registro.component').then(c=>c.RegistroComponent)},
    {path:'Code',loadComponent:()=>import('../app/Core/Components/codigo/codigo.component').then(c=>c.CodigoComponent)},
    {path:'Pantalla',loadComponent:()=>import('../app/Core/Components/iniciar/iniciar.component').then(c=>c.IniciarComponent),canActivate:[authGuard]},
    {path:'Carga',loadComponent:()=>import('../app/Core/Components/pantalla-carga/pantalla-carga.component').then(c=>c.PantallaCargaComponent),canActivate:[authGuard]},
    {path:'Game',loadComponent:()=>import('../app/Core/Components/juego/juego.component').then(c=>c.JuegoComponent),canActivate:[authGuard]},



];
