import { Routes } from '@angular/router';
import { AlltasksComponent } from './components/pages/alltasks/alltasks.component';
import { ImportanttasksComponent } from './components/pages/importanttasks/importanttasks.component';
import { CompletetasksComponent } from './components/pages/completetasks/completetasks.component';

export const routes: Routes = [
  {
    path: '',
    component: AlltasksComponent
  },
  {
    path: 'Important',
    component: ImportanttasksComponent
  },
  {
    path: 'Completed',
    component: CompletetasksComponent
  }
];
