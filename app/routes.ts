import { FlowContainer } from './components/workspace/flow.container';
import { Routes } from '@angular/router';

import { FlowWorkspaceComponent } from './components/workspace/flowWorkspace.component';
import { NotFoundPageComponent } from './components/pageNotFound.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';

export const routes: Routes = 
[
  {
    path: 'workspace',
    component: WorkspaceComponent,
    children:
    [
      { path: 'flow/:id', component: FlowContainer},
    ]
  },
  { path: '',   redirectTo: '/workspace', pathMatch: 'full' },
  { path: '**', component: NotFoundPageComponent }
];