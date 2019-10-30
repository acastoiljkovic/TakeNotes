import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
    selector: 'dialog-add-subject',
    templateUrl: './dialog-add-subject.html'
})
export class DialogAddSubjectComponent{
    constructor(
        public dialogRef: MatDialogRef<DialogAddSubjectComponent>,
        @Inject(MAT_DIALOG_DATA) public data: String) {}
    
      onCloseClick(): void {
        this.dialogRef.close();
      }
    
}