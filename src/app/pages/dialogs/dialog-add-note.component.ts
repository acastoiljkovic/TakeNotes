import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
    selector: 'dialog-add-note',
    templateUrl: './dialog-add-note.html'
})
export class DialogAddNoteComponent{
    constructor(
        public dialogRef: MatDialogRef<DialogAddNoteComponent>,
        @Inject(MAT_DIALOG_DATA) public data: String) {}
    
      onCloseClick(): void {
        this.dialogRef.close();
      }
    
}