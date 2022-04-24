
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && /^http/.test(tab.url)) {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ["./foreground.js"]
        })
            .then(() => {
                console.log("INJECTED THE FOREGROUND SCRIPT.");
            })
            .catch(err => console.log(err));
    }
});

/**
 * takes message with all info required to search up a teacher
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'getProfRating') {
        fetch(`https://www.bruinwalk.com/search/?category=professors&q=${request.prof}`)
            .then(response => response.text())
            .then(html => {
                var data = scrapeInfo(html);
                sendResponse(data);
            });
    } else {
        sendResponse({ message: 'fail' });
    }
    return true;
});

function scrapeInfo(html) {
    if (html == null) throw new Error("Html is null");
    var colorRegex = /style=\"background-color: ([#|0-9|A-Z]*)\"/
    var ratingRegex = /<b class=\"rating\">([0-9|.| ]*)<\/b>/;
    var colorMatch = html.match(colorRegex);
    var ratingMatch = html.match(ratingRegex);

    var color = colorMatch[1];
    var rating = ratingMatch[1].replaceAll(' ', '');
    return {
        color,
        rating
    }
}