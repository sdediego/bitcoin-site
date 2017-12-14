declare var Chart: any;

import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import Pusher from 'pusher-js';
import 'chartjs-plugin-streaming';

import { IUser } from './../../shared/interfaces/user.interface';
import { AuthService } from './../../shared/services/auth.service';
import { BitstampService } from './../../shared/services/bitstamp.service';


@Component({
  selector: 'app-bitstamp',
  templateUrl: './bitstamp.component.html',
  styleUrls: ['./bitstamp.component.css']
})
export class BitstampComponent implements OnInit, AfterViewInit {

  @ViewChild('baseChart') public priceChartCanvas: ElementRef;
  @ViewChild('baseChart2') public amountChartCanvas: ElementRef;
  private ctx: CanvasRenderingContext2D;
  private ctx2: CanvasRenderingContext2D;

  public user: IUser;
  public btcPrice: Array<number>;
  public btcAmount: Array<number>;
  public timestamp: Array<any>;
  public error: string;
  public buffer: object = {};
  public bids: Array<object> = [];
  public asks: Array<object> = [];

  constructor(
    private authService: AuthService,
    private bitstampService: BitstampService
  ) {
    this.user = this.authService.getUser();
    this.authService.getLoginEventEmitter().subscribe(user => {
      this.user = user;
    });
  }

  private handleError(error: Response | any): Observable<string> {
    return Observable.throw(error.json().message);
  }

  public ngOnInit(): void {
    // Inititialize buffer
    this.buffer['price'] = [];
    this.buffer['amount'] = [[], []];
    this.buffer['book'] = [[], []];
  }

  public ngAfterViewInit(): void {
    this.getTransactions().subscribe(
      response => {
        this.setWebSocket().then(result => {
          const canvasElement: HTMLCanvasElement = this.priceChartCanvas.nativeElement;
          this.ctx = canvasElement.getContext("2d");
          const chartPrice = new Chart(this.ctx, {
            type: 'line',
            data: {
              datasets: [{
                data: [],
                label: 'Price',
                borderColor: '#fab915',
                backgoundColor: '#fab915',
                fill: false,
                lineTension: 0,
                pointRadius: 0
              }]
            },
            options: {
              title: {
                text: `BTC/USD - Bitstamp`,
                display: false
              },
              legend: {
                display: false
              },
              tooltips: {
                enabled: false
              },
              scales: {
                xAxes: [{
                  type: 'realtime'
                }]
              },
              plugins: {
                streaming: {
                  duration: 300000,
                  onRefresh: chart => {
                    Array.prototype.push.apply(
                      chart.data.datasets[0].data,
                      this.buffer['price']
                    );
                    this.buffer['price'] = [];
                  }
                }
              }
            }
          });

          const canvasElement2: HTMLCanvasElement = this.amountChartCanvas.nativeElement;
          this.ctx2 = canvasElement2.getContext("2d");
          const chartAmount = new Chart(this.ctx2, {
            type: 'scatter',
            data: {
              datasets: [{
                data: [],
                label: 'Buy',
                backgoundColor: 'rgb(0, 255, 0)',
                borderColor: 'rgb(0, 255, 0)',
                backgoundColor: 'rgb(0, 255, 0)',
                fillColor: 'rgb(0, 255, 0)',
                strokeColor: 'rgb(0, 255, 0)',
                highlightFill:'rgb(0, 255, 0)',
                highlightStroke: 'rgb(0, 255, 0)',
                fill: true
              },
              {
                data: [],
                label: 'Sell',
                borderColor: '#ff0000',
                backgoundColor: 'rgb(255, 0, 0)',
                fillColor: 'rgb(255, 0, 0)',
                strokeColor: 'rgb(255, 0, 0)',
                highlightFill:'rgb(255, 0, 0)',
                highlightStroke: 'rgb(255, 0, 0)',
                fill: true
              }]
            },
            options: {
              title: {
                text: `BTC/USD - Bitstamp`,
                display: false
              },
              legend: {
                display: false
              },
              tooltips: {
                enabled: true
              },
              scales: {
                xAxes: [{
                  type: 'realtime',
                  stacked: false
                }]
              },
              plugins: {
                streaming: {
                  duration: 300000,
                  onRefresh: chart => {
                    Array.prototype.push.apply(
                      chart.data.datasets[0].data,
                      this.buffer['amount'][0]
                    );
                    Array.prototype.push.apply(
                      chart.data.datasets[1].data,
                      this.buffer['amount'][1]
                    );
                    this.buffer['amount'] = [[], []];
                  }
                }
              }
            }
          });
        })
        .catch(error => {
          this.error = error.message;
        });
      },
      error => {
        this.error = error;
        console.log(this.error);
      });
  }

  public getTransactions(): Observable<any> {
    return this.bitstampService.getTransactions()
      .map(response => {
        const dataInvTime = response.reverse();
        dataInvTime.forEach(data => {
          this.buffer['price'].push({
            x: data.date * 1000,
            y: data.price
          });
        });

        dataInvTime.forEach(data => {
          this.buffer['amount'][data.type].push({
            x: data.date * 1000,
            y: data.amount
          });
        });
      })
      .catch(error => this.handleError(error));
  }

  private willSetWebSocket = new Promise((resolve, reject) => {
    const pusher = new Pusher('de504dc5763aeef9ff52', { cluster: 'mt1' });

    if (pusher) {
      const tradesChannel = pusher.subscribe('live_trades');
      tradesChannel.bind('trade', data => {
        this.buffer['price'].push({
          x: data.timestamp * 1000,
          y: data.price
        });

        this.buffer['amount'][data.type].push({
          x: data.timestamp * 1000,
          y: data.amount
        });
      });

      const bookChannel = pusher.subscribe('order_book');
      bookChannel.bind('data', data => {
        this.buffer['book'][0].push(data.bids.slice(0,10));
        this.buffer['book'][1].push(data.asks.slice(0,10));
      });

      resolve(this.buffer);
    } else {
      const error = new Error('Web socket failed establishing connection.');
      reject(error);
    }
  });

  private setWebSocket = async (): Promise<any> => {
    return this.willSetWebSocket
      .then(result => {
        return result;
      })
      .catch(error => this.handleError(error));
  }

}
