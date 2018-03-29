import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-choice',
  templateUrl: './payment-choice.component.html',
  styleUrls: ['./payment-choice.component.css']
})
export class PaymentChoiceComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    document.body.style.backgroundImage = 'url(http://localhost:8080/api/public/file/background_blur.jpg)';
  }

}
