import {
  AfterContentInit,
  AfterViewInit,
  Component,
  OnInit
} from '@angular/core';

import { environment as Environment } from '../environments/environment';
import { GaugeModel } from '../models/gauge';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

declare var google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public _hubConnection: HubConnection;
  private _hubUrl: string;

  public data: any[] = [
    ['Label', 'Value'],
    ['Memory', 0],
    ['CPU', 0],
    ['Network', 0]
  ];

  public elementId: String = 'Gauge1';

  public config: any = {
    width: 600,
    height: 240,
    redFrom: 90,
    redTo: 100,
    yellowFrom: 75,
    yellowTo: 90,
    minorTicks: 5
  };

  constructor() {
    this._hubUrl = 'http://localhost:5000/gauges';
  }

  public ngOnInit() {

    this._hubConnection = new HubConnectionBuilder()
                                .withUrl(this._hubUrl)
                                .build();
    this._hubConnection
      .start()
      .then(() =>
        this._hubConnection
          .invoke('GetGaugesData')
          .catch(err => console.error(err))
      )
      .catch(err => console.log('Error while establishing connection :('));

    this._hubConnection.on('GetGaugesData', (data: GaugeModel) => {
      this.data = [
        ['Label', 'Value'],
        ['Memory', data.memory],
        ['CPU', data.cpu],
        ['Network', data.network]
      ];
    });
  }
}
