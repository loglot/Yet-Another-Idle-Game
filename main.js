'use strict';

import { Game } from "./lib/imports.js";

var game = new Game()




    function gameLoop() {
      game.keyMan.update()
      game.display.Game()
      if(!game.MainMenu){
        game.player.update()
      }
      if(game.keyMan.wasKeyJustPressed("KeyW") && game.MainMenu && game.MenuState == "main"){
        game.MainMenu = false
        game.soundMenu.volume = .15
        if(game.Audios){
          game.soundMenu.play()
        }
        game.player.grow(70)
      }else if(game.keyMan.wasKeyJustPressed("KeyS") && game.MainMenu && game.MenuState == "main"){
        game.MenuState = "settings"
      }else if(game.keyMan.wasKeyJustPressed("KeyS") && game.MainMenu && game.MenuState == "settings"){
        game.MenuState = "main"
      }else if(game.keyMan.wasKeyJustPressed("ArrowUp") && game.MainMenu && game.MenuState == "settings"){
        if(game.SettingSelect > 0){
          game.SettingSelect -= 1
        }
      }else if(game.keyMan.wasKeyJustPressed("ArrowDown") && game.MainMenu && game.MenuState == "settings"){
        
        if(game.SettingSelect < 3){
          game.SettingSelect += 1
        }
      }else if(game.keyMan.wasKeyJustPressed("ArrowLeft") && game.MainMenu && game.MenuState == "settings"){
        if(game.SettingSelect == 0){
          game.Style = !game.Style
        }
        if(game.SettingSelect == 1){
          game.Grow = !game.Grow
        }
        if(game.SettingSelect == 2){
          game.SpeedSelect--
          if(game.SpeedSelect < 0){
            game.SpeedSelect = 4
          }
        }
        if(game.SettingSelect == 3){
          game.Audios = !game.Audios
        }
      }else if(game.keyMan.wasKeyJustPressed("ArrowRight") && game.MainMenu && game.MenuState == "settings"){
          if(game.SettingSelect == 0){
            game.Style = !game.Style
          }
          if(game.SettingSelect == 1){
            game.Grow = !game.Grow
          }
          if(game.SettingSelect == 2){
            game.SpeedSelect++
            if(game.SpeedSelect > 4){
              game.SpeedSelect = 0
            }
          }
          if(game.SettingSelect == 3){
            game.Audios = !game.Audios
          }
        
      }
      console.log(game.MenuState)
      requestAnimationFrame(gameLoop)
    }
    requestAnimationFrame(gameLoop)

    