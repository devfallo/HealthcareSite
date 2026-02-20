# Nura Health Cinematic Landing

React 19 + Tailwind + GSAP 기반의 하이엔드 유기적 테크 콘셉트 랜딩 페이지입니다.

## 개발

```bash
npm install
npm run dev
```

## 빌드

```bash
npm run build
npm run preview
```

## GitHub Pages 배포 (Actions 없이)

1. 정적 배포 파일 생성

```bash
npm install
npm run build:pages
```

2. 생성된 `docs/` 폴더를 커밋/푸시
3. 저장소 **Settings → Pages** 에서 아래처럼 설정
   - **Source**: Deploy from a branch
   - **Branch**: `work` (또는 배포할 브랜치)
   - **Folder**: `/docs`

이후 `work` 브랜치에 변경사항을 푸시하면 `docs/` 기준으로 Pages가 배포됩니다.
