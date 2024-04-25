import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appMiDirectiva]',
  standalone: true
})
export class MiDirectivaDirective {
audio=new Audio();
  constructor(private el:ElementRef) { }

  @HostListener('mouseover') onMouseOver() {
    this.audio.src = "../../../../assets/button.wav";
    this.audio.load();
    this.audio.play();
  }
}
