import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  AfterViewInit,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Directive({
  selector: '[appBlocksStyle]',
  host:{
    '(document:keyup)': 'keyUpEvent($event)'
  }
})
export class BlocksStyleDirective implements AfterViewInit, OnInit, OnDestroy{
  @Input() selector:string;
  @Input() autoInit:boolean=false;
  @Input() updater:Observable<{action:string,value:string | number | undefined}>;
  @Input() setIndex:number=-1;
  @Output() renderComplete = new EventEmitter();
  @Output() itemSelect = new EventEmitter<number>();
  private updateSubscription:Subscription;
  private items:HTMLElement[];
  private index=0;
  private firstPress=true;
  private itCnt=0;
  constructor(private el:ElementRef) { }
  ngOnInit(): void {
    if (this.updater){
      this.updateSubscription = this.updater.subscribe(data=>{
        console.log("derective update");

        setTimeout(()=>{
          console.log(`Derictive "appBlocksStyle" update ask. action: "${data.action}"`);
          switch(data.action){
            default:
              this.prepareChild();
              break
          }
        });
      });
    }
  }
  ngAfterViewInit(): void {
    console.log("AfVI");
    this.prepareChild();
  }
  ngOnDestroy(): void {
    if (this.updateSubscription){
      this.updateSubscription.unsubscribe();
    }
  }
  private prepareChild():void{
    if (this.selector){
      this.items = this.el.nativeElement.querySelectorAll(this.selector);
      this.itCnt = this.items.length;
      if (this.autoInit){
        this.firstPress = false;
        // console.log("index",this.index);
        if (this.setIndex>-1){
          this.index = this.setIndex;
        }
        if (this.index<0 || this.index>this.itCnt-1){
          this.index = 0;
        }
        if (this.items){
          this.proceedWithElement();
        }
      }
    }else{
      console.error("appBlocksStyle - не передан selector");
    }
  }
  private proceedWithElement(isRightPress:boolean=true):void{
    const prEl:HTMLElement=this.el.nativeElement.parentElement as HTMLElement;
    if (!prEl) return;
    const childRect = this.items[this.index].getBoundingClientRect();
    const parentRect = prEl.getBoundingClientRect();
    const scroll = childRect.top - parentRect.top;
    this.items[this.index].classList.add('border-danger');
    this.items[this.index].classList.add('border-3');
    window.scroll({top:scroll,left:(isRightPress?1:-1)*window.scrollX,behavior:'smooth'});

  }
  keyUpEvent(e:KeyboardEvent):void{
    if (e.key === 'ArrowRight' || e.key === "ArrowLeft"){
      let sendUpdate=false;
      const tmpIt:HTMLElement[] = this.el.nativeElement.querySelectorAll(this.selector);
      this.items[this.index].classList.remove('border-danger');
      this.items[this.index].classList.remove('border-3');
      if (this.itCnt !== tmpIt.length){
        this.items = tmpIt;
        this.itCnt = tmpIt.length;
        this.index = 0;
        sendUpdate=true;
      }
      if (e.key === 'ArrowRight'){
        if (!this.autoInit && !this.index && this.firstPress){
          this.firstPress = false;
        }else{
          this.index++
        }
        sendUpdate=true;
      }else if(e.key === "ArrowLeft"){
        this.index--;
        sendUpdate=true;
      }
      if (this.index<0){
        this.index=this.items.length-1;
        sendUpdate=true;
      }else if(this.index > this.items.length-1){
        this.index = 0;
        sendUpdate=true;
      }
      // console.log(this.items.length);
      this.proceedWithElement(e.key === 'ArrowRight');
      this.itemSelect.emit(this.index);
    }
  }
}
