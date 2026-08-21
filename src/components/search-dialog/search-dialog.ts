import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, FormsModule, Validators, } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Times } from '@primeicons/angular/times';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageModule } from 'primeng/message';
import { SearchDto } from '../../dto/search-dto';
import { SearchService } from '../../service/search-service';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
interface Radius {
    label: string;
    value: number;
}
@Component({
  selector: 'search-dialog',
  imports: [ProgressSpinnerModule,ToastModule,MessageModule,SelectModule,ReactiveFormsModule,ButtonModule, FormsModule,IconFieldModule,InputIconModule, InputTextModule,Times ],
  templateUrl: './search-dialog.html',
  styleUrl: './search-dialog.css',
  providers: [MessageModule]
})
export class SearchDialog {
  private ref = inject(DynamicDialogRef);
  private fb = inject(FormBuilder);
  private searchService = inject(SearchService);
  searchForm: FormGroup;
  formSubmitted: boolean = false;
  isLoading: boolean = false; 
  private cdr = inject(ChangeDetectorRef);

  radius: Radius[] = [
        { label: '5km ', value: 5 },
        { label: '10km', value: 10 },
        { label: '15km', value: 15 },
    ];


  constructor() {
    this.searchForm = this.fb.group({
        jobTitle: ['', Validators.required],
        postalcode: [
            '', 
            [
                Validators.required,
                Validators.pattern(/^\d{5}$/)
            ]
        ],
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
            const form = this.searchForm.value
            const searchDto: SearchDto = {
                keyword: form.jobTitle, 
                postal_code: form.postalcode, 
                radius: form.radius
            }; 
            this.isLoading = true;
            this.searchService.saveSearch(searchDto).subscribe({
               next: (res) => {
                this.ref.close(res);
               }, 
               error:(err) => {
                this.ref.close();
               },
               complete: () => {
                this.isLoading = false;
               }
            })

        } 
    }
    isInvalid(controlName: string) {
        const control = this.searchForm.get(controlName);
        return control?.invalid && (control.touched || this.formSubmitted);
    }
 
}
