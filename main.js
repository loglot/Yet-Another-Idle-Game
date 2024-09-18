'use strict';

import { Game } from "./lib/imports.js";

var game = new Game()




    function gameLoop() {
      game.keyMan.update()
      game.display.Game()
      game.menu.tick()
      if(game.State == "game"){
        game.player.update()
      }
      if(game.keyMan.wasKeyJustPressed("KeyW") && game.State == "main"){
        game.State = "game"
        game.soundMenu.volume = .15
        game.menu.loadShop()
        if(game.Audios){
          game.soundMenu.play()
        }
        game.player.grow(70)
      //}else if(game.keyMan.wasKeyJustPressed("KeyS") && game.State == "main"){
        //game.State = "settings"
      //}else if(game.keyMan.wasKeyJustPressed("KeyS") && game.State == "settings"){
        //game.State = "main"
      }else if(game.keyMan.wasKeyJustPressed("KeyE") && game.State == "game"){
        game.State = "shop"
      }else if(game.keyMan.wasKeyJustPressed("KeyE") && game.State == "shop"){
        game.State = "game"
            game.display.leave = true
      }
      requestAnimationFrame(gameLoop)
    }
    requestAnimationFrame(gameLoop)

