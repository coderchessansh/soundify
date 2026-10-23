# Soundify

A fan-made music discovery website built with vanilla HTML, CSS, and JavaScript modules. Soundify is independent and not affiliated with Spotify.

## Features
- Responsive mobile and desktop layout
- iTunes catalog search with short previews where available
- Free To Use catalog search with full-length streams for eligible non-premium tracks
- Jamendo independent music search and streaming after adding a Jamendo API client ID
- Free Music Archive search links so listeners can inspect each track's individual license
- Playback controls, seeking, volume, shuffle, and repeat
- Liked songs and playlists saved in browser storage
- Local demo profile, not real authentication
- External lyrics search links and installable app shell

## Music sources

Use the **Music catalog** selector in Search to choose a provider or search multiple catalogs together.

- **Free To Use:** works without an API key. The free plan is limited to permitted non-commercial uses; cards show the source attribution link. Review the current terms before publishing or monetizing Soundify: https://freetouse.com/license
- **Jamendo:** create an application and get a client ID from https://developer.jamendo.com/. In Soundify, choose **Set up Jamendo** and paste the client ID. It is stored only in this browser's local storage. Jamendo API terms and each track's license still apply: https://developer.jamendo.com/v3.0/docs
- **Free Music Archive:** Soundify opens the site's search results so you can check each track's license. Free listening does not automatically grant permission to re-stream or redistribute music: https://freemusicarchive.org/License_Guide
- **iTunes:** remains available for discovery and previews. It does not provide full-length tracks through this app.

Full-track playback depends on the source's direct audio stream, availability, browser support, and licensing. This project does not unlock commercial tracks or bypass provider restrictions. A source may change or block its API at any time.

## Run on Android
Open the repository folder in Acode and use its preview/local-server feature. Since this project uses JavaScript modules, use a local web server rather than opening index.html as a file URL. Music search needs internet access.

## GitHub Pages
Open Settings, then Pages. Choose Deploy from a branch, select main and the root folder, then save. If enabled, the site URL is https://coderchessansh.github.io/soundify/.

## Structure
- index.html: page structure and catalog controls
- css/style.css: responsive styling
- js/app.js: UI and event wiring
- js/search.js: provider search and track normalization
- js/player.js: audio playback controls
- js/playlists.js: local likes and playlists
- js/account.js: local demo profile
- service-worker.js: offline app shell
- assets/: SVG logo and default cover

## Notes
Likes, playlists, theme, and demo profile stay in the current browser and do not sync across devices. The demo profile is not secure authentication. Never enter passwords or sensitive information.
