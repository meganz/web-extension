(function(chrome) {
    'use strict';

    const manifest = chrome.runtime.getManifest();
    const production = manifest.version !== '109101.103.97';
    const baseURL = chrome.runtime.getURL(`${production ? 'mega' : 'webclient'}/secure.html`);

    const extPassTh = {
        '.json': 1,
        '.xml': 1,
        '.crx': 1,
        '.xpi': 1,
        '.exe': 1,
        '.dmg': 1,
        '.deb': 1,
        '.rpm': 1,
        '.zip': 1,
        '.txt': 1,
        '.pdf': 1,
        '.js': 1,
        '.gz': 1
    };
    const erx = Object.keys(extPassTh).join('').split('.').slice(1).join('|');

    const rules = [
        {
            action: {
                type: "redirect",
                redirect: {
                    regexSubstitution: `${baseURL}#\\1`
                }
            },
            condition: {
                regexFilter: "^https://[^/]+/(.*)$",
                resourceTypes: [
                    "sub_frame",
                    "main_frame"
                ]
            },
            priority: 15
        },
        {
            action: {
                type: "allow"
            },
            condition: {
                regexFilter: `\\.(?:${erx})(?:\\?.*)?$`,
                resourceTypes: [
                    "main_frame"
                ]
            },
            priority: 31
        }
    ];
    const paths = ['linux', 'keys'];

    for (let i = paths.length; i--;) {
        rules.push({
            action: {
                type: "allow"
            },
            condition: {
                urlFilter: `||mega.nz/${paths[i]}^`,
                resourceTypes: [
                    "main_frame"
                ]
            },
            priority: 63
        });
    }

    /**
    if (!production) {
        const extURL = chrome.runtime.getURL('/');

        chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((p) => {
            console.log(' --- matched rule', p);
        });
    }
    /**/

    ((factory) => {
        chrome.runtime.onStartup.addListener(factory);
        chrome.runtime.onInstalled.addListener(factory);
    })(async () => {
        let pid = -Math.log(Math.random()) * 0x1000000 >>> 0;
        const existingRules = await chrome.declarativeNetRequest.getDynamicRules();

        await chrome.declarativeNetRequest.updateDynamicRules({
            addRules: rules.map((rule) => {
                rule.id = ++pid;
                rule.condition.requestDomains = manifest.host_permissions.map(u => u.split('/')[2]);
                return rule;
            }),
            removeRuleIds: existingRules.map((rule) => rule.id)
        })
        console.log('Updated dynamic rules...', {existingRules, rules});
    })

    chrome.action.onClicked.addListener(() => {
        chrome.tabs.create({url: manifest.homepage_url + (production ? '' : '#debug')});
    });
    chrome.action.setTitle({
        title: '' + manifest.name + ' v' + manifest.version + (production ? '' : ' (development)')
    });

})(self.browser || self.chrome);
