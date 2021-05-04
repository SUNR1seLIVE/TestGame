import { Level1 } from '../maps/level1.js';
import { Scene } from '../scene.js';
import { SpriteSheet } from '../sprite-sheet.js';

export class GameLevel extends Scene {
  constructor(game){
    super(game);
    this.tiles = new SpriteSheet({
      imageName: 'tiles',
      imageWidth: 640,
      imageHeight: 640
    });
    this.grass = this.tiles.getSprite(11);
    this.grass.setXY(10, 10);
    this.orcTiles = new SpriteSheet({
      imageName: 'orc',
      imageWidth: 832,
      imageHeight: 1344
    });
    this.orc = this.orcTiles.getAnimation([1, 2, 3, 4, 5, 6, 7], 300);
  }

  init(){
    super.init();
    const mapData = Level1;
    this.map = this.game.screen.createMap('level1', mapData, this.tiles);
  }

  update(time){
    this.orc.update(time);
  }

  render(time){
    this.update(time);
    this.game.screen.fill('#000000');
    this.game.screen.drawSprite(this.map);
    // this.game.screen.drawSprite(this.grass);
    this.game.screen.drawSprite(this.orc);
    super.render(time);
  }
}