'use strict';

import { Game } from "./lib/imports.js";

var game = new Game()


var scaleX = 0;
var scaleY = 0;


    function gameLoop() {
      // keyManager.doActionsFromKeyInput();
      // keyManager.onTick();
      // resizeCanvasForWindowSize()
      game.display.Game()
      requestAnimationFrame(gameLoop)
    }
    
    requestAnimationFrame(gameLoop)

    