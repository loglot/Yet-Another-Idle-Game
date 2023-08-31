'use strict';

    const canvas = document.getElementById("game_screen");
      const ctx = canvas.getContext("2d");

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const originalWidth = canvas.width;
const originalHeight = canvas.height;
var scaleX = 0;
var scaleY = 0;
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
            resizeCanvasForWindowSize()
            draw.Game()
            await misc.sleep(1000/60)
        }
    }

    function resizeCanvasForWindowSize() {

      // Get the current window dimensions
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
  
      // Calculate the desired width and height based on the window's dimensions
      const desiredWidth = windowWidth;
      const aspectRatio = originalWidth / originalHeight;
      const desiredHeight = desiredWidth / aspectRatio;
  
      // Set the canvas element's width and height
      canvas.width = desiredWidth;
      canvas.height = desiredHeight;
  
      // Resize the canvas drawing area to maintain the aspect ratio
      scaleX = (desiredWidth / originalWidth);
      scaleY = (desiredHeight / originalHeight);
  
      // Apply the scaling transformation to maintain the aspect ratio
      ctx.setTransform(scaleY, 0, 0, scaleX, 0, 0)
  }