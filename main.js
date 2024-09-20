'use strict';

import { Game } from "./lib/imports.js";

var game = new Game()

// const perfectFrameTime = 1000 / 60;
// var fps = 0
// let deltaTime = 0;
// let lastTimestamp = 0;
// let lastFrameMenu = true

let msPrev = window.performance.now()
const targetFPS = 60
const msPerFrame = 1000 / targetFPS


    function gameLoop() {
      requestAnimationFrame(gameLoop)

      const msNow = window.performance.now()
      const msPassed = msNow - msPrev
    
      if (msPassed < msPerFrame) return

      const excessTime = msPassed % msPerFrame
      msPrev = msNow - excessTime


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
    }
    requestAnimationFrame(gameLoop)

