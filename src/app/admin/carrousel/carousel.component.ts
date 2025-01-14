import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-carousel',
  imports: [CommonModule],  
  standalone: true, 
  templateUrl: './carousel.component.html',

})
export class CarouselComponent {
  slides = [
    { src: 'dist/img/lo.png', alt: 'Image 1' },
    { src: 'dist/img/logi.png', alt: 'Image 2' },
    { src: 'dist/img/log.png', alt: 'Image 3' },
    { src: 'dist/img/adm.png', alt: 'Image 4' }
  ];

  goToSlide(index: number) {
    const carouselElement = document.querySelector('#carouselExampleCaptions') as HTMLElement;
    const carousel = new bootstrap.Carousel(carouselElement);
    carousel.to(index);
  }
}


@Component({
  selector: 'app-carousel1',
  imports: [CommonModule],  
  standalone: true, 
  templateUrl: './carousel.component.html',

})
export class Carousel1Component {
  slides = [
    { src: 'dist/img/l.png', alt: 'Image 1' },
    { src: 'dist/img/logi.png', alt: 'Image 2' },
    { src: 'dist/img/log.png', alt: 'Image 3' },
    { src: 'dist/img/adm.png', alt: 'Image 4' }
  ];

  goToSlide(index: number) {
    const carouselElement = document.querySelector('#carouselExampleCaptions') as HTMLElement;
    const carousel = new bootstrap.Carousel(carouselElement);
    carousel.to(index);
  }
}