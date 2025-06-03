# Welcome to Tower Comm 👋

## Table of Contents

1) [Prerequisites](#prerequisites)
2) [Installation](#installation)
3) [Problem Statement](#problem-statement)
4) [High Level Architecture](#high-level-architecture)
5) [API Design](#api-design)
6) [Future Improvements](#future-improvementsideas)

## Prerequisites

- [node](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)

## Installation

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npm run dev
   ```

3. Follow Expo's terminal instructions to either open the app with a web browser or scan the QR code on a local mobile device with [Expo Go](https://expo.dev/go)

## Problem Statement

A telecom mission control SaaS platform provides intelligent services for enterprises. Multiple carriers often share cell towers, but not all towers support all carriers. The carriers (AT&T, Verizon, T-Mobile, etc.) determine the devices supported at the towers and the device's operating system (iOS, Android, Windows, etc.). For example, some towers will only allow iOS-based AT&T devices, while others will allow Android and Windows-based AT&T and T-Mobile devices, as well as additional unique combinations. The equipment at the cell tower detects the apps used by the user on their device and captures the actions performed on the app by the user. The system captures the policy determined by the enterprise to enforce the rule, allowing or denying the list of actions permitted on the app based on the user's role. The system provides value-added services such as a real-time dashboard to monitor the security health. A higher subscription plan provides auto-remedial action enforced at the cell towers through enterprise-defined policies to secure the edge. The system integrates with various communications real estate developers to ingest (register) the information related to the towers present nationwide and the carriers they serve. The system allows connecting to different sources for onboarding existing users and their devices. Additionally, the system enables auto-discovery of new enterprise devices through the cell towers.


Architect a high-assurance, a11y-friendly, scalable frontend system for web and mobile users used globally in both online and offline modes on various devices. Define high-level architecture. Design the data flow models for each feature. Define the API model and design a performant API. Model the entities and their relationships. 

## High Level Architecture

![db tables](/system_architecture/db_tables.png)

![edge caching](/system_architecture/edge_caching.png)

![offline mode](/system_architecture/offline_mode.png)

## API Design

The following API endpoints are protected and must be made with a valid session token cookie header:

| **description** | **method**  | **endpoint** | **request body** | **response json** |
| ----------- | ----------- | ----------- | ----------- | ----------- |
| fetch info about contracted towers (could be location based) | GET | /towers/contracted  | | { data: { tower_id, coords }[ ] } |
| fetch info about free towers (could be location based) | GET | /towers/free  | | { dara: { tower_id, coords }[ ] } |
| fetch all polict info (could paginate) | GET | /policy | | { data: { id, tower_id, allowed_os }[ ] } |
| fetch info about specific policy | GET | /policy/:tower_id | | { data: { allowed_os } } |
| change policy on specific tower | POST | /policy/:tower_id | { allowed_os } | { success } |
| open contract with a specific tower | POST | /policy/open_contract/:tower_id | { allowed_os } | { success } |

## Future Improvements/Ideas

- [TanStack Query](https://tanstack.com/query/latest) for **loading state**, **caching query results** results, and possibly queuing **offline mutations**
- Web socket connection for streaming real-time logs
- An interactive map that can filter for towers that the user is and is not contracted with. Clicking on a tower on the map allows: 
   - throttling OS for that tower if contracted
   - set access or access periods for OS on specific towers if contracted
   - a form to begin a contract with that tower if uncontracted
- [Better-Auth](https://www.better-auth.com/) for setting **auth cookies** and **handling sessions**
