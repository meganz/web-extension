chrome.webRequest.onBeforeRequest.addListener(
    function(details)
    {
        if ((details.url.substr(-4) == '.xml')
            || (details.url.substr(-4) == '.crx')
            || (details.url.substr(-4) == '.xpi')
            || (details.url.substr(-4) == '.exe')
            || (details.url.substr(-4) == '.dmg')
            || (details.url.substr(-3) == '.gz')
            || (details.url.substr(-4) == '.deb')
            || (details.url.substr(-4) == '.rpm')
            || (details.url.substr(-4) == '.zip')
            || (details.url.substr(-4) == '.txt')
            || (details.url.substr(-4) == '.pdf')
            || (details.url.substr(-3) == '.js')
            || (details.url.indexOf('mega.nz/linux') > -1)) {

                return { cancel:  false };
        }
        else
        {
            var hash = '';
            if (details.url.indexOf('://mega.nz/') > 0) {
                var url = details.url;
                var path = url.split('.nz/')[1];

                if (url.indexOf('#') > -1) {
                    var nlfe = url.match(/\/\/mega\.nz\/(embed|drop)[!#/]+([\w-]{8,11})(?:[#!](.*))?/);

                    if (nlfe) {
                        var type = nlfe[1];
                        var node = nlfe[2];
                        var pkey = nlfe[3];
                        var lpfx = ({embed: 'E', drop: 'D'})[type] || '';

                        hash = '#' + lpfx + '!' + node + (pkey ? '!' + pkey : '');
                    }
                    else if (url.indexOf('://mega.nz/chat/') > -1) {
                        hash = '#' + path;
                    }
                    else if (url.indexOf('/folder/') > -1) {
                        hash = '#/' + path;
                    }
                    else if (url.indexOf('/file/') > -1) {
                        hash = '#/' + path;
                    }
                    else {
                        hash = '#' + url.split('#')[1];
                    }
                }
                else if (path) {
                    hash = '#' + path;
                }
            }
            return { redirectUrl:  chrome.extension.getURL("mega/secure.html" + hash) };
        }
    },
    {
        urls: [
            "http://mega.co.nz/*",
            "https://mega.co.nz/*",
            "http://www.mega.co.nz/*",
            "https://www.mega.co.nz/*",
            "http://mega.nz/*",
            "https://mega.nz/*",
            "http://www.mega.nz/*",
            "https://www.mega.nz/*",
            "http://mega.is/*",
            "https://mega.is/*",
            "http://www.mega.is/*",
            "https://www.mega.is/*"
        ],
        types: ["main_frame","sub_frame"]
    },
    ["blocking"]
);

chrome.webRequest.onHeadersReceived.addListener(
  function(details)
    {
        // console.log('responseHeaders',responseHeaders);
    },
    {
        urls: [
            chrome.extension.getURL("mega")
        ],
        types: ["main_frame","sub_frame"]
    },
    ["blocking"]
);
