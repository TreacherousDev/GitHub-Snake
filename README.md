# GitHub-Snake
![12051-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/9b7b12f0-3aaa-4f8c-bde2-f935c91cfeaf)  
A Browser Extension that lets you play Snake on your GitHub Activity    
Get this now for Firefox from the [Mozilla Extension Marketplace](https://addons.mozilla.org/en-US/firefox/addon/github-snake-game/)

## How to Play
The rules of the game are pretty much identical to old-school Snake. Navigate across the board using (T, F, G, H) as directional keys, eat food to grow larger, and avoid hitting walls or your own body. Every once in a while, a high value food will spawn for a limited amount of time that boosts your growth by 5 units once eaten. 

To start a new game, simply refresh the browser page and rerun the extension.


## Building from Source
### For Firefox
1. Clone the repo or download as zip and unpack.
2. Open Firefox and go to `about:debugging#/runtime/this-firefox`
3. Click on `Load Temporary Add-On`
4. Select the `manifest.json` that is included in the downloaded folder
5. Open a GitHub profile tab and activate the extension


### For Chromium
Chrome Web Store demands that I pay them 5$ to publish my add-on. Hell no.  
With that said, here is how to build it yourself:
1. Clone the repo or download as zip and unpack.
2. Open your Chromium web browser and click on `Extensions` tab
3. Enable `Developer Mode`
4. Click on `Load Unpacked`
5. Select the folder `GitHub-Snake/GitHub-Snake-Chromium`
6. Open a GitHub profile tab and activate the extension


