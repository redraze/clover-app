# Welcome to Tower Comm 👋

This app is built with:
- [Expo](https://expo.dev)
- the [GlueStack UI](https://gluestack.io/) component library

## Getting started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npm run dev
   ```

3. Follow Expo's terminal instructions to either open the app with a web browser or scan the QR code on a local device with [Expo Go](https://expo.dev/go)

## Future Improvements/Ideas

- [Better-Auth](https://www.better-auth.com/) for setting **auth cookies** and **handling sessions**
- [TanStack Query](https://tanstack.com/query/latest) for **caching query results** results and possibly queueing **offline mutations**
- An interactive map that can filter for towers that the user is and is not contracted with. Clicking on a tower on the map pops up: 
   - the OS throttler for that tower if contracted, or 
   - a form to begin a contract witt that tower if uncontracted
   - able to set access (future) periods for OS on specific towers
