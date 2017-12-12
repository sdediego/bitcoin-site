import { Component, OnInit, OnChanges, AfterViewInit } from '@angular/core';

import { Observable } from 'rxjs/Rx';

import { IUser } from './../../shared/interfaces/user.interface';
import { AuthService } from './../../shared/services/auth.service';
import { CoindeskService } from './../../shared/services/coindesk.service';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnChanges, AfterViewInit {

  public user: IUser;
  public printData: Array<number>;
  public btcPriceHist: object;
  //public btcPriceSeries: Array<number> = [6337, 5857.3175, 6517.6763, 6598.7688, 7279.0013, 7843.9375, 7689.9088, 7776.94, 8033.9363, 8238.2025, 8095.5938, 8230.6925, 8002.6413, 8201.4613, 8763.785, 9326.5888, 9739.055, 9908.2288, 9816.3475, 9916.5363, 10859.5625, 10895.0138, 11180.8875, 11616.855, 11696.0583, 13708.9913, 16858.02, 16057.145, 14913.4038, 15036.9563, 16699.6775];
  //public dates = ["2017-11-11", "2017-11-12", "2017-11-13", "2017-11-14", "2017-11-15", "2017-11-16", "2017-11-17", "2017-11-18", "2017-11-19", "2017-11-20", "2017-11-21", "2017-11-22", "2017-11-23", "2017-11-24", "2017-11-25", "2017-11-26", "2017-11-27", "2017-11-28", "2017-11-29", "2017-11-30", "2017-12-01", "2017-12-02", "2017-12-03", "2017-12-04", "2017-12-05", "2017-12-06", "2017-12-07", "2017-12-08", "2017-12-09", "2017-12-10", "2017-12-11"];
  public dates: Array<any>;
  public btcPriceSeries: Array<number>;
  public btcLogPriceSeries: Array<number>;
  public error: string;

  constructor(
    private authService: AuthService,
    private coindeskService: CoindeskService
  ) {
    this.user = this.authService.getUser();
    this.authService.getLoginEventEmitter().subscribe(user => {
      this.user = user;
    });
  }

  public ngOnInit(): void {
    //let response = this.getBtcPrice();
    //this.printData = this.btcPriceSeries;
    //console.log(this.btcPriceHist, this.btcPriceSeries, this.dates);
    //console.log(response[0], response[1], response[2]);
  }

  public ngOnChanges(): void {
    this.getBtcPrice();
    //this.printData = this.btcPriceSeries;
    //console.log(this.btcPriceHist, this.btcPriceSeries, this.dates);
    //console.log(response[0], response[1], response[2]);
  }

  public ngAfterViewInit(): void {
    let response = this.getBtcPrice();
    //console.log("PASO")
    //this.printData = this.btcPriceSeries;
    //console.log(this.btcPriceHist, this.btcPriceSeries, this.dates , this.printData);
    //console.log("DEBIA ESPERARME")
    // console.log(response[0], response[1], response[2]);
  }

  public getBtcPrice() {
    this.coindeskService.getHistoricalBtcPrice().map(
      response => {
        this.btcPriceHist = response['bpi'];
        this.dates = Object.keys(this.btcPriceHist);
        this.btcPriceSeries = Object.values(this.btcPriceHist);
        //console.log(this.btcPriceHist, this.btcPriceSeries, this.dates);
        console.log("ME ATRASO")
        return this.btcPriceHist, this.btcPriceSeries, this.dates;
      }).
      subscribe(
        response => {
          //console.log("PASO")
          this.printData = this.btcPriceSeries;
          //console.log(this.btcPriceHist, this.btcPriceSeries, this.dates , this.printData);
          //console.log(this.printData)
          //console.log("DEBIA ESPERARME")

          this.lineChartData = [
            { data: this.printData, label: 'BTC' }
          ];

          console.log('PRINT DATA: ', this.printData);
          this.lineChartLabels = this.dates;
          console.log(this.dates);
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
        });
  }

  public toLogScale() {
    this.btcLogPriceSeries = this.btcPriceSeries.map(price => Math.log(price) > 0 ? Math.log(price) : 0);
    this.printData = this.btcLogPriceSeries;
    console.log(this.printData);
    this.printGraphic();

  }

  public printGraphic() {
    this.lineChartData = [
      { data: this.printData, label: 'BTC' }
    ];
  }


  public lineChartData: Array<any>;
  public lineChartLabels: Array<any> = this.dates;
  public lineChartOptions: any = {
    responsive: false,
  };
  public lineChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

}
