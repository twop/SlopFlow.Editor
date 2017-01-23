import { fromEvent } from 'rxjs/observable/fromEvent';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/takeUntil';

import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { Point } from '../geometry/point';

@Directive({ selector: '[my-draggable]' })
export class DraggableDirective 
{
  @Input() startPoint: ()=>Point = null;

  @Output() start: EventEmitter<Point> = new EventEmitter();
  @Output() drag: Observable<Point> = null;
  @Output() drop: EventEmitter<any> = new EventEmitter();

  constructor(elemRef: ElementRef)
  {
    const target: HTMLElement = elemRef.nativeElement;

    const mouseup: Observable<MouseEvent> = fromEvent(document, 'mouseup');
    const mousemove: Observable<MouseEvent> = fromEvent(document, 'mousemove');
    const mousedown: Observable<MouseEvent> = fromEvent(target, 'mousedown');

    this.drag = mousedown.flatMap((md: MouseEvent) =>
    {
      //console.log("start ", this.startPoint);
      const elemStart = this.startPoint();
      
      const startX = md.clientX;
      const startY = md.clientY;

      
      this.start.emit(elemStart);

      return mousemove.map((mm: MouseEvent) =>
      {
        //console.log("dragging ", mm);
        mm.preventDefault();
        return elemStart.copy().moveBy(mm.clientX - startX, mm.clientY - startY);
      }).takeUntil(mouseup).finally(()=> this.drop.emit());
    });
  }
}