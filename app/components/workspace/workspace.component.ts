import { Component } from "@angular/core";

@Component({
  styleUrls: [`app/components/workspace/workspace.css`],
  template: `
    <div class="card card-block">
      <router-outlet></router-outlet>
    </div>`
})
export class WorkspaceComponent { }
