import { Component } from '@angular/core';

@Component({
  selector: 'app-particles',
  templateUrl: './particles.component.html',
  styleUrl: './particles.component.css'
})
export class ParticlesComponent {
  particles = new Array(10);
}
