import { FlowContainer } from './components/workspace/flow.container';
import { NodeWorkspaceComponent } from './components/workspace/nodeWorkspace.component';
import { Routes } from '@angular/router';

// import { BookExistsGuard } from './guards/book-exists';

import { FlowWorkspaceComponent } from './components/workspace/flowWorkspace.component';
import { NotFoundPageComponent } from './components/pageNotFound.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { NodeContainer } from './components/workspace/node.container';

export const routes: Routes = 
[
  {
    path: 'workspace',
    component: WorkspaceComponent,
    children:
    [
      { path: 'flow/:id', component: FlowContainer},
      { path: 'node/:id', component: NodeContainer},
    ]
  },
  { path: '',   redirectTo: '/workspace', pathMatch: 'full' },
  { path: '**', component: NotFoundPageComponent }
];