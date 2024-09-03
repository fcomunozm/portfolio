import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  isSticky: boolean = false;

  constructor() {}

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    const scrollPosition = window.scrollY;
    const homeElement = document.querySelector('#home') as HTMLElement;

    if (homeElement) {
      const homeRect = homeElement.getBoundingClientRect();
      const margin = window.innerHeight * 0.2;
      this.isSticky = scrollPosition > (homeRect.bottom + margin);
    }
  }

  navigateTo(fragment: string): void {
    const element = document.getElementById(fragment);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
