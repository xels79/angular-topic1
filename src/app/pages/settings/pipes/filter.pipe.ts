import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSearch'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], searchString: string, prop: string): any[] {
    if (Array.isArray(value) && searchString){
      const sVal = new RegExp(searchString, 'i');
      return value.filter( el => sVal.test(el[prop]));
    }
    return Array.isArray( value ) ? value : [];
  }
}
