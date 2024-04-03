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
    let tabInddex=1;
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
    document.querySelectorAll('[tabindex]').forEach(item=>{
      const tIndex  =item.getAttribute('tabindex');
      if (tIndex!==null && +tIndex>=tabInddex){
        tabInddex++;
      }
    });
    console.log('tabIndex',tabInddex);
    this.el.nativeElement.setAttribute('tabindex', tabInddex);
    this.el.nativeElement.classList.add('block-style');
    this.el.nativeElement.addEventListener('click',this.onClick.bind(this));
    this.el.nativeElement.addEventListener('focus',this.onFocus.bind(this));
    this.el.nativeElement.addEventListener('blur',this.onBlure.bind(this));
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
    this.el.nativeElement.removeEventListener("focus", this.onFocus);
    this.el.nativeElement.removeEventListener("blur", this.onBlure);
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
  onFocus(event:FocusEvent):void{
    console.log(event);
    const item = this.el.nativeElement.querySelector('.border-secondary');
    this.el.nativeElement.classList.add('has-focus');
    if (item){
      item.classList.remove('border-secondary');
      item.classList.add('border-danger');
      this.proceedWithElement();
    }
  }
  onBlure(event:FocusEvent):void{
    console.log('blur');
    const item = this.el.nativeElement.querySelector('.border-danger');
    const firstTab = document.querySelector('[tabindex="1"]') as HTMLElement;
    this.el.nativeElement.classList.remove('has-focus');
    if (item){
      item.classList.remove('border-danger');
      item.classList.add('border-secondary');
    }
    console.log(firstTab);
    if (firstTab){
      firstTab.focus();
    }
  }
  onClick(event:MouseEvent):void{
    const item = this.bubleUp(event.target as HTMLElement);
    if (item?.parentElement && item.classList.contains("is-block-style-watch")){
      const index=[...this.items].indexOf(item);
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
    if (this.el.nativeElement.classList.contains('has-focus')){
      this.items[this.index].classList.add('border-danger');
    }else{
      this.items[this.index].classList.add('border-secondary');
    }
    this.items[this.index].classList.add('border-3');
    window.scroll({top:scroll,left:(isRightPress?1:-1)*window.scrollX,behavior:'smooth'});

  }
  private clearBorder():void{
    if (this.items.length){
      this.items[this.index].classList.remove('border-danger');
      this.items[this.index].classList.remove('border-secondary');
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
        this.index++;
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
    if (sendUpdate){
      this.proceedWithElement(key === 'ArrowRight');
      this.itemSelect.emit(this.index);
    }
  }

  private upDown(key:string){
    this.checkIndex();
    const trg:HTMLElement = this.items[this.index];
    const wCnt = Math.floor(this.el.nativeElement.clientWidth/trg.offsetWidth);
    const hCnt = Math.ceil(this.itCnt / wCnt);
    const y = Math.floor(this.index/wCnt);
    const x = this.index - y*wCnt;
    console.log("UD",wCnt,hCnt,x,y);
    if (hCnt>0){
      this.clearBorder();
      if (key === 'ArrowUp'){
          if (this.index - wCnt > -1){
            this.index = this.index - wCnt;
          }else if ((hCnt - 1) * wCnt + x < this.itCnt){
            this.index = (hCnt - 1) * wCnt + x;
            console.log(this.itCnt,this.index);
          }
      }else{
        if (this.index + wCnt < this.itCnt){
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
    if (this.el.nativeElement.classList.contains('has-focus')){
      if (e.key === 'ArrowRight' || e.key === "ArrowLeft"){
        this.leftRight(e.key);
      }else if ((e.key === 'ArrowUp' || e.key === 'ArrowDown') && this.items.length){
        this.upDown(e.key);
      }else if (e.key ==='Enter'){
        this.itemPress.emit(this.index);
      }
    }
  }
}
