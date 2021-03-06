declare var Chart: any;

import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import 'chartjs-plugin-streaming';

import { IUser } from './../../shared/interfaces/user.interface';
import { AuthService } from './../../shared/services/auth.service';


@Component({
  selector: 'app-bitfinex',
  templateUrl: './bitfinex.component.html',
  styleUrls: ['./bitfinex.component.css']
})
export class BitfinexComponent implements OnInit, AfterViewInit {

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

  constructor(private authService: AuthService) {
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
            }],
            yAxes: [{
              ticks: {
                callback: (value, index, values) => {
                  return '$' + value;
                }
              }
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
            borderColor: '#009933',
            backgoundColor: '#009933',
            fillColor: '#009933',
            strokeColor: '#009933',
            highlightFill: '#009933',
            highlightStroke: '#009933',
            fill: true
          },
          {
            data: [],
            label: 'Sell',
            borderColor: '#ff3300',
            backgoundColor: '#ff3300',
            fillColor: '#ff3300',
            strokeColor: '#ff3300',
            highlightFill: '#ff3300',
            highlightStroke: '#ff3300',
            fill: true
          }]
        },
        options: {
          title: {
            text: `BTC/USD - Bitfinex`,
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
  }

  private willSetWebSocket = new Promise((resolve, reject) => {
    const webSocket = new WebSocket('wss://api.bitfinex.com/ws');

    if (webSocket) {
      webSocket.onopen = () => {
        webSocket.send(JSON.stringify({
          'event': 'subscribe',
          'channel': 'trades',
          'pair': 'BTCUSD'
        }));
      };

      webSocket.onmessage = (message) => {
        const response = JSON.parse(message.data);
        if (response[1] === 'te') {
          this.buffer['price'].push({
            x: response[3] * 1000,
            y: response[4]
          });

          this.buffer['amount'][response[5] > 0 ? 0 : 1].push({
            x: response[3] * 1000,
            y: Math.abs(response[5])
          });
        }
      };

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
