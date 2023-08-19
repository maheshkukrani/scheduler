import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulerComponent } from './scheduler/scheduler.component';
import {MatCardModule} from "@angular/material/card";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";

@NgModule({
    imports: [CommonModule,
      MatCardModule,
      MatDatepickerModule,
      MatNativeDateModule],
    declarations: [SchedulerComponent],
    exports: [
        SchedulerComponent,
    ]
})
export class SchedulerUiModule {}
