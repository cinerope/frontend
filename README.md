# 시네로프 프론트엔드 프로젝트
### 이 프로젝트는 팀 프로젝트 CINEROPE의 프론트엔드 프로젝트 입니다.

## 기술 스택
* Next.js (16.1.3)
* TypeScript
* Tailwind CSS
* React.js
* React Flow (노드)
* Zustand (상태관리)
* ESLINT

## 프로젝트 생성
```bash
npx create-next-app@latest .

Typescript Yes
ESLint Yes
TailwindCSS Yes
App Router Yes
Alias No
src/ directory No
```

## 협업 가이드 (Collaboration Guide)
이 프로젝트에 참여할 멤버는 깃허브 레포지토리 복제 후 해당 가이드를 필히 참조하여
작업에 임해주시기 바랍니다.\
원활한 협업을 위해 아래의 워크플로우를 준수해 주세요. 모든 코드는 관리자의 승인(Approve) 후 main 브렌치에 병합됩니다.

### 1. 브렌치 생성 규칙 (Branch Strategy)
`main` 브렌치에 직접 푸시하는 것은 제한되어 있습니다. 새로운 작업은 항상 목적에 맞는 이름의 브렌치를 생성한 후 진행해 주세요.

| 접두사 | 용도 | 예시 |
| :--- | :--- | :--- |
| **feat/** | 새로운 기능 개발 | `feat/login-ui` |
| **fix/** | 버그 수정 | `fix/header-error` |
| **docs/** | 문서 수정 (README 등) | `docs/update-guide` |
| **refactor/** | 코드 리팩토링 | `refactor/api-logic` |

```bash
# 1. main 브렌치를 최신 상태로 유지
git checkout main
git pull origin main

# 2. 새로운 작업 브렌치 생성
git checkout -b feat/기능이름
```

### 2. 작업 및 푸시 (Commit & Push)
작업이 완료되면 본인의 브렌치에 커밋 메세지 규칙을 준수하여 푸시합니다.

```bash
git add .
git commit -m "feat: 어떤 기능을 구현함"
git push origin feat/기능이름
```

### 3. 풀 리퀘스트 생성 및 승인 (PR & Merge)
1. Pull Request 작성: GitHub 레포지토리에서 [Compare & pull request] 버튼을 눌러 PR을 생성합니다.
2. 코드 리뷰: 관리자(@Hyunseok-Cho)가 작업 내용을 검토합니다.
3. 승인(Approve): 관리자의 승인이 완료되어야만 main 브렌치로 병합(Merge)이 가능합니다.
4. ~~브렌치 삭제: 병합이 완료된 후 사용한 브렌치는 삭제해 주세요.~~
### 현재 레포지토리 설정 상 브랜치가 승인이 되어 머지가 되면 자동적으로 삭제해주는 기능이 작동합니다. 하지만 만약 삭제되지 않았다면 수동으로 삭제해주시기 바랍니다. 

### 4. 주의사항
* 모든 기여자는 관리자의 최종 승인이 있어야 main에 코드를 반영할 수 있습니다.
* 코드 리뷰 중 발생한 코멘트(Review Comment)는 모두 Resolved 상태가 되어야 병합할 수 있습니다.

### 5. FAQs

리뷰 실패 시 무엇을 해야할까요?: \
기여자가 처음부터 다시 리퀘스트(PR)를 보낼 필요는 없습니다. **기존 브랜치에서 코드를 고쳐서 다시 push**만 하면, 열려 있는 PR에 자동으로 반영됩니다.
\
\
승인이 되면 왜 작성한 브랜치는 삭제해야할까요?: \
GitHub Flow의 핵심은 "하나의 작업(기능 추가, 버그 수정 등) = 하나의 브랜치" 입니다.\
여러 작업을 하나의 브랜치에서 섞어서 하면, 특정 기능만 먼저 배포하고 싶을 때 분리해내기가 매우 어렵습니다.\
\
머지(Merge)가 완료된 브랜치를 삭제하지 않고 계속 남겨두면 다음과 같은 문제가 생깁니다.

| 구분            | 문제점              | 
|:--------------|:-----------------| 
| 혼란 가중         | 수십 개의 브랜치가 쌓이면 어떤 브랜치가 현재 작업 중인지, 어떤 게 끝난 건지 알 수 없게 됩니다.      | 
| 실수 유발         |이미 머지된 옛날 브랜치에 실수로 코드를 또 커밋하고 푸시하는 상황이 발생할 수 있습니다.      |
| 성능 및 관리       | 레포지토리가 무거워지고 관리 도구에서 브랜치 목록을 확인하기가 매우 불편해집니다. |






This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
