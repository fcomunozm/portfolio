import { ViewportScroller } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements  OnInit {
  @ViewChild('name') nameElement!: ElementRef;
  @ViewChildren('cardSpan') cardSpans!: QueryList<ElementRef>;
  @ViewChildren('cardSpan2') cardSpans2!: QueryList<ElementRef>;
  @ViewChild('proyectos') proyectosElement!: ElementRef;

  textos: string[] = ['web', 'front-end'];
  textoActual: string = '';
  indexTexto: number = 0;
  escribiendo: boolean = true;
  charIndex: number = 0;
  velocidadEscritura: number = 250;
  velocidadBorrado: number = 75;
  pausaEntreTextos: number = 1000;

  constructor(private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
    this.escribirTexto();
  }

  escribirTexto() {
    if (this.charIndex < this.textos[this.indexTexto].length) {
      this.textoActual += this.textos[this.indexTexto].charAt(this.charIndex);
      this.charIndex++;
      setTimeout(() => this.escribirTexto(), this.velocidadEscritura);
    } else {
      setTimeout(() => this.borrarTexto(), this.pausaEntreTextos);
    }
  }

  borrarTexto() {
    if (this.charIndex > 0) {
      this.textoActual = this.textoActual.slice(0, -1);
      this.charIndex--;
      setTimeout(() => this.borrarTexto(), this.velocidadBorrado);
    } else {
      this.indexTexto = (this.indexTexto + 1) % this.textos.length;
      setTimeout(() => this.escribirTexto(), this.pausaEntreTextos);
    }
  }

  @HostListener('window:wheel', ['$event'])
  onWheel(event: WheelEvent): void {
    if (event.deltaY > 0) {
      this.scrollToProyectos();
    }
  }

  scrollToProyectos() {
    if (this.proyectosElement) {
      this.proyectosElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  openGitHub() {
    window.open('https://github.com/fcomunozm', '_blank');
  }

  openLinkedin() {
    window.open('https://www.linkedin.com/in/fcomunozm/', '_blank');
  }

  downloadPDF() {
    const link = document.createElement('a');
    link.href = 'cv-FranciscoMunoz-portfolio.pdf'; // Ruta del PDF en la carpeta 'assets'
    link.download = 'cv-FranciscoMunoz.pdf'; // Nombre que tendrá el archivo descargado
    link.click();
  }

  navigateTo(fragment: string): void {
    this.viewportScroller.scrollToAnchor(fragment);
  }
}
