import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const areaCode = "(" + value.slice(0, 3) + ") ";
    const prefix = value.slice(3, 6) + "-";
    const lineNum = value.slice(6);

    return areaCode + prefix + lineNum;
  }

}
