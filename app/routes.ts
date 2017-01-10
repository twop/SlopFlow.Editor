import { NodeWorkspaceComponent } from './components/workspace/nodeWorkspace.component';
import { Routes } from '@angular/router';

// import { BookExistsGuard } from './guards/book-exists';

import { FlowWorkspaceComponent } from './components/workspace/flowWorkspace.component';
import { NotFoundPageComponent } from './components/pageNotFound.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';

export const routes: Routes = [
  {
    path: 'workspace',
    component: WorkspaceComponent
  },
  { path: '',   redirectTo: '/workspace', pathMatch: 'full' },
  { path: '**', component: NotFoundPageComponent }
  // {
  //   path: 'flow/:id',
  //   component: FlowWorkspaceComponent
  // },
  // {
  //   path: 'node/:id',
  //   component: NodeWorkspaceComponent
  // },
  // {
  //   path: '**',
  //   component: NotFoundPageComponent
  // }
];