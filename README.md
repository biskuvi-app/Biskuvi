# Biskuvi    

Biskuvi is a project to add tools and extra features to [Bluesky](https://bsky.app) social app 
without compromising compatibility with the social app / atproto. 

This project currently provides a browser extension for Chromium-based browsers (Chrome, Edge, Vivaldi, etc.) and Firefox.  

The name [`biskuvi`](https://sozluk.gov.tr/?ara=bisk%C3%BCvi) is French loan word in Turkish for `biscuit`, 
chosen intentionally for this project to rhyme with bsky/bisky.  

## Motives  

Some features from the other social website can be replicated/implemented on Bluesky by making use of existing features
with less concern on future changes on Bluesky that might break them.  

Initially this extension was planned to provide buttons such as `block user` and `mute user` on a post without visiting the user's profile page. 
Due to (considerably high) demands of getting bookmarks as a feature, it is firstly prioritized and implemented as a proof of concept.  

## Features

Current features:
- bookmark posts

Incoming features:
- mute user from a post  
- block user from a post  
- host a bookmark feed server

## Downloading and Installing

Check the release page/tab for this repository. You may also find the latest release shown on the right panel of this repository page if available (scroll to bottom for mobile).
This extension will be released on the Chrome Web Store and Firefox Add-ons website once it is confirmed to have no issue for releases.

You may download the extension and install it manually after enabling "Development Mode" on the Add-ons/Extensions page of your desired browser.

## Development  

### 0 - Requirement(s)

[Bun](https://bun.sh) v1.1.33+ (or any tool that is compatible with package.json)

### 1 - Install dependencies:  

After installing the requirement(s), run this command on the repo folder:    

```bash
bun install
```

### 2 - Build code and watch for development mode  

Run this command to transpile the code automatically to js for every changes made:  

```bash
bun run dev
```

The main js file is saved in `./src`  


### 3 - Load extension on Firefox / Chromium based browser:  

1 - Open the browser's "Extensions" page (e.g.: chrome://extensions)  
2 - Toggle "Development Mode" (currently at top right of the "[Extensions](chrome://extensions)" page)  
3 - Click "Load unpacked" button -> select the repo folder, where the `manifest.json` file is located.  
4 - Make sure the process to watch and transpile the code (`bun run dev`) is still running.  
5 - After each changes onto the code, click "reload" button for the extension on the "[Extensions](chrome://extensions)" page.  

## Packing extension  

Run the following command:
```bash
bun run pack
```

All the files required to get the extension to work can be found in `./pack/biskuvi`

## Contributions

We are looking for contributors. ~~Tbh, I do not enjoy web devving but I think this needs to exist~~
Possible future projects, perhaps forking [social-app](https://github.com/bluesky-social/social-app) to add features.

Contact us on:
 - [Bluesky API touchers Discord server](https://discord.gg/Hg7hW5uK)
 - [Biskuvi official account on Bluesky](https://bsky.app/profile/biskuvi-app.bsky.social)
