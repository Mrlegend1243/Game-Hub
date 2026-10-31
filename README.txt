GAME HUB - WINDOWS GAME LAUNCHER

REQUIREMENTS
- Windows 10 or Windows 11
- Node.js LTS from https://nodejs.org/

RUN IT
1. Extract this ZIP.
2. Open the extracted game-hub folder.
3. Click File Explorer's address bar, type cmd, and press Enter.
4. Run: npm install
5. Run: npm start

BUILD THE WINDOWS INSTALLER
1. In the same Command Prompt window, run: npm run dist
2. Wait for the build to finish.
3. Open the new dist folder and run the Game Hub Setup installer.

USE IT
1. Click Import Game.
2. Enter a game name.
3. Browse to its .exe file.
4. Optionally choose a banner image.
5. Click Add Game, then click Play on its card.

NOTES
- This ZIP is the source project, not a precompiled installer. The installer is built on your Windows PC.
- Removing a game from Game Hub does not delete its original files.
- If you move a game's EXE, import it again from its new location.
