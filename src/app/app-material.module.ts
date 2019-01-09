import { NgModule } from '@angular/core';
import
{
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatTooltipModule, MatListModule,
  MatProgressSpinnerModule
} from '@angular/material';

const impex =
[
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatButtonToggleModule,
  MatButtonModule,
  MatTooltipModule,
  MatListModule,
  MatProgressSpinnerModule
];
@NgModule({ exports: impex, })
export class AppMaterialModule { }
