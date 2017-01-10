import { Component, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'bc-not-found-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card">
      404: Not Found
      <button role="button" type="button" class="btn btn-secondary btn-sm" routerLink="/">
        <i class="fa icon-home" aria-hidden="true"></i>
        Take Me Home
      </button>
    </div>
  `,
  styles: [`
    :host {
      text-align: center;
    }
  `]
})
export class NotFoundPageComponent { }