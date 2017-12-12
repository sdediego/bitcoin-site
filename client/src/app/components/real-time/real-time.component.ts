import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-real-time',
  templateUrl: './real-time.component.html',
  styleUrls: ['./real-time.component.css']
})
export class RealTimeComponent implements OnInit, AfterViewInit {

  constructor(private elementRef: ElementRef) {
      this.loadScript("http://localhost:3000/javascripts/bitstamp.js");
  }

  ngOnInit() {

   }

   public loadScript(url) {
       console.log('preparing to load...')
       console.log(url);
       let node = document.createElement('script');
       node.src = url;
       node.type = 'text/javascript';
       document.getElementsByTagName('body')[0].appendChild(node);
       console.log('Loaded');
    }
}
