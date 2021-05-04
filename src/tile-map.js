import { Sprite } from './sprite.js';

export class TileMap extends Sprite{
  constructor(props){
    super(props);
    this.hitboxes = props.hitboxes || [];
  }
}