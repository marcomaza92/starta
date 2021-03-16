# Starta - Star Wars Encarta Encyclopedia

## Summary

Starta is a web app that uses SWAPI as its API and NextJS as the front-end framework.

## Install

Clone this repository and install the dependencies:

```
npm i
```

Start the dev server:

```
npm run dev
```

### Available commands

- `npm run lint`: runs ESLint and Stylelint in the entire code base
- `npm run format`: runs Prettier in the entire code base

## Tech Stack

- NextJS
- React Query
- React Context API
- React Hooks
- Typescript
- Jest
- SCSS Modules
- ESLint
- Stylelint
- Husky
- Prettier

## Functionalities

### Main

- Use Planets, People and Species endpoints as the main data sources
- Display all the main data sources

### Enhancements

- Add pages for both data list and data detail of each type
- Add `Typescript` for safe typing and data handling
- Add `Atomic Design` convention to the code base
- Implement `React Query` to fetch with Context API
- Implement `React Hooks` for better adaptability with functional components
- Implement `Sass` and `SCSS Modules` for better styling
- Implement native `CSS Grid` and `CSS Flexbox`
- Add `ESLint` and `Stylelint` for better and concise code styling
- Add `Prettier` for faster DX
- Implement `Husky` and Git Hooks for safer commits
- Implement `Jest` for better coverage

## To-Do

- [ ] Add responsiveness
- [ ] Add better test coverage
- [ ] Update types 
- [ ] Make data connections between planet, person and specie
- [ ] Consolidate similar pages into one