import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { StateService } from '../../services/state.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-headers',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './headers.component.html',
  styles: ''
})
export class HeadersComponent {
  searchControl = new FormControl();
  stateService = inject(StateService);
  ngOnInit(){
    this.searchControl.valueChanges.pipe(debounceTime(250)).subscribe((value)=>{
      this.stateService.searchSubject.next(value || "");
    })
  }
}
