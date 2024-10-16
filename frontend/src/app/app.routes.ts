import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from "./home/home.component";
import { MedicineDetailsComponent } from './medicine-details/medicine-details.component';
import { authGuard } from './auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { OrderHistoryComponent } from './order-history/order-history.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },    //default route
    { path: 'home', component: HomeComponent, canActivate: [authGuard]},
    { path: 'meds/:id', component: MedicineDetailsComponent, canActivate: [authGuard] },
    { path: 'profile/:id', component: ProfileComponent, canActivate: [authGuard] },
    { path: 'order-history', component: OrderHistoryComponent, canActivate: [authGuard] },


    { path: '**', component: HomeComponent}    //any unknown route, should be at the last
];
