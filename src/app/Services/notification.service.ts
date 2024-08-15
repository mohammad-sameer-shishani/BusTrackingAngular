import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private hubConnection!: signalR.HubConnection;
  public notifications: string[] = [];

  constructor(private http:HttpClient) {
    this.startConnection();
    this.addReceiveNotificationListener();
  }

  private startConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7169/notificationHub') // Replace with your SignalR hub URL
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR connection started'))
      .catch(err => {
        console.error('Error while starting SignalR connection: ' + err);
        this.reconnect();
      });

    this.hubConnection.onreconnected(() => {
      console.log('SignalR connection reestablished');
    });

    this.hubConnection.onclose(() => {
      console.warn('SignalR connection closed. Attempting to reconnect...');
      this.reconnect();
    });
  }

  private reconnect(): void {
    setTimeout(() => this.startConnection(), 5000);
  }

  private addReceiveNotificationListener(): void {
    this.hubConnection.on('ReceiveNotification', (message: string) => {
      console.log('Notification received:', message);
      this.notifications.push(message);
      // You can add additional logic here, such as displaying the notification in the UI
    });
  }

  public sendNotification(message: string): void {
    this.hubConnection.invoke('SendNotification', message)
      .catch(err => console.error('Error while sending notification: ' + err));
  }

  public getNotifications(): string[] {
    return this.notifications;
  }

  CreateNotification(body:any){
    this.http.post('https://localhost:7169/api/notification',body).subscribe(response=>{

      console.log('notification created')
    },error=>{
      console.log('error creating notification')
    })
  }

  DeleteNotification(id:number){
    this.http.delete('https://localhost:7169/api/notification/'+id).subscribe(response=>{

      console.log('notification Deleted')
      window.location.reload()
    },error=>{
      console.log('error deleting notification')
    })
  }

AllParentNotifications:any=[]
  GetAllNotificationByParentId(parentid:number){
    this.http.get('https://localhost:7169/api/notification/ByParentId/'+parentid).subscribe(response=>{
      this.AllParentNotifications=response
      console.log('Got notification By Parent id')
    },error=>{
      console.log('error Getting notifications')
    })
  }
}
