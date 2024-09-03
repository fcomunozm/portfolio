import { Component } from '@angular/core';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.css'
})
export class ProyectosComponent {
  currentIndex = 0;
  totalProjects = 2;

  moveCarousel(direction: number) {
    const track = document.querySelector('.carousel-track') as HTMLElement;
    const projects = document.querySelectorAll('.proyecto') as NodeListOf<HTMLElement>;
    const projectWidth = projects[0].offsetWidth;

    this.currentIndex += direction;

    if (this.currentIndex < 0) {
      this.currentIndex = this.totalProjects - 1;
    } else if (this.currentIndex >= this.totalProjects) {
      this.currentIndex = 0;
    }

    track.style.transform = `translateX(-${this.currentIndex * projectWidth}px)`;
  }


  //Web Paises
  toRepositorioPaises() {
    window.open('https://github.com/fcomunozm/WebAppPaises', '_blank');
  }

  toWebPaises() {
    window.open('https://webpaises.netlify.app/countries/by-capital', '_blank');
  }

  //Big Bang comics
  toRepositorioBBComics() {
    window.open('https://github.com/fcomunozm/proyectoFP', '_blank');
  }

  toWebBBComics() {
    window.open('https://big-bang-comics.netlify.app/home', '_blank');
  }
}



