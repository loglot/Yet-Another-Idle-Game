'use strict';

import { Game } from "./lib/imports.js";

var game = new Game()




    function gameLoop() {
      game.keyMan.update()
      game.display.Game()
      game.player.update()
      if(game.keyMan.wasKeyJustPressed("KeyW") && game.MainMenu){
        game.MainMenu = false
        game.player.grow(70)
      }
      requestAnimationFrame(gameLoop)
    }
    requestAnimationFrame(gameLoop)

    