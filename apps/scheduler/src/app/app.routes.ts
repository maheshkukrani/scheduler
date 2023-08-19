import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'scheduler',
    loadChildren: () => import('@scheduler/scheduler/views').then((m) => m.SchedulerViewsModule),
  },
];
