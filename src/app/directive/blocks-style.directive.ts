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
  @Output() itemPress = new EventEmitter<number>();
  @Output() itemSelect = new EventEmitter<number>();
  private updateSubscription:Subscription;
  private items:HTMLElement[];
  private index=-1;
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
    this.el.nativeElement.classList.add('block-style');
    this.el.nativeElement.addEventListener('click',this.onClick.bind(this));
  }
  ngAfterViewInit(): void {
    console.log("AfVI");
    this.prepareChild();
  }
  ngOnDestroy(): void {
    if (this.updateSubscription){
      this.updateSubscription.unsubscribe();
    }
    this.el.nativeElement.removeEventListener("click", this.onClick);
  }
  private bubleUp(item:HTMLElement):HTMLElement | null{
    let parent = item.parentElement;
    while(parent && !parent.classList.contains('is-block-style-watch') && !parent.classList.contains('block-style')){
      parent = parent.parentElement;
    }
    if (!parent || parent.classList.contains('block-style')){
      return null;
    }else{
      return parent;
    }
  }
  onClick(event:MouseEvent):void{
    const trg:HTMLElement = event.target as HTMLElement;
    const parent = this.bubleUp(trg);
    if (parent?.parentElement && parent.classList.contains("is-block-style-watch")){
      const index=[...this.items].indexOf(parent);
      if (index>-1){
        this.clearBorder();
        this.index = index;
        this.proceedWithElement();
        this.itemSelect.emit(this.index);
      }
      
    }else{
      console.log("Мимо");
    }
    
  }
  private prepareChild():void{
    if (this.selector){
      this.items = this.el.nativeElement.querySelectorAll(this.selector);
      this.itCnt = this.items.length;
      this.items.forEach(item=>{
        item.classList.add('is-block-style-watch');
        
      })
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
  private clearBorder():void{
    if (this.items.length){
      this.items[this.index].classList.remove('border-danger');
      this.items[this.index].classList.remove('border-3');
    }
  }
  private checkIndex():boolean{
    const tmpIt:HTMLElement[] = this.el.nativeElement.querySelectorAll(this.selector);
    if (this.itCnt !== tmpIt.length){
      this.items = tmpIt;
      this.itCnt = tmpIt.length;
      this.index = 0;
      return true;
    }else{
      return false;
    }
  }
  private leftRight(key:string):void{
    let sendUpdate=false;
    this.clearBorder();
    sendUpdate=this.checkIndex();
    if (key === 'ArrowRight'){
      if (!this.autoInit && !this.index && this.firstPress){
        this.firstPress = false;
      }else{
        this.index++
      }
      sendUpdate=true;
    }else if(key === "ArrowLeft"){
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
    this.proceedWithElement(key === 'ArrowRight');
    this.itemSelect.emit(this.index);
  }

  private upDown(key:string){
    this.checkIndex();
    const trg:HTMLElement = this.items[this.index];
    const wCnt = Math.floor(this.el.nativeElement.clientWidth/trg.offsetWidth);
    const hCnt = Math.floor(this.itCnt / wCnt);
    const y = Math.floor(this.index/wCnt);
    const x = this.index - y*wCnt;
    if (hCnt>1){
      this.clearBorder();
      if (key === 'ArrowUp'){
        
          if (y>0){
            this.index = this.index - wCnt;
          }else{
            this.index = (hCnt-1)*wCnt + x;
          }
      }else{
        if (y<hCnt - 1){
          this.index = this.index + wCnt;
        }else{
          this.index = x;
        }
      }
      this.proceedWithElement();
      this.itemSelect.emit(this.index);
      console.log(wCnt,hCnt);
      console.log(x,y);
    }
  }

  keyUpEvent(e:KeyboardEvent):void{
    if (e.key === 'ArrowRight' || e.key === "ArrowLeft"){
      this.leftRight(e.key);
    }else if ((e.key === 'ArrowUp' || e.key === 'ArrowDown') && this.items.length){
      this.upDown(e.key);
    }else if (e.key ==='Enter'){
      this.itemPress.emit(this.index);
    }
  }
}
