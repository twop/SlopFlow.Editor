import { Component, Input, EventEmitter, Output } from '@angular/core';

export interface DropDownItem
{
  id: number,
  name: string
}

@Component({
  selector: "element-picker",
  template: `
  <div *ngIf="items">
    <input 
      ng2-auto-complete
      [source]="items" 
      (valueChanged)="onInputChanged($event)"
      [list-formatter]="formatter"
      placeholder="Pick flow"/> 
  </div>
`
})
export class ElementPickerComponent
{
  @Input() items: DropDownItem[] = null;

  @Output() picked = new EventEmitter<number>();

  onInputChanged(newVal: DropDownItem)
  {
    if (newVal && newVal.name)
    { 
      console.log("value is changed to ", newVal); 
      this.items = null;
      this.picked.emit(newVal.id);
    }
    else 
    {
      console.log("temp value ", newVal);
    }
  }

  formatter = (item: DropDownItem): string => `<span>${item.name}</span>`;
}