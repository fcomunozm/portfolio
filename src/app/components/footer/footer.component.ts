import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  openGitHub() {
    window.open('https://github.com/fcomunozm', '_blank');
  }

  openLinkedin() {
    window.open('https://www.linkedin.com/in/fcomunozm/', '_blank');
  }

  downloadPDF() {
    const link = document.createElement('a');
    link.href = 'cv-FranciscoMunoz-portfolio.pdf';
    link.download = 'cv-FranciscoMunoz.pdf';
    link.click();
  }
}
