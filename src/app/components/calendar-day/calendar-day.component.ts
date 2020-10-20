import { Component, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CalendarDay } from 'src/app/models/CalendarDay';
import { ApiReminderService } from 'src/app/services/api-reminder.service';
import { DialogReminderComponent } from '../dialog-reminder/dialog-reminder.component';
import { Reminder } from '../../models/Reminder';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.css']
})
export class CalendarDayComponent implements OnInit {

  @Input() public dia: CalendarDay;
  @Input() public mes = '';

  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private apiReminder: ApiReminderService
  ) { }

  public i = 0;
  public j = 0;
  readonly width: string = '300px';
  ngOnInit(): void {
  }
  openAdd() {
    const dialogRef = this.dialog.open(DialogReminderComponent, {
      width: this.width
    });
    dialogRef.afterClosed().subscribe((result: Reminder) => {
      if (!result) {
        return;
      }
      result.fecha = this.dia.getDateString();
      result.id = uuidv4();
      console.log(result);
      this.dia.recordatorios.push(result);
      this.apiReminder.add(result);
      this.snackBar.open('Insertado con exito', '', { duration: 2000 });
    });
  }


}
