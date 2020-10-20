import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reminder } from '../models/Reminder';

@Injectable({
  providedIn: 'root'
})
export class ApiReminderService {


  public reminders: Reminder[] = [];
  constructor() { }

  add(reminder: Reminder): void {

    this.reminders.push(reminder);
    this.guardarStorage();
  }
  edit(reminder: Reminder): void {

    let paso: Reminder[] = [];
    paso = this.reminders.filter(obj => obj.id !== reminder.id);
    paso.push(reminder);
    this.reminders = paso;
    this.guardarStorage();
  }

  borrar(reminder: Reminder) {
    let paso: Reminder[] = [];
    paso = this.reminders.filter(obj => obj.id !== reminder.id);
    this.reminders = paso;
    this.guardarStorage();
  }
  getReminders(): Reminder[] {
    if (localStorage.getItem('reminders')) {
      this.reminders = JSON.parse(localStorage.getItem('reminders'));
    }
    return this.reminders;
  }

  guardarStorage() {
    localStorage.setItem('reminders', JSON.stringify(this.reminders));
  }


}
