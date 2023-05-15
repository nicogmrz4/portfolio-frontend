import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MainComponent } from './main/main.component';
import { ExperienceComponent } from './experience/experience.component';
import { EducationComponent } from './education/education.component';

import { NgCircleProgressModule } from 'ng-circle-progress';
import { SkillsComponent } from './skills/skills.component';
import { ProjectsComponent } from './projects/projects.component';
import { SectionHeaderComponent } from './components/section-header/section-header.component';
import { FooterComponent } from './footer/footer.component';
import { ExperienceItemComponent } from './experience/experience-item/experience-item.component';
import { EducationItemComponent } from './education/education-item/education-item.component';
import { ProjectItemComponent } from './projects/project-item/project-item.component';
import { ExperienceService } from './services/experience.service';
import { ModalComponent } from './components/modal/modal.component';
import { BtnComponent } from './components/btn/btn.component';
import { LoginComponent } from './views/login/login.component';
import { InputComponent } from './components/input/input.component';
import { HomeComponent } from './views/home/home.component';
import { AuthInterceptor } from './http/auth.interceptor';
import { ExperienceModalComponent } from './experience/experience-modal/experience-modal.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { EducationModalComponent } from './education/education-modal/education-modal.component';
import { SkillModalComponent } from './skills/skill-modal/skill-modal.component';
import { ProjectModalComponent } from './projects/project-modal/project-modal.component';
import { FileUploadInputComponent } from './components/file-upload-input/file-upload-input.component';
import { UserModalComponent } from './main/user-modal/user-modal.component';
import { NgOptimizedImage } from '@angular/common'

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MainComponent,
    ExperienceComponent,
    EducationComponent,
    SkillsComponent,
    ProjectsComponent,
    SectionHeaderComponent,
    FooterComponent,
    ExperienceItemComponent,
    EducationItemComponent,
    ProjectItemComponent,
    ModalComponent,
    BtnComponent,
    LoginComponent,
    InputComponent,
    HomeComponent,
    ExperienceModalComponent,
    TextareaComponent,
    ConfirmComponent,
    EducationModalComponent,
    SkillModalComponent,
    ProjectModalComponent,
    FileUploadInputComponent,
    UserModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    }),
    HttpClientModule,
    NgOptimizedImage
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
