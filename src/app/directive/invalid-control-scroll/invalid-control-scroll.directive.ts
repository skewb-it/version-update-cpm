import {
    Directive,
    HostListener,
    ElementRef,
    Injector,
    Optional
  } from "@angular/core";
  import { FormGroupDirective } from "@angular/forms";
  import { fromEvent } from "rxjs";
  import { debounceTime, take } from "rxjs/operators";
    
  @Directive({
    selector: "[appInvalidControlScroll]"
  })
  export class InvalidControlScrollDirective {
      
  
    constructor(
      private el: ElementRef,
      private formGroupDir: FormGroupDirective
    ) {}
  
    @HostListener("ngSubmit") onSubmit() {
      if (this.formGroupDir.control.invalid) {
        this.scrollToFirstInvalidControl();
      }
    }
  
    private scrollToFirstInvalidControl() {
      const firstInvalidControl: HTMLElement = this.el.nativeElement.querySelector(
        ".ng-invalid"
      );

      this.scrollTo(firstInvalidControl);
    }
  
    scrollTo(el: Element): void {
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
  