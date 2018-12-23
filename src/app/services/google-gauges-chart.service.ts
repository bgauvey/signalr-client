
import { GoogleChartsBaseService } from './google-charts.base.service';
import { Injectable } from '@angular/core';

declare var google: any;

@Injectable()
export class GoogleGaugesChartService extends GoogleChartsBaseService {

  constructor() { super(); }

  public BuildGaugesChart(elementId: string, data: any[], config: any): void {
    const chartFunc = () => new google.visualization.Gauge(document.getElementById(elementId));
    this.buildChart(data, chartFunc, config);
  }
}
