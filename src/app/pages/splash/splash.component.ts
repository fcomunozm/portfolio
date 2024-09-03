import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationBuilder, AnimationPlayer, style, animate } from '@angular/animations';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit {
  @ViewChild('partA', { static: true }) partA: ElementRef | undefined;
  @ViewChild('partB', { static: true }) partB: ElementRef | undefined;
  @ViewChild('partC', { static: true }) partC: ElementRef | undefined;
  @ViewChild('partD', { static: true }) partD: ElementRef | undefined;
  @ViewChild('boxInicio', { static: true }) boxInicio: ElementRef | undefined;

  duration = 1000; // Duración de cada animación

  constructor(private router: Router, private builder: AnimationBuilder) {}

  ngOnInit() {
    // Espera 3 segundos antes de empezar la animación de partA
    setTimeout(() => {
      this.animatePart(this.partA, 'translateX(100%)', this.duration, () => {
        this.addClass(this.partA, 'hide');
      }, (playerA) => {
        setTimeout(() => {
          this.animatePart(this.partB, 'translateX(100%)', this.duration, () => {
            this.addClass(this.partB, 'hide');
          }, (playerB) => {
            setTimeout(() => {
              this.animatePart(this.partC, 'translateX(100%)', this.duration, () => {
                this.addClass(this.partC, 'hide');
              }, (playerC) => {
                setTimeout(() => {
                  this.animatePart(this.partD, 'translateX(100%)', this.duration, () => {
                    this.addClass(this.partD, 'hide');
                    this.animateBoxInicio(); // Desplaza la caja de inicio
                  });
                }, this.duration / 2);
              });
            }, this.duration / 2);
          });
        }, this.duration / 2);
      });
    }, 3000); // 3 segundos de delay antes de comenzar
  }

  animatePart(
    element: ElementRef | undefined,
    transform: string,
    duration: number,
    onDone?: () => void,
    onStart?: (player: AnimationPlayer) => void
  ) {
    const animation = this.builder.build([
      style({ transform: 'scale(1)', opacity: 1 }),
      animate(`${duration}ms ease`, style({ transform, opacity: 0 }))
    ]);

    if (element) {
      const player = animation.create(element.nativeElement);
      if (onStart) {
        onStart(player);
      }
      player.play();
      player.onDone(() => {
        if (onDone) {
          onDone();
        }
      });
    }
  }

  animateBoxInicio() {
    if (this.boxInicio) {
      this.animatePart(this.boxInicio, 'translateX(100%)', this.duration, () => {
        this.router.navigate(['/main']);
      });
    }
  }

  addClass(element: ElementRef | undefined, className: string) {
    if (element) {
      element.nativeElement.classList.add(className);
    }
  }
}
