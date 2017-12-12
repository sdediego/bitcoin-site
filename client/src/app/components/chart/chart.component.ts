import { Component, OnInit, OnChanges, AfterViewInit, ViewChild } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';

import { IUser } from './../../shared/interfaces/user.interface';
import { AuthService } from './../../shared/services/auth.service';
import { CoindeskService } from './../../shared/services/coindesk.service';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnChanges, AfterViewInit {

  @ViewChild(BaseChartDirective) graphic: BaseChartDirective;

  public user: IUser;
  public btcPriceHist: object;
  public dates: Array<any>;
  public printData: Array<number>;
  public printDates: Array<any>;
  public isDecimal: boolean = true;
  public btcPriceSeries: Array<number>;
  public btcLogPriceSeries: Array<number>;
  public error: string;
  // Chart variables
  public lineChartData: Array<any>;
  public lineChartLabels: Array<any>;
  public lineChartOptions: any;
  public lineChartColors: Array<any>;
  public lineChartLegend: boolean;
  public lineChartType: string;

  constructor(
    private authService: AuthService,
    private coindeskService: CoindeskService
  ) {
    this.user = this.authService.getUser();
    this.authService.getLoginEventEmitter().subscribe(user => {
      this.user = user;
    });
  }

  public ngOnInit(): void {}

  public ngOnChanges(): void {
    this.printGraphic();
  }

  public ngAfterViewInit(): void {
    this.getBtcPrice();
  }

  public getBtcPrice(): void {
    this.coindeskService.getHistoricalBtcPrice().map(
      response => {
        this.btcPriceHist = response['bpi'];
        this.dates = Object.keys(this.btcPriceHist);
        this.btcPriceSeries = Object.values(this.btcPriceHist);
        this.btcLogPriceSeries = this.btcPriceSeries.map(price => {
          return Math.log(price) > 0 ? Math.log(price) : 0;
        });
      }).
      subscribe(
        response => {
          this.printData = this.btcPriceSeries;
          this.printDates = this.dates;
          this.lineChartData = [
            { data: this.printData, label: 'BTC' }
          ];
          this.lineChartLabels = this.printDates;
          this.lineChartOptions = {
            responsive: false,
          };
          this.lineChartColors = [
            {
              //backgroundColor: '#fab915',
              borderColor: '#fab915',
              //pointBackgroundColor: 'rgba(148,159,177,1)',
              pointRadius: 0,
              //pointBorderColor: '#fff',
              //pointHoverBackgroundColor: '#fff',
              //pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            }
          ];
          this.lineChartLegend = false;
          this.lineChartType = 'line';
        },
        error => {
          this.error = error.message;
        });
  }

  public toLogScale(): void {
    if (this.isDecimal) {
      this.graphic.chart.config.options.scales.yAxes.type = 'logarithmic';
      this.printData = this.printData.map(price => {
        return Math.log(price) > 0 ? Math.log(price) : 0;
      });
      this.isDecimal = false;
      this.printGraphic();
    }
  }

  public toDecimalScale(): void {
    if (!this.isDecimal) {
      this.graphic.chart.config.options.scales.yAxes.type = 'linear';
      this.printData = this.printData.map(price => {
        return Math.exp(price);
      });
      this.isDecimal = true;
      this.printGraphic();
    }
  }

  public toTimeInterval(days): void {
    let series = this.isDecimal ? this.btcPriceSeries : this.btcLogPriceSeries;
    let seriesDates = this.dates;
    console.log(series, seriesDates);
    if (!days) {
      this.printData = series;
      this.printDates = this.dates;
    } else {
      this.printData = series.slice(series.length - days, series.length);
      this.printDates = seriesDates.slice(seriesDates.length - days, seriesDates.length);
    }
    this.printGraphic();
  }

  public calculateMediumAverage(days) {

  }

  public printGraphic() {
    this.lineChartData = [
      { data: this.printData, label: 'BTC' }
    ];
    this.graphic.chart.config.data.labels = this.printDates;
  }

}
