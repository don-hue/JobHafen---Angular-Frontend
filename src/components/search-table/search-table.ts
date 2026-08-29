import {ChangeDetectorRef, Component, OnInit, inject, ChangeDetectionStrategy, ApplicationRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Injectable } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { PlusCircle } from '@primeicons/angular/plus-circle';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SearchDialog } from '../search-dialog/search-dialog';
import { Replay } from '@primeicons/angular/replay';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { SearchEntityDto } from '../../dto/search-entity-dto';
import { SearchService } from '../../service/search-service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Trash } from '@primeicons/angular/trash';
interface SearchTableRow {
    searchId: number;
    keyword: string;
    postal_code: string; 
    radius: string;
    disableDeleteButton: boolean
}



@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-search-table',
  imports: [Trash,ProgressSpinnerModule,ToastModule,MessageModule, Replay,SearchDialog,RatingModule, TableModule, TagModule, FormsModule, PlusCircle, ButtonModule, CommonModule],
  templateUrl: './search-table.html',
  styleUrl: './search-table.css',
  providers: [DialogService, MessageService]
})


export class SearchTable implements OnInit {
    searches: SearchTableRow[] = []; 
    private dialogService = inject(DialogService);
    private messageService = inject(MessageService);
    ref?: DynamicDialogRef | null;
    private searchService = inject(SearchService);
    private cdr = inject(ChangeDetectorRef);
    public isLoading: boolean = false;  
    

    ngOnDestroy() {
      if(this.ref) {
        this.ref.close();
      }
    }

    ngOnInit():void {
      const test: SearchTableRow = {
            searchId: 1,
            keyword: "Java",
            postal_code:"41063", 
            radius:"15",
            disableDeleteButton: false,  
          };

          this.searches.push(test);
    }

    show(): void {
        this.ref = this.dialogService.open(SearchDialog, {
            header: 'Neue Suche anlegen',
            width: '20vw',
            height: '30vh',
            modal: true,
            closable: true,
            breakpoints: {
                '1250px': '30vw',
                '960px': '75vw',
                '300px': '90vw'
            },
        });
        this.ref?.onClose.subscribe( (searchEntityDtos: SearchEntityDto[]) => {
          if(searchEntityDtos) {
            this.messageService.add({ 
              severity: 'success', 
              summary: 'Erfolgreich', 
              detail: 'Suche angelegt', 
              life: 1500 });
              console.log("XXX dto received")

              this.searches = searchEntityDtos
               .filter(search =>
                !this.searches.some(
                    existingSearch => existingSearch.searchId === search.id
                ))
              .map(search => {
                return {
                  searchId: search.id,
                  keyword: search.keyword,
                  postal_code: search.postal_code, 
                  radius: search.radius,
                  disableDeleteButton:false,
                }
              })
          } else {
            this.messageService.add({ 
              severity: 'error', 
              summary: 'Fehler', 
              detail: 'Suche konnte nicht angelegt werden.', 
              life: 1500 });
          }
        })
    }

    update(): void {
      this.isLoading = true;
      this.searchService.getAllSearches()
      .subscribe({
        next: (res) => {
            const newSearches = res
                .filter(search =>
                    !this.searches.some(
                        existingSearch => existingSearch.searchId === search.id
                    )
                )
                .map(search => ({
                    searchId: search.id,
                    keyword: search.keyword,
                    postal_code: search.postal_code,
                    radius: search.radius,
                    disableDeleteButton: false,
                }));

            this.searches = [
                ...this.searches,
                ...newSearches
            ];
        },
        error: (err) => {
          this.messageService.add({ 
              severity: 'error', 
              summary: 'Fehler', 
              detail: 'Keine Suchaufträge gefunden', 
              life: 1500 });
              this.isLoading = false
        },
        complete: () => {
          this.isLoading = false; 
          this.cdr.detectChanges();
        }
      })
    }

    deleteSearch(cell:SearchTableRow) {
      console.log("delete button clicked")
      cell.disableDeleteButton = true
      this.searchService.deleteSearch(cell.searchId).subscribe({
        next: _ => {
          this.messageService.add({ 
              severity: 'success', 
              summary: 'Erfolgreich',
              detail: 'Suche wurde gelöscht', 
              life: 1500 });
          const toBeDeleted = this.searches.findIndex(search => search.searchId == cell.searchId);
          this.searches.splice(toBeDeleted, 1);
        }, 
        error: (err) => {
          console.log(err);
           this.messageService.add({ 
              severity: 'error', 
              summary: 'Fehler', 
              detail: 'Suche konnte nicht gelöscht werden', 
              life: 1500 });
          cell.disableDeleteButton  = false; 
        }, 
        complete: () => {
          this.cdr.detectChanges();
        }
      })
    }
}
