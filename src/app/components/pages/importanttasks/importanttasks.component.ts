import { Component, inject } from '@angular/core';
import { PageTitleComponent } from '../../page-title/page-title.component';
import { TasklistComponent } from '../../tasklist/tasklist.component';
import { HttpsService } from '../../../services/https.service';
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'app-importanttasks',
  standalone: true,
  imports: [PageTitleComponent, TasklistComponent],
  templateUrl: './importanttasks.component.html',
  styles: ''
})
export class ImportanttasksComponent {
  taskList:any[] = [];
  initialtaskList:any[] = [];
  httpsService = inject(HttpsService);
  stateService = inject(StateService);
  ngOnInit(){
    this.stateService.searchSubject.subscribe((value)=>{
      if (value) {
        this.taskList = this.initialtaskList.filter((x)=>
          x.title.toLowerCase.includes(value.toLowerCase())
        );
      } else {
        this.taskList=this.initialtaskList;
      }
    });
    this.getAllTasks();
  }
  getAllTasks(){
    this.httpsService.getAllTasks().subscribe((result:any)=>{
      console.log("important task list");
      this.initialtaskList=this.taskList=result.filter((x:any)=>x.important==true && x.delete!=true);
    })
  }
  onComplete(task:any){
    task.completed=true;
    console.log("completed task: "+task);
    this.httpsService.updateTask(task).subscribe(()=>{
      this.getAllTasks();
    })
  }
  onImportant(task:any){
    task.important=true;
    console.log("important task: "+task);
    this.httpsService.updateTask(task).subscribe(()=>{
      this.getAllTasks();
    })
  }
  onDelete(task:any){
    task.delete=true;
    console.log("deleted task: "+task);
    this.httpsService.updateTask(task).subscribe(()=>{
      this.getAllTasks();
    })
  }
}
