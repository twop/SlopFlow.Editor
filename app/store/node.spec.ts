import { INode, IPort } from './node.types';
import { assign } from './store';

describe("some", ()=>
  {
    it('true should be true', ()=>
    {
      const node: INode = {id: 1, name: 'name', ports: null };

      const mutated:INode = assign({...node}, {id:2});

      expect(node.name).toEqual(mutated.name);
    });
  }
);
