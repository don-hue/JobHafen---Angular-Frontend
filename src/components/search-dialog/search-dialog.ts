import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, FormsModule, Validators, } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Times } from '@primeicons/angular/times';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
interface Radius {
    label: string;
    value: number;
}
@Component({
  selector: 'search-dialog',
  imports: [SelectModule,ReactiveFormsModule,ToastModule,MessageModule,ButtonModule, FormsModule,IconFieldModule,InputIconModule, InputTextModule,Times ],
  templateUrl: './search-dialog.html',
  styleUrl: './search-dialog.css',
  providers: [MessageService]
})
export class SearchDialog {
  private messageService = inject(MessageService);
  private fb = inject(FormBuilder);
  searchForm: FormGroup;
  formSubmitted: boolean = false;

  radius: Radius[] = [
        { label: '5km ', value: 5 },
        { label: '10km', value: 10 },
        { label: '15km', value: 15 },
    ];


  constructor() {
    this.searchForm = this.fb.group({
        jobTitle: ['', Validators.required],
        postleitzahl: ['', Validators.required],
        radius:[0, Validators.required] 
    })
}
    onSubmit() {
        this.formSubmitted = true;
        if (this.searchForm.invalid) {
            this.searchForm.markAllAsTouched();
        return;

        }
        if (this.searchForm) {
          this.messageService.add({ severity: 'success', summary: 'Erfolgreich', detail: 'Suche angelegt', life: 3000 });
        } 
    }
    isInvalid(controlName: string) {
        const control = this.searchForm.get(controlName);
        return control?.invalid && (control.touched || this.formSubmitted);
    }
 
}
