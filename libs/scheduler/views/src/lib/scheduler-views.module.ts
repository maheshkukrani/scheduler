import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulerContainerComponent } from './scheduler-container/scheduler-container.component';
import {RouterModule, Routes} from "@angular/router";
import {SchedulerUiModule} from "@scheduler/scheduler/ui";


export const routes: Routes = [
  {
    path: '',
    component: SchedulerContainerComponent,
  },
];

export const routerModule = RouterModule.forChild(routes);

@NgModule({
  imports: [CommonModule, routerModule, SchedulerUiModule],
  declarations: [SchedulerContainerComponent],
})
export class SchedulerViewsModule {}
