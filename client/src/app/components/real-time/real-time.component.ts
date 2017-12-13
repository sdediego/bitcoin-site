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
  selector: 'app-real-time',
  templateUrl: './real-time.component.html',
  styleUrls: ['./real-time.component.css']
})
export class RealTimeComponent implements OnInit, AfterViewInit {

  //@ViewChild('baseChart') chart: BaseChartDirective;
  @ViewChild('baseChart') public priceChartCanvas: ElementRef;
  @ViewChild('baseChart2') public amountChartCanvas: ElementRef;
  private ctx: CanvasRenderingContext2D;
  private ctx2: CanvasRenderingContext2D;

  public user: IUser;
  public btcPrice: Array<number>;
  public btcAmount: Array<number>;
  public timestamp: Array<any>;
  public error: string;
  // Buffer variables
  private buffer: object = {};

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
    console.log('Dentro de ngAfterViewInit');
    this.getTransactions().subscribe(
      response => {
        this.setWebSocket().then(result => {
          //console.log('Ahora toca pintar: ', this.buffer);
          //console.log(this.priceChartCanvas);
          const canvasElement: HTMLCanvasElement = this.priceChartCanvas.nativeElement;
          this.ctx = canvasElement.getContext("2d");
          //console.log(canvasElement);
          //console.log(this.ctx);

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
          console.log(canvasElement2);
          console.log(this.ctx2);
          console.log('Buy orders: ', this.buffer['amount'][0]);
          console.log('Sell orders: ', this.buffer['amount'][1]);

          const chartAmount = new Chart(this.ctx2, {
            type: 'bar',
            data: {
              datasets: [{
                data: [],
                label: 'Buy',
                backgoundColor: 'rgb(0, 255, 0)',
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
        console.log('Dentro de getTransactions', response);
        const dataInvTime = response.reverse();
        console.log('Inverse data: ', dataInvTime);
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

        console.log('Initialization: ', this.buffer);
      })
      .catch(error => this.handleError(error));
  }

  private willSetWebSocket = new Promise((resolve, reject) => {
    // Create Pusher object for bitstamp web socket
    const pusher = new Pusher('de504dc5763aeef9ff52', { cluster: 'mt1' });
    console.log('Dentro de willSetWebSocket');
    if (pusher) {
      const channel = pusher.subscribe('live_trades');
      channel.bind('trade', data => {
        this.buffer['price'].push({
          x: data.timestamp * 1000,
          y: data.price
        });
        //console.log(buffer['price']);
        this.buffer['amount'][data.type].push({
          x: data.timestamp * 1000,
          y: data.amount
        });
        console.log('Llenando el buffer: ', this.buffer);
      });
      resolve(this.buffer);
    } else {
      const error = new Error('Web socket failed establishing connection.');
      reject(error);
    }
  });

  private setWebSocket = async (): Promise<any> => {
    console.log('Dentro de setWebSocket');
    return this.willSetWebSocket
      .then(result => {
        console.log('Promesa cumplida: ', result);
        return result;
      })
      .catch(error => this.handleError(error));
  }

}
