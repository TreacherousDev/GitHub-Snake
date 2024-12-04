browser.browserAction.onClicked.addListener((tab) => {
  if (tab.url.includes("github.com")) {
    
    browser.tabs.executeScript({
      file: "snake.js"
    });
  } else {
    alert("This extension only works on GitHub!");
  }
});
