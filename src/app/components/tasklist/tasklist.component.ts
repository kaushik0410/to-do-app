import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tasklist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tasklist.component.html',
  styles: ''
})
export class TasklistComponent {
  @Input() taskList:any[] = [];
  @Output() important = new EventEmitter<any>();
  @Output() complete = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  markimportant(task:any){
    this.important.emit(task);
  }
  markcomplete(task:any){
    this.complete.emit(task);
  }
  markdelete(task:any){
    this.delete.emit(task);
  }
}
