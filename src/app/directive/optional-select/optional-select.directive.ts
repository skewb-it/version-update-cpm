import { Directive, HostListener, OnInit, Renderer2, ElementRef, AfterViewInit, NgModule } from '@angular/core';
import { MatSelect } from '@angular/material/select';

@Directive({
  selector: '[optionalSelect]'
})
export class OptionalSelectDirective {

  constructor(
    private matSelect: MatSelect,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
  }

  @HostListener('openedChange', ['$event'])
  onOpenedChange(isOpened: boolean) {

    if (!isOpened || this.matSelect.required) {
      return; //Closing panel, or select is required
    }
    //Manually create a mat option DOM element
    let matOption = this.renderer.createElement("mat-option");
    this.renderer.setAttribute(matOption, 'class', 'mat-option');

    //Bind events to the new mat option
    this.renderer.listen(matOption, 'click', () => {
      this.matSelect.value = "";
      this.matSelect.close();
    });

    //Try to add the new mat option in first position of the list
    let panel = document.querySelector('.mat-select-panel');
    if (!panel) {
      throw "Cannot find mat select panel";
    }
    this.renderer.insertBefore(panel, matOption, panel.firstChild);


  }

}

@NgModule({
  declarations: [OptionalSelectDirective],
  exports: [OptionalSelectDirective]
})

export class OptionalSelectDirectiveModule { }
