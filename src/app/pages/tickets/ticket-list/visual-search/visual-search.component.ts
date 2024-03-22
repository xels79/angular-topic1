import { Component, OnInit, OnChanges, Input } from '@angular/core';
@Component({
  selector: 'app-visual-search',
  templateUrl: './visual-search.component.html',
  styleUrls: ['./visual-search.component.scss'],
})
export class VisualSearchComponent implements OnInit, OnChanges{
  @Input() value:string;
  @Input() search:string;
  startPart:string;
  middlePart:string;
  endPart:string;
  constructor() { }

  ngOnInit(): void {
    this.search = this.search || '';
    this.value = this.value || '';
  }
  ngOnChanges():void{
    this.startPart='';
    this.middlePart='';
    this.endPart='';
    this.search = this.search || '';
    const pos=this.value.toLowerCase().indexOf(this.search.toLowerCase());
    if (pos===-1){
      this.startPart = this.value;
    }else{
      if (pos === 0){
        this.middlePart = this.value.substring(0,this.search.length);
        if (this.value.length>this.search.length){
          this.endPart = this.value.substring(this.search.length);
        }
      }else{
        this.startPart = this.value.substring(0,pos);
        this.middlePart = this.value.substring(pos,pos+this.search.length)
        if (this.value.length > this.search.length + pos){
          this.endPart = this.value.substring(pos+this.search.length);
        }
      }
    }
  }

}
