import { NgModule } from '@angular/core';
import {MatButtonModule, MatCheckboxModule, MatCardModule,
  MatFormFieldModule, MatProgressSpinnerModule, MatDialogModule,
  MatDatepickerModule, MatRadioModule, MatSelectModule, MatSnackBarModule,
  MatGridListModule, MatSidenavModule, MatToolbarModule,
  MatListModule, MatIconModule, MatInputModule, MatNativeDateModule } from '@angular/material';


@NgModule({
  imports: [ MatInputModule, MatButtonModule, MatCheckboxModule, MatCardModule,
    MatFormFieldModule, MatProgressSpinnerModule, MatDialogModule,
    MatDatepickerModule, MatRadioModule, MatSelectModule, MatGridListModule,
    MatSidenavModule, MatToolbarModule, MatListModule, MatIconModule,
    MatNativeDateModule, MatSnackBarModule
    ],
  exports: [ MatInputModule, MatButtonModule, MatCheckboxModule, MatCardModule,
    MatFormFieldModule, MatProgressSpinnerModule, MatDialogModule,
    MatDatepickerModule, MatRadioModule, MatSelectModule, MatGridListModule,
    MatSidenavModule, MatToolbarModule, MatListModule, MatIconModule,
    MatNativeDateModule, MatSnackBarModule
    ],
})
export class MaterialModule { }
