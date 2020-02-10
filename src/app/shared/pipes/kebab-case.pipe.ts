import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kebabCase'
})
export class KebabCasePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return value.toString().toLowerCase().replace(' ', '-');
  }

}
