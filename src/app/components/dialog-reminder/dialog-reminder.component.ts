import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaisService } from 'src/app/services/pais.service';
import { Reminder } from '../../models/Reminder';
import { ApiReminderService } from '../../services/api-reminder.service';

@Component({
  selector: 'app-dialog-reminder',
  templateUrl: './dialog-reminder.component.html',
  styleUrls: ['./dialog-reminder.component.css']
})
export class DialogReminderComponent  implements OnInit {

  public texto = '';
  public ciudad = '';
  public day = 0;
  public hora = '';
  public color = '';
  public fecha = '';
  public id = '';

  paises: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<DialogReminderComponent>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public reminder: Reminder,
    private apiReminder: ApiReminderService,
    private paisService: PaisService
    ) {

    if (this.reminder !== null) {
      console.log(this.reminder);
      this.texto = this.reminder.texto;
      this.ciudad = this.reminder.ciudad;
      this.day = this.reminder.day;
      this.hora = this.reminder.hora;
      this.color = this.reminder.color;
      this.fecha = this.reminder.fecha;
      this.id = this.reminder.id;

    }
  }
  ngOnInit(): void {
    this.paisService.getPaises().subscribe( (response: any) => {
      this.paises = response;
      this.paises.unshift({nombre: '[Seleccione un pais]', codigo : ''});
    });
  }
  close(): void {
    this.dialogRef.close();
  }

  guardarCambios() {
    const reminder: Reminder = {
      texto: this.texto,
      ciudad: this.ciudad,
      day: this.day,
      hora: this.hora,
      color: this.color,
      fecha: this.fecha,
      id: this.id
    };
    this.dialogRef.close(reminder);
  }


  changeColor(theme: string): void {


  }
}
