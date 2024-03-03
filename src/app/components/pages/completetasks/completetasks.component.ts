import { Component, inject } from '@angular/core';
import { PageTitleComponent } from '../../page-title/page-title.component';
import { HttpsService } from '../../../services/https.service';
import { StateService } from '../../../services/state.service';
import { TasklistComponent } from '../../tasklist/tasklist.component';

@Component({
  selector: 'app-completetasks',
  standalone: true,
  imports: [PageTitleComponent, TasklistComponent],
  templateUrl: './completetasks.component.html',
  styles: ''
})
export class CompletetasksComponent {
  httpsService = inject(HttpsService);
  stateService = inject(StateService);
  taskList:any[] = [];
  initialtaskList:any[] = [];
  ngOnInit(){
    this.stateService.searchSubject.subscribe((value)=>{
      if (value) {
        this.taskList = this.initialtaskList.filter((x)=>
          x.title.toLowerCase().includes(value.toLowerCase())
        );
      } else {
        this.taskList = this.initialtaskList;
      }
    });
    this.getAllTasks();
  }
  getAllTasks(){
    this.httpsService.getAllTasks().subscribe((result:any)=>{
      console.log("completed task list");
      this.initialtaskList=this.taskList=result.filter((x:any)=>x.completed==true && x.delete!=true);
    })
  }
  onDelete(task:any){
    task.delete=true;
    console.log("deleted task: "+task);
    this.httpsService.updateTask(task).subscribe(()=>{
      this.getAllTasks();
    })
  }
  onComplete(task:any){
    task.completed=true;
    console.log("completed task: "+task);
    this.httpsService.updateTask(task).subscribe(()=>{
      this.getAllTasks();
    })
  }
}
