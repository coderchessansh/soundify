# Soundify

A fan-made, Spotify-inspired music discovery website built with vanilla HTML, CSS, and JavaScript modules. Soundify is independent and not affiliated with Spotify.

## Features
- Responsive mobile and desktop layout
- Music search and artwork through the iTunes Search API
- Audio previews when available
- Playback, seeking, volume, shuffle, and repeat
- Liked songs and playlists saved in browser storage
- Local demo profile, not real authentication
- External lyrics search links

## Run on Android
Open the repository folder in Acode and use its preview/local-server feature. Since this project uses JavaScript modules, use a local web server rather than opening index.html as a file URL. Music search needs internet access.

## GitHub Pages
Open Settings, then Pages. Choose Deploy from a branch, select main and the root folder, then save. If enabled, the site URL is https://coderchessansh.github.io/soundify/.

## Structure
- index.html: page structure
- css/style.css: responsive styling
- js/app.js: UI and event wiring
- js/search.js: music search
- js/player.js: playback controls
- js/playlists.js: local likes and playlists
- js/account.js: local demo profile
- assets/: SVG logo and default cover

## Notes
Music search and previews depend on the iTunes Search API and track availability; this is not a full licensed streaming catalogue. Likes, playlists, and profile data stay in the current browser and do not sync across devices. The demo profile is not secure authentication. Never enter passwords or sensitive information.