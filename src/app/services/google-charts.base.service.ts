declare var google: any;

export class GoogleChartsBaseService {
  constructor() {
    google.charts.load('current', {'packages': ['corechart', 'gauge']});
  }

  protected buildChart(data: any[], chartFunc: any, options: any): void {
    // tslint:disable-next-line:no-shadowed-variable
    const func = (chartFunc, options) => {
      const datatable = google.visualization.arrayToDataTable(data);
      chartFunc().draw(datatable, options);
    };
    const callback = () => func(chartFunc, options);
    google.charts.setOnLoadCallback(callback);
  }

}
