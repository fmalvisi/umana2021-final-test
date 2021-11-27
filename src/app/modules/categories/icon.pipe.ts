import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'icon'
})
export class IconPipe implements PipeTransform {

  transform(value: string): any {
    if (value === "ciao") {
      const element: HTMLElement = document.getElementById('test') as HTMLElement
      var icon = element.innerHTML = '<img src="https://icons.iconarchive.com/icons/paomedia/small-n-flat/256/sign-check-icon.png" width="20" height="20" alt="una icona">';
      return icon;
    } else {
      return "La pipe NON funziona!"
    }
  }

}
