import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiReminderService } from '../../services/api-reminder.service';
import { DialogReminderComponent } from '../dialog-reminder/dialog-reminder.component';
import { Reminder } from '../../models/Reminder';
import { CalendarDay } from 'src/app/models/CalendarDay';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent implements OnInit {

  
  @Input() public dia: CalendarDay;
  @Input() public reminder: Reminder;
  @Input() public indice = 0;
  readonly width: string = '300px';


  // tslint:disable-next-line: no-output-rename
  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private apiReminder: ApiReminderService
  ) { }
  
  openEdit(reminder: Reminder) {
    const dialogRef = this.dialog.open(DialogReminderComponent, {
      width: this.width,
      data: reminder

    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.reminder.fecha = this.dia.getDateString();
      this.reminder = result;
      this.editReminder();


    });
  }
  borrarReminder(reminder: Reminder) {
    this.apiReminder.borrar(reminder);
    this.valueChange.emit(true);
    this.snackBar.open('Borrado con exito', '', { duration: 2000 });
  }
  editReminder() {
    this.apiReminder.edit(this.reminder);
    this.valueChange.emit(true);
    this.snackBar.open('Editado con exito', '', { duration: 2000 });
  }

  ngOnInit(): void {
  }

}
