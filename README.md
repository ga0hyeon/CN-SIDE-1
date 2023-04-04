# CN-SIDE-01

> CN 사이드 프로젝트 리파지토리 (테마: 보드게임, 컴포넌트 개발, NPM 패키지 배포, 크롬익스텐션)
>
> > tech : monorepo, (React, zustand, storybook, tailwind), NodeJS(Express, Socket.io)

## Usage

```
npx lerna bootstrap --hoist
yarn build
```

## add packages(vite)

```
cd packages
yarn create vite

❯ yarn create vite
yarn create v1.22.17
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 🔨  Building fresh packages...
success Installed "create-vite@4.2.0" with binaries:
      - create-vite
      - cva
✔ Project name: … [packageName]
✔ Select a framework: › React
✔ Select a variant: › TypeScript

Scaffolding project in /Users/jasper/Desktop/Workspaces/CN-SIDE-1/packages/main-component...

Done. Now run:

  cd main-component
  yarn
  yarn dev

✨  Done in 24.56s.
```

## run dev(main-component)

```
cd packages/main-component
yarn dev
```

## run storybook(main-component)

```
cd packages/main-component
yarn storybook
```
