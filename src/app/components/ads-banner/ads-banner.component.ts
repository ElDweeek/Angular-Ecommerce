import { Component } from '@angular/core';

@Component({
  selector: 'ads-banner',
  standalone: true,
  imports: [],
  templateUrl: './ads-banner.component.html',
  styleUrl: './ads-banner.component.scss'
})
export class AdsBannerComponent {
  display: string = 'd-flex bg-dark text-white p-3 justify-content-between justify-content-lg-center align-items-center flex-wrap mt-4 mb-4';
  disappear(){
    this.display = "d-none"
    console.log("pfff");

  }
}
