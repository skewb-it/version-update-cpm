import { Directive, ElementRef, HostListener, Input, NgModule } from '@angular/core';
import { HelperTextPopoverService } from 'src/app/services/helper-text-popover.service';

@Directive({
  selector: '[appHelperTextPopover]'
})
export class HelperTextPopoverDirective {

  @Input() helperTextData: string = '';
  private id: string;

  constructor(
    private helperTextPopoverService: HelperTextPopoverService,
    private eleRef: ElementRef
  ) { }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.helperTextPopoverService.shouldHelperTextEnable && this.helperTextData != null) {
      let id = Math.random();
      this.helperTextPopoverService.push({
        id: id,
        eleRef: this.eleRef,
        helperTextData: this.helperTextData
      });
      this.eleRef.nativeElement.className += " helper-text-cursor";
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.destroy();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  destroy(): void {
    const idx = this.helperTextPopoverService.findIndex(this.id);

    this.helperTextPopoverService.splice(idx);
  }

}

@NgModule({
  declarations: [HelperTextPopoverDirective],
  exports: [HelperTextPopoverDirective]
})

export class HelperTextPopoverDirectiveModule { }
