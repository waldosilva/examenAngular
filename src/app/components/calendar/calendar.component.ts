import { Component, OnInit } from '@angular/core';
import { CalendarDay } from 'src/app/models/CalendarDay';
import { ApiReminderService } from 'src/app/services/api-reminder.service';
import { Reminder } from '../../models/Reminder';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  public calendar: CalendarDay[] = [];
  public reminders: Reminder[] = [];
  public meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  public displayMonth: string;
  private monthIndex = 0;

  constructor(
    private apiReminder: ApiReminderService
  ) { }
  ngOnInit(): void {
    this.generateReminders();
    this.generateCalendarDays(this.monthIndex);
  }
  private generateCalendarDays(monthIndex: number): void {
    
    this.calendar = [];

    const day: Date = new Date(new Date().setMonth(new Date().getMonth() + monthIndex));

    this.displayMonth = this.meses[day.getMonth()];

    let startingDateOfCalendar = this.getStartDateForCalendar(day);

    let dateToAdd = startingDateOfCalendar;

    for (let i = 0; i < 35; i++) {
      this.calendar.push(new CalendarDay(new Date(dateToAdd)));
      const result = this.reminders
        .filter(word => word.fecha === this.calendar[this.calendar.length - 1].getDateString());

      if (result.length > 0) {
        this.calendar[this.calendar.length - 1].recordatorios = result;
      }
      dateToAdd = new Date(dateToAdd.setDate(dateToAdd.getDate() + 1));
    }

  }
  private getStartDateForCalendar(selectedDate: Date) {
    let lastDayOfPreviousMonth = new Date(selectedDate.setDate(0));

    let startingDateOfCalendar: Date = lastDayOfPreviousMonth;

    if (startingDateOfCalendar.getDay() !== 1) {
      do {
        startingDateOfCalendar = new Date(startingDateOfCalendar.setDate(startingDateOfCalendar.getDate() - 1));
      } while (startingDateOfCalendar.getDay() !== 1);
    }

    return startingDateOfCalendar;
  }

  private generateReminders(): void {
    this.reminders = this.apiReminder.getReminders();
  }
  valorSalida(valor: any): void {
    if (valor) {
      this.generateReminders();
      this.generateCalendarDays(this.monthIndex);
    }
  }
  validation = (newValue) => {
    console.log('si entro');
  }

}
