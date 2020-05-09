## mega.nz browser extension ##

This is the repository for our browser extensions, using the WebExtension API for the different browsers <sup>(Chrome, Firefox, ...)</sup>

Thanks to this extension you will reduce loading times, improve download performance, and strengthen security.

Read more at https://mega.nz/extensions

---

### Installation

```bash
git clone --recursive https://github.com/meganz/web-extension.git
```

Next launch Google Chrome and go to the URL: `chrome://extensions/`

In that page, enable _"Developer mode"_ if it isn't already, and click _"Load unpacked"_, then select the folder
where you did cloned this repository. (_You can ignore the warning about `Unrecognized manifest key 'applications'`_)

You're done! Click the toolbar button to go to our website (i.e. extension)

_The same instructions does apply to other Chromium-based browsers, such as Opera or the new Edge_

Under Firefox, go to `about:debugging#/runtime/this-firefox`, next click on `Load temporary Add-On` and select the manifest.json file.

#### Updating

While this repository is rarely updated, since it does only contains the extension core files,
we do release weekly updates for our web-client which you can find here as a submodule.

Hence, to keep your cloned repository and extension updated, you will need to update both
this repository and the submodule, you can do so as below:

```bash
git pull
git submodule update --remote --merge
```

Afterwards, go to `chrome://extensions/` and click the reload button for the extension.

---

If you don't have the `git` program installed, you can instead download this repository
and the submodule as ZIP archives, to do so click the green button saying "clone or download"
in the top-right side of the file listing and then "Download ZIP"

Alternatively, you can just follow the following links to do so:

https://github.com/meganz/web-extension/zipball/master/  
https://github.com/meganz/webclient/zipball/master/

You will need to extract the second archive into the "webclient" folder of the first one (without the sub-folder!)

---

If you need further help, don't hesitate to check out our help center at https://mega.nz/help
