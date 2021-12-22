import { NgModule } from "@angular/core";
import {
  Routes,
  RouterModule,
  PreloadAllModules,
  UrlSerializer,
} from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { LoginComponent } from "./login/login.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { CanLoadAuthGuard } from "./services/can-load-auth.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/courses",
    pathMatch: "full",
  },
  { path: "login", component: LoginComponent },
  {
    path: "about",
    component: AboutComponent,
  },
  {
    path: "courses",
    loadChildren: () =>
      import("./courses/courses.module").then((n) => n.CoursesModule),
    //canLoad: [CanLoadAuthGuard],
  },
  {
    path: "**",
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
  providers: [CanLoadAuthGuard],
})
export class AppRoutingModule {}
