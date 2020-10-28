import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';

import { CustomRoutes } from './../routes/custom-routes.routing.module';

import { FormComponent } from './form.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [FormComponent, LoginComponent, SignUpComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    CustomRoutes,

    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports: [FormComponent, LoginComponent, SignUpComponent],
})
export class FormModule {}
