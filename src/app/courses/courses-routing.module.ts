import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CourseComponent } from "./course/course.component";
import { HomeComponent } from "./home/home.component";
import { LessonDetailComponent } from "./lesson/lesson-detail.component";
import { LessonsListComponent } from "./lessons-list/lessons-list.component";
import { CourseResolver } from "./services/course.resolver";
import { LessonsResolver } from "./services/lessons.resolver";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: ":courseUrl",
    component: CourseComponent,
    children: [
      {
        path: "",
        component: LessonsListComponent,
        resolve: { lessons: LessonsResolver },
      },
      {
        path: "lesson/:lessonSeqNo",
        component: LessonDetailComponent,
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
  providers: [CourseResolver, LessonsResolver],
})
export class CoursesRoutingModule {}
