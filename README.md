# mistakr

> 실패도 자산이에요.

스타트업 실패 사례를 모아서 분석해주는 앱이에요.
남의 실패에서 배우면, 내 성공 확률이 올라가거든요.

---

## 뭐하는 앱이야?

창업할 때 가장 무서운 건 뭘까요?
**"나만 이런 실수 하는 건가?"** 라는 생각이에요.

근데 사실, 대부분의 실패는 패턴이 있어요.
그걸 미리 알았다면 피할 수 있었을 텐데.

mistakr는 실제 스타트업 실패 사례를 수집하고,
**그래프와 타임라인**으로 쉽게 볼 수 있게 정리했어요.

---

## 지금은 MVP에요

### Phase 1 (현재)
- 실패 사례 큐레이션
- 타임라인으로 사건 흐름 보기
- 노드 그래프로 인과관계 파악
- 북마크 기능

### Phase 2 (예정)
- **Failure AI 컨설팅**
- 내 창업 아이디어 입력하면
- 비슷한 실패 사례 매칭해서
- "이런 부분 조심하세요" 피드백

---

## 기술 스택

```
React Native 0.83
TypeScript
Zustand (상태관리)
React Query (서버 상태)
React Navigation 7
```

---

## 시작하기

```bash
# 의존성 설치
yarn install

# iOS
cd ios && pod install && cd ..
yarn ios

# Android
yarn android
```

---

## 프로젝트 구조

```
src/
├── components/     # 재사용 컴포넌트
├── screens/        # 화면들
│   ├── auth/       # 온보딩, 스플래시
│   ├── home/       # 홈, 케이스 상세
│   ├── explore/    # 탐색
│   ├── saved/      # 저장된 케이스
│   └── profile/    # 프로필, 설정
├── navigation/     # 네비게이션 설정
├── store/          # Zustand 스토어
├── hooks/          # 커스텀 훅
├── types/          # 타입 정의
├── constants/      # 상수 (컬러, 타이포)
└── utils/          # 유틸 함수
```

---

## 라이선스

MIT
