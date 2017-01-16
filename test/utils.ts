import { IFlow, ElementType } from '../app/store/flow.types';


export const createFlow = (props: Partial<IFlow> = {}): IFlow =>
{
  return {
    type: ElementType.Flow,
    id: 1,
    name: 'name',
    ports: [],
    elementLinks: [],
    elements: [],
    portLinks: [],
    ...props
  };
}