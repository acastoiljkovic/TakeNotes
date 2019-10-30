import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubjectsService } from 'src/app/services/subjects.service';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'app-start-page',
  templateUrl: './startPage.component.html',
  styleUrls: ['./startPage.component.css']
})
export class StartPageComponent implements OnInit, OnDestroy {
      subjects : any[] = Array();

      private subjectListener: Subscription;

      constructor(public subjectService:SubjectsService, private sanitizer: DomSanitizer){}

      ngOnInit(){
        this.subjectService.getRandomSubjects();
        this.subjectListener = this.subjectService.getSubjectsUpdateListener().subscribe(data =>{
          this.subjects = data.filter(item => {
            if(item.listNotes.length > 0)
              return item;
          });
          console.log(this.subjects);
        }
        );
      }

      transform(value: any): any {
        return this.sanitizer.bypassSecurityTrustHtml(value);
      }

      ngOnDestroy(){
        this.subjectListener.unsubscribe();
      }
}
