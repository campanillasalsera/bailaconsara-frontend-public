import { Routes } from '@angular/router';
import { NoEncontradoComponent } from './components/no-encontrado/no-encontrado.component';
import { HomeComponent } from './pages/home/home.component';
import { EventosComponent } from './pages/eventos/eventos.component';
import { HorariosComponent } from './pages/horarios/horarios.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { GaleriaComponent } from './pages/galeria/galeria.component';
import { DondeBailarComponent } from './pages/donde-bailar/donde-bailar.component';
import { AuthComponent } from './components/authentication/auth/auth.component';
import { AreaPrivadaComponent } from './pages/area-privada/area-privada.component';
import { ForgotPasswordComponent } from './components/authentication/forgot-password/forgot-password.component';
import { SinglePostTemplateComponent } from './components/posts/single-post-template/single-post-template.component';
import { TalleresComponent } from './components/talleres/talleres.component';
import { CreatePostFormComponent } from './components/posts/create-post-form/create-post-form.component';
import { UpdatePostFormComponent } from './components/posts/update-post-form/update-post-form.component';
import { CreateTallerComponent } from './components/talleres/create-taller/create-taller.component';
import { EditTallerComponent } from './components/talleres/edit-taller/edit-taller.component';
import { PerfilUsuarioComponent } from './components/authentication/perfil-usuario/perfil-usuario.component';
import { PoliticaCookiesComponent } from './components/cookies/politica-cookies/politica-cookies.component';

export const routes: Routes = [
    {
        path: "home",
        component: HomeComponent,
        title: "Home"
    },
    {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
    },
    {
        path:"horarios",
        component:HorariosComponent,
        title:"Horarios"
    },
    {
        path:"contacto",
        component:ContactoComponent,
        title:"Contacto"
    },
    {
        path:"galeria",
        component:GaleriaComponent,
        title:"Galeria"
    },
    {
        path:"dondeBailar",
        component:DondeBailarComponent,
        title:"Donde Bailar"
    },
    {
        path: "eventos",
        component:EventosComponent,
        title: "Eventos"
    },
    {
        path: "auth",
        component:AuthComponent,
        title: "Sesion Usuario"
    },
    {
        path: "areaPrivada",
        component:AreaPrivadaComponent,
        title: "Area Privada"
    },
    {
        path: "forgotPassword",
        component:ForgotPasswordComponent,
        title: "Contraseña Olvidada"
    },
    {
        path: "singlePostTemplate/:id",
        component:SinglePostTemplateComponent,
        title: "Post"
    },
    {
        path: "perfilUsuario",
        component:PerfilUsuarioComponent,
        title: "Perfil Usuario"
    },
    {
        path: "talleres",
        component:TalleresComponent,
        title: "Talleres"
    },
    {
        path: "crearPost",
        component: CreatePostFormComponent,
        title: "Crear Post"
    },
    {
        path: "updatePost/:id",
        component: UpdatePostFormComponent,
        title: "Actualizar Post"
    },
    {
        path: "crearTaller",
        component: CreateTallerComponent,
        title: "Crear Taller"
    },
    {
        path: "updateTaller/:id",
        component: EditTallerComponent,
        title: "Actualizar Taller"
    },

    
    


















    

         // 404 NO ENCONTRADO 
        {
            path: "**",
            component: NoEncontradoComponent,
            title: "404 No encontrado"
        }
];
