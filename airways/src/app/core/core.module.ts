import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorPageComponent } from '@core/pages/error-page/error-page.component';
import { FooterComponent } from '@core/components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { BookingHeaderComponent } from './components/booking-header/booking-header.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { StepperComponent } from './components/stepper/stepper.component';
import { DateSelectComponent } from './components/date-select/date-select.component';
import { CurrencySelectComponent } from './components/currency-select/currency-select.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthComponent } from './components/auth/auth.component';
import { SharedModule } from '@shared/shared.module';
import { InputEmailComponent } from './components/auth/input-email/input-email.component';
import { InputPasswordComponent } from './components/auth/input-password/input-password.component';
import { InputNameComponent } from './components/auth/input-name/input-name.component';
import { InputCountryCodeComponent } from './components/auth/input-country-code/input-country-code.component';
import { InputPhoneComponent } from './components/auth/input-phone/input-phone.component';
import { InputCitizenshipComponent } from './components/auth/input-citizenship/input-citizenship.component';
import { InputBirthdayComponent } from './components/auth/input-birthday/input-birthday.component';
import { EditorHeaderComponent } from './components/editor-header/editor-header.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    FooterComponent,
    ErrorPageComponent,
    HeaderComponent,
    BookingHeaderComponent,
    StepperComponent,
    DateSelectComponent,
    CurrencySelectComponent,
    AuthComponent,
    InputEmailComponent,
    InputPasswordComponent,
    InputNameComponent,
    InputCountryCodeComponent,
    InputPhoneComponent,
    InputCitizenshipComponent,
    InputBirthdayComponent,
    EditorHeaderComponent,
  ],
  imports: [
    CommonModule,
    MatTooltipModule,
    MatStepperModule,
    MatSelectModule,
    MatDialogModule,
    SharedModule,
    MatBadgeModule,
    MatMenuModule,
  ],
  exports: [
    FooterComponent,
    ErrorPageComponent,
    HeaderComponent,
    BookingHeaderComponent,
    StepperComponent,
  ],
})
export class CoreModule {}
