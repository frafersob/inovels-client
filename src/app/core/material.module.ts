import { NgModule } from '@angular/core';
import {MatButtonModule, MatCheckboxModule, MatCardModule, MatMenuModule,
  MatFormFieldModule, MatProgressSpinnerModule, MatDialogModule,
  MatDatepickerModule, MatRadioModule, MatSelectModule, MatSnackBarModule,
  MatGridListModule, MatSidenavModule, MatToolbarModule, MatExpansionModule,
  MatListModule, MatIconModule, MatInputModule, MatNativeDateModule, MatProgressBarModule } from '@angular/material';

@NgModule({
  imports: [ MatInputModule, MatButtonModule, MatCheckboxModule, MatCardModule,
    MatFormFieldModule, MatProgressSpinnerModule, MatDialogModule, MatExpansionModule,
    MatDatepickerModule, MatRadioModule, MatSelectModule, MatGridListModule,
    MatSidenavModule, MatToolbarModule, MatListModule, MatIconModule, MatMenuModule,
    MatNativeDateModule, MatSnackBarModule, MatProgressBarModule
    ],
  exports: [ MatInputModule, MatButtonModule, MatCheckboxModule, MatCardModule,
    MatFormFieldModule, MatProgressSpinnerModule, MatDialogModule, MatExpansionModule,
    MatDatepickerModule, MatRadioModule, MatSelectModule, MatGridListModule,
    MatSidenavModule, MatToolbarModule, MatListModule, MatIconModule,
    MatNativeDateModule, MatSnackBarModule, MatProgressBarModule, MatMenuModule
    ],
})
export class MaterialModule { }
