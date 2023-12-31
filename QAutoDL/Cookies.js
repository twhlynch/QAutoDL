chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message == "GetCookies") {
        getCookies("https://www.oculus.com", "oc_www_at", function (oc_www_at) {
            sendResponse(oc_www_at);
        });
        return true;
    }
});

function getCookies(domain, name, callback) {
    chrome.cookies.get({
        "url": domain,
        "name": name
    }, function (cookie) {
        if (callback) {
            console.log(cookie.value);
            callback(cookie.value);
        }
    });
}