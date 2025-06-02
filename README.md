# Welcome to Tower Comm 👋

This app is built with:
- [Expo](https://expo.dev) framework
- [GlueStack UI](https://gluestack.io/) component library
- [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction) state manager

## Prerequisites
- [node](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)

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
- An interactive map that can filter for towers that the user is and is not contracted with. Clicking on a tower on the map allows: 
   - throttling OS for that tower if contracted
   - set access (future) periods for OS on specific towers if contracted
   - a form to begin a contract with that tower if uncontracted
