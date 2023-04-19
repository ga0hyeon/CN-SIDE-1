# CN-SIDE-01

> CN 사이드 프로젝트 리파지토리 (테마: 보드게임, 컴포넌트 개발, NPM 패키지 배포, 크롬익스텐션)
>
> > tech : monorepo, (React, zustand, storybook, tailwind), NodeJS(Express, Socket.io)

## packages

- chromeside-board (메인 로비)
- ui-components (공용 컴포넌트 및 유틸 관리)
- halli-galli (할리갈리 게임 패키지)

## Usage

```
yarn
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
✔ Project name: chromeside-board [packageName]
✔ Select a framework: › React
✔ Select a variant: › TypeScript

Scaffolding project in /Users/jasper/Desktop/Workspaces/CN-SIDE-1/packages/chromeside-board...

Done. Now run:

  cd chromeside-board
  yarn
  yarn dev

✨  Done in 24.56s.
```

## run dev

```
cd packages/chromeside-board
yarn dev
```

## run storybook(ui-components)

```
cd packages/ui-components
yarn storybook
```
