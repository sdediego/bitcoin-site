import { Component, OnInit, AfterViewInit } from '@angular/core';

import { Observable } from 'rxjs/Rx';

import { IUser } from './../../shared/interfaces/user.interface';
import { AuthService } from './../../shared/services/auth.service';
import { CoindeskService } from './../../shared/services/coindesk.service';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, AfterViewInit {

  public user: IUser;
  public btcPriceHist: object;
  public dates: Array<any>;
  public printData: Array<number>;
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

  public ngAfterViewInit(): void {
    this.getBtcPrice();
  }

  public getBtcPrice() {
    this.coindeskService.getHistoricalBtcPrice().map(
      response => {
        this.btcPriceHist = response['bpi'];
        this.dates = Object.keys(this.btcPriceHist);
        this.btcPriceSeries = Object.values(this.btcPriceHist);
        return this.btcPriceHist, this.btcPriceSeries, this.dates;
      }).
      subscribe(
        response => {
          this.printData = this.btcPriceSeries;
          this.lineChartData = [
            { data: this.printData, label: 'BTC' }
          ];
          this.lineChartLabels = this.dates;
          this.lineChartOptions = {
            responsive: false,
          };
          this.lineChartColors = [
            {
              backgroundColor: 'rgba(148,159,177,0.2)',
              borderColor: 'rgba(148,159,177,1)',
              pointBackgroundColor: 'rgba(148,159,177,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            }
          ];
          this.lineChartLegend = true;
          this.lineChartType = 'line';
        },
        error => {
          this.error = error.message;
        });
  }

  public toLogScale(): void {
    this.btcLogPriceSeries = this.btcPriceSeries.map(price => {
      return Math.log(price) > 0 ? Math.log(price) : 0;
    });
    this.printData = this.btcLogPriceSeries;
    this.isDecimal = false;
    this.printGraphic();
  }

  public toDecimalScale(): void {
    this.printData = this.btcPriceSeries;
    this.isDecimal = true;
    this.printGraphic();
  }

  public toTimeInterval(days): void {
    let series = this.isDecimal ? this.btcPriceSeries : this.btcLogPriceSeries;
    if (!days) {
      this.printData = series;
    } else {
      this.printData = series.slice(series.length - days, series.length);
    }
    this.printGraphic();
  }

  public printGraphic() {
    this.lineChartData = [
      { data: this.printData, label: 'BTC' }
    ];
  }

}
