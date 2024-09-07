import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { InformationComponent } from './information/information.component';
import { AuthGuard } from './auth.guard';
import { LandingComponent } from './landig/landing.component';
import { IntroduccionComponent } from './introduccion/introduccion.component';
import { AnalisisSueloComponent } from './analisis-suelo/analisis-suelo.component';
import { SiembraComponent } from './siembra/siembra.component';
import { SeguimientoComponent } from './seguimiento/seguimiento.component';


export const routes: Routes = [
    {
        path: '',
        title: 'Sena Mango',
        component: LandingComponent
    },
    {
        path: 'login',
        title: 'Login',
        component: LoginComponent
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'home', title: 'Home', component: HomeComponent },
            { path: 'information', title: 'Information', component: InformationComponent },
            { path: 'introduccion', title: 'introduccion', component: IntroduccionComponent },
            { path: 'analisis-suelo', title: 'analisis-suelo', component: AnalisisSueloComponent },
            { path: 'siembra', title: 'siembra', component: SiembraComponent },
            { path: 'seguimiento', title: 'seguimiento', component: SeguimientoComponent }
        ]
    }
];
