'use strict';

    const canvas = document.getElementById("game_screen");
      const ctx = canvas.getContext("2d");

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
      window.requestAnimationFrame(gameLoop)

    // Worry about later
      document.addEventListener('keydown', (event) => {
        var code = event.code;
        keyManager.setKeyPressed(code, true)
      }, false);

    document.addEventListener('keyup', (event) => {
        var code = event.code;
        keyManager.setKeyPressed(code, false)
    }, false);


    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// library
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    async function gameLoop() {
        while(true) {
            keyManager.doActionsFromKeyInput();
            keyManager.onTick();
            draw.Game()
            await misc.sleep(1000/60)
        }
    }