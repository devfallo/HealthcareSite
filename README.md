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

## GitHub Pages 배포

- `.github/workflows/deploy-pages.yml` 워크플로우가 `work` 브랜치 push 시 자동 배포합니다.
- 저장소 Settings → Pages에서 Source를 **GitHub Actions** 로 설정해야 합니다.
- Pages 설정 변경 후 재배포가 필요하면 `work` 브랜치에 새 커밋을 푸시하면 워크플로우가 다시 실행됩니다.
