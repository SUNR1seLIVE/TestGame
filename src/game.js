import { Screen } from './screen.js';
import { Loading } from './scenes/loading.js';
import { Menu } from './scenes/menu.js';
import { GameLevel } from './scenes/game-level.js';
import { Scene } from './scene.js';
import { ControlState } from './control-state.js';

export class Game {
  constructor ({width = 640, height = 640} = {}) {
    this.screen = new Screen(width, height);
    this.screen.loadImages({
      orc: 'src/img/orc.png',
      player: 'src/img/player.png',
      title: 'src/img/title.jpg',
      tiles: 'src/img/tiles.png'
    });
    this.control = new ControlState();
    this.scenes = {
      loading: new Loading(this),
      menu: new Menu(this),
      gameLevel: new GameLevel(this)
    };
    this.currentScene = this.scenes.loading;
    this.currentScene.init();
  }

  changeScene(status){
    
    switch (status){
      case Scene.LOADED:
        return this.scenes.menu;
        break;
      case Scene.START_GAME:
        return this.scenes.gameLevel;
        break;
      default:
        return this.scenes.menu;
    }
  }

  frame(time){
    if(this.currentScene.status != Scene.WORKING){
      this.currentScene = this.changeScene(this.currentScene.status);
      this.currentScene.init();
    }
    this.currentScene.render(time);
    requestAnimationFrame(time => this.frame(time));
  }

  run(){
    requestAnimationFrame(time => this.frame(time));
  }
}