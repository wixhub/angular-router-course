import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CourseComponent } from "./course/course.component";
import { HomeComponent } from "./home/home.component";
import { LessonsListComponent } from "./lessons-list/lessons-list.component";
import { CourseResolver } from "./services/course.resolver";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: ":courseUrl",
    component: CourseComponent,
    children: [
      { path: "", component: LessonsListComponent },
      {
        path: "lesson/:lessonSeqNo",
        component: LessonsListComponent,
      },
    ],
    resolve: {
      course: CourseResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CourseResolver],
})
export class CoursesRoutingModule {}
