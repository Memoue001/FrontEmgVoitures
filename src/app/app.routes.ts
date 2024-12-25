import { Routes } from '@angular/router';
import { AccuielComponent } from './accuiel/accuiel.component';
import { LoginComponent } from './login/login.component';
import { AddVoitureComponent } from './add-voiture/add-voiture.component';
import { ListVoitureComponent } from './list-voiture/list-voiture.component';
import { UpdateVoitureComponent } from './update-voiture/update-voiture.component';
import { DetailComponent } from './detail/detail.component';

export const routes: Routes = [
    {path: '', component: AccuielComponent},
    {path: 'login', component: LoginComponent},
    {path: 'add', component: AddVoitureComponent},
    {path: 'list', component: ListVoitureComponent},
    {path: 'update/:carId', component: UpdateVoitureComponent},
    {path: 'detail/:carId', component: DetailComponent}
];
