import { fromEvent } from 'rxjs/observable/fromEvent';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/takeUntil';

import { Directive, ElementRef, Input, Output } from '@angular/core';
import { Point } from '../geometry/point';

@Directive({ selector: '[my-draggable]' })
export class DraggableDirective 
{
  @Input() start: ()=>Point = null;
  @Output() mousedrag: Observable<Point> = null;

  constructor(elemRef: ElementRef)
  {
    const target: HTMLElement = elemRef.nativeElement;

    const mouseup: Observable<MouseEvent> = fromEvent(document, 'mouseup');
    const mousemove: Observable<MouseEvent> = fromEvent(document, 'mousemove');
    const mousedown: Observable<MouseEvent> = fromEvent(target, 'mousedown');

    this.mousedrag = mousedown.flatMap((md: MouseEvent) =>
    {
      console.log("start ", this.start);
      const elemStart = this.start();

      const startX = md.clientX;
      const startY = md.clientY;

      console.log("start dragging elem ", elemStart);

      return mousemove.map((mm: MouseEvent) =>
      {
        //console.log("dragging ", mm);
        mm.preventDefault();
        return elemStart.copy().moveBy(mm.clientX - startX, mm.clientY - startY);
      }).takeUntil(mouseup);
    });
  }
}