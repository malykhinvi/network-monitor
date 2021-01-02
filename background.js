chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    chrome.storage.local.get(['counter'], function (storage) {
      const newCounter = String(Number(isFinite(storage.counter) ? storage.counter : 0) + 1);
      chrome.storage.local.set({counter: newCounter});
    });
    return {cancel: false};
  },
  {urls: ['<all_urls>']},
  ['extraHeaders']
);

const colors = [
  {from: 0, color: '#47ab04'},
  {from: 10, color: '#d4740b'},
  {from: 50, color: '#ff5252'},
]

function getColor(counter) {
  let color;
  let colorIndex = 0;
  while (colorIndex < colors.length && counter >= colors[colorIndex].from) {
    color = colors[colorIndex].color;
    colorIndex++;
  }
  return color
}

chrome.storage.onChanged.addListener(function (changes) {
  if ('counter' in changes) {
    chrome.browserAction.setBadgeText({text: changes.counter.newValue});
    chrome.browserAction.setBadgeBackgroundColor({color: getColor(Number(changes.counter.newValue))});
  }
})

chrome.browserAction.onClicked.addListener(function () {
  chrome.storage.local.set({counter: '0'});
})
