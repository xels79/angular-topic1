import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  AfterViewInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';

@Directive({
  selector: '[appBlocksStyle]',
  host:{
    '(document:keyup)': 'keyUpEvent($event)'
  }
})
export class BlocksStyleDirective implements AfterViewInit, OnChanges{
  @Input() selector:string;
  @Input() autoInit:boolean=false;
  @Output() renderComplete = new EventEmitter();

  private items:HTMLElement[];
  private index=0;
  private firstPress=true;
  constructor(private el:ElementRef) { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("oncgh");
  }
  ngAfterViewInit(): void {
    if (this.selector){
      this.items = this.el.nativeElement.querySelectorAll(this.selector);
      if (this.autoInit){
        this.firstPress = false;
        this.proceedWithElement();
      }
    }else{
      console.error("appBlocksStyle - не передан selector");
    }
  }
  private proceedWithElement(isRightPress:boolean=true):void{
    const prEl:HTMLElement=this.el.nativeElement.parentElement as HTMLElement;
    const childRect = this.items[this.index].getBoundingClientRect();
    const parentRect = prEl.getBoundingClientRect();
    const scroll = childRect.top - parentRect.top;
    this.items[this.index].classList.add('border-danger');
    this.items[this.index].classList.add('border-3');
    window.scroll({top:scroll,left:(isRightPress?1:-1)*window.scrollX,behavior:'smooth'});
  }
  keyUpEvent(e:KeyboardEvent):void{
    if (e.key === 'ArrowRight' || e.key === "ArrowLeft"){
      this.items[this.index].classList.remove('border-danger');
      this.items[this.index].classList.remove('border-3');
      if (e.key === 'ArrowRight'){
        if (!this.autoInit && !this.index && this.firstPress){
          this.firstPress = false;
        }else{
          this.index++
        }
      }else if(e.key === "ArrowLeft"){
        this.index--;
      }
      if (this.index<0){
        this.index=this.items.length-1;
      }else if(this.index > this.items.length-1){
        this.index = 0;
      }
      console.log(this.items.length);

      this.proceedWithElement(e.key === 'ArrowRight');
    }
  }
}
