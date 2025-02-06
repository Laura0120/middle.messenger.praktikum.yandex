import render from '../helpers/render';
import { BlockClass, BlockProps } from './Block';
import { isEqual } from '../helpers/isEqual';

export class Route {
  protected _pathname: string | null = null;

  protected _blockClass: BlockClass;

  protected _props: BlockProps & { rootQuery: string };

  constructor(pathname: string, view: BlockClass, props: BlockProps & { rootQuery: string }) {
    this._pathname = pathname;
    this._blockClass = view;
    this._props = props;
  }

  match(pathname: string): boolean {
    return isEqual(pathname, this._pathname);
  }

  render(props?: BlockProps) {
    render(this._props.rootQuery, new this._blockClass(props ?? {}));
  }
}
