import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'',redirectTo:'user',pathMatch:'full'},
    {path:'user',loadComponent:()=>import('./components/user/user.component').then(u=>u.UserComponent)},
];
