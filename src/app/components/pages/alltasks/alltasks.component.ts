import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpsService } from '../../../services/https.service';
import { PageTitleComponent } from '../../page-title/page-title.component';
import { TasklistComponent } from '../../tasklist/tasklist.component';
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'app-alltasks',
  standalone: true,
  imports: [FormsModule, PageTitleComponent, TasklistComponent],
  templateUrl: './alltasks.component.html',
  styles: ''
})
export class AlltasksComponent {
  newTask="";
  initialtaskList:any[] = [];
  taskList:any[] = [];
  httpsService = inject(HttpsService);
  stateService = inject(StateService);
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
  addTask(){
    console.log("task added ", this.newTask);
    this.httpsService.addTask(this.newTask).subscribe(()=>{
      this.newTask="";
      this.getAllTasks();
    });
  }
  getAllTasks(){
    this.httpsService.getAllTasks().subscribe((result: any)=>{
      console.log(result);
      this.initialtaskList=this.taskList=result.filter((x:any)=>x.delete!=true);
    });
  }
  onComplete(task:any){
    task.completed=true;
    console.log("complete: "+task);
    this.httpsService.updateTask(task).subscribe(()=>{
      this.getAllTasks();
    });
  }
  onImportant(task:any){
    task.important=true;
    console.log("important: "+task);
    this.httpsService.updateTask(task).subscribe(()=>{
      this.getAllTasks();
    });
  }
  onDelete(task:any){
    task.delete=true;
    console.log("delete: "+task);
    this.httpsService.updateTask(task).subscribe(()=>{
      this.getAllTasks();
    });
  }
}

