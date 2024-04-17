import { Routes } from '@angular/router';

export const routes: Routes = 
[
    {path:'',loadComponent:()=>import('../app/Core/Components/index/index.component').then(c=>c.IndexComponent)},
    {path:'Register',loadComponent:()=>import('../app/Core/Components/registro/registro.component').then(c=>c.RegistroComponent)},
    {path:'Code',loadComponent:()=>import('../app/Core/Components/codigo/codigo.component').then(c=>c.CodigoComponent)},
    {path:'Game',loadComponent:()=>import('../app/Core/Components/juego/juego.component').then(c=>c.JuegoComponent)},


];
