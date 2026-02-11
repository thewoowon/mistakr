# Mistakr 앱 개발 완전 계획서

**Claude Code 전달용 - React Native 기반 스타트업 실패 분석 앱**

---

## 🎯 프로젝트 개요

### 앱 정보
- **앱 이름**: Mistakr (미스테이커)
- **플랫폼**: iOS, Android (React Native)
- **타겟**: 예비 창업자, 스타트업 종사자, VC/액셀러레이터
- **핵심 가치**: 스타트업 실패 사례를 시각화하고 AI로 분석하여 창업자가 같은 실수를 반복하지 않도록 돕는다

### 핵심 기능
1. **인터랙티브 노드 그래프**: 실패 과정을 시각적으로 표현
2. **타임라인 재생**: 시간 흐름에 따른 실패 과정 추적
3. **AI 패턴 매칭**: 사용자 회사와 유사한 실패 사례 찾기 (Phase 2)
4. **독점 콘텐츠**: Premium 케이스 심층 분석
5. **검색/필터**: 산업별, 실패 유형별 탐색

---

## 📱 기술 스택

### Frontend
```
- React Native
- TypeScript (타입 안정성)
- React Navigation (화면 전환)
- react-native-svg (그래프 렌더링)
- @shopify/react-native-skia (고성능 그래픽, 선택)
- Zustand or Redux Toolkit (상태 관리)
- React Native Gesture Handler (인터랙션)
- React Native Reanimated (애니메이션)
```

### Backend & Database
```
- FastApi
  - PostgreSQL (케이스 데이터)
  - Auth (사용자 인증)
  - Storage (이미지)
  - Realtime (실시간 업데이트)
  - Railway 배포
  
```

### 결제 (Phase 2)
```
- Revenue Cat (추천 - 구독 관리 간편)
- Stripe (웹 결제용)
```

### AI/분석 (Phase 2)
```
- OpenAI API (GPT-5.2)
- Langchain (패턴 분석)
- 실제 모델 학습
```

---

## 🏗️ 앱 아키텍처

### 화면 구조 (Screen Flow)

```
App
├── Auth Stack (비로그인)
│   ├── Splash Screen
│   ├── Onboarding (슬라이드 3-4개)
│   └── Login/Signup (선택, Phase 2)
│
├── Main Tab Navigator (로그인 후)
│   ├── Home Tab
│   │   ├── Home Screen (케이스 피드)
│   │   └── Case Detail Screen (노드 그래프)
│   │
│   ├── Explore Tab
│   │   ├── Explore Screen (검색/필터)
│   │   └── Category Screen (산업별 분류)
│   │
│   ├── Saved Tab (북마크한 케이스)
│   │
│   └── Profile Tab (설정, Premium 업그레이드)
│
└── Modal Screens
    ├── Node Detail Modal (노드 클릭 시)
    ├── Timeline Player (타임라인 재생)
    └── Premium Paywall
```

---

## 📊 데이터베이스 스키마

#### 1. `cases` (실패 케이스)
```sql
CREATE TABLE cases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id TEXT UNIQUE NOT NULL,  -- "theranos"
  company_name TEXT NOT NULL,
  industry TEXT NOT NULL,
  founded_year INTEGER,
  shutdown_year INTEGER,
  total_funding_usd BIGINT,
  failure_types TEXT[],  -- ["fraud", "technology"]
  short_description TEXT,
  long_description TEXT,
  is_premium BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### 2. `nodes` (그래프 노드)
```sql
CREATE TABLE nodes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id TEXT REFERENCES cases(case_id),
  node_id INTEGER NOT NULL,  -- 1, 2, 3...
  label TEXT NOT NULL,  -- "시리즈A 투자 유치"
  date TEXT,  -- "2004-06" (ISO format)
  node_type TEXT,  -- "start", "funding", "crisis", "shutdown"
  description TEXT,
  x_position FLOAT,  -- 그래프 레이아웃 (선택)
  y_position FLOAT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_nodes_case ON nodes(case_id);
```

#### 3. `edges` (노드 간 연결)
```sql
CREATE TABLE edges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id TEXT REFERENCES cases(case_id),
  from_node INTEGER NOT NULL,
  to_node INTEGER NOT NULL,
  label TEXT,  -- "과대광고 시작"
  edge_type TEXT,  -- "cause", "consequence"
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_edges_case ON edges(case_id);
```

#### 4. `lessons` (교훈)
```sql
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id TEXT REFERENCES cases(case_id),
  lesson_text TEXT NOT NULL,
  category TEXT,  -- "product", "team", "market", "finance"
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### 5. `users` (사용자, Phase 2)
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users,
  email TEXT,
  is_premium BOOLEAN DEFAULT false,
  premium_expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### 6. `bookmarks` (북마크)
```sql
CREATE TABLE bookmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  case_id TEXT REFERENCES cases(case_id),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, case_id)
);
```

---

## 🎨 UI/UX 상세 스펙

### 디자인 시스템

#### 컬러 팔레트
```typescript
const colors = {
  primary: '#1a1a1a',      // 블랙
  accent: '#ff4444',        // 레드
  background: '#ffffff',    // 화이트
  surface: '#f5f5f5',       // 라이트 그레이
  text: {
    primary: '#1a1a1a',
    secondary: '#666666',
    disabled: '#999999'
  },
  node: {
    start: '#4CAF50',       // 그린
    funding: '#2196F3',     // 블루
    crisis: '#FF9800',      // 오렌지
    shutdown: '#f44336'     // 레드
  }
};
```

#### 타이포그래피
```typescript
const typography = {
  h1: { fontSize: 32, fontWeight: 'bold' },
  h2: { fontSize: 24, fontWeight: 'bold' },
  h3: { fontSize: 20, fontWeight: '600' },
  body: { fontSize: 16, fontWeight: 'normal' },
  caption: { fontSize: 14, fontWeight: 'normal' }
};
```

### 주요 화면 상세

#### 1. Home Screen (케이스 피드)
```
┌─────────────────────┐
│  🔍 Search          │
├─────────────────────┤
│                     │
│  Featured Case      │
│  ┌───────────────┐ │
│  │ [Theranos]    │ │
│  │ Healthcare    │ │
│  │ $700M raised  │ │
│  └───────────────┘ │
│                     │
│  Recent Cases       │
│  ┌─────┬─────┬───┐ │
│  │ [1] │ [2] │[3]│ │
│  └─────┴─────┴───┘ │
│                     │
│  Categories         │
│  [Tech] [Healthcare]│
└─────────────────────┘
```

**구성 요소:**
- Search bar (상단 고정)
- Featured case card (큰 카드, 1개)
  - 회사명, 산업, 펀딩액
  - 배경 이미지 (어두운 필터)
  - "Premium" 배지 (해당 시)
- Recent cases (horizontal scroll)
  - 작은 카드, 3-5개 표시
- Categories (태그 형태)
- Pull-to-refresh

#### 2. Case Detail Screen (노드 그래프)
```
┌─────────────────────┐
│ ← Theranos      ⋮   │
├─────────────────────┤
│                     │
│   Node Graph        │
│   ●─────●─────●    │
│   │     │     │    │
│   ●─────●─────●    │
│                     │
│ [Timeline Slider]   │
│ ├──────●────────┤  │
│ 2003        2018    │
│                     │
│ Key Events          │
│ • Founded 2003      │
│ • FDA Investigation │
│ • Shutdown 2018     │
│                     │
│ Lessons Learned     │
│ [Expandable cards]  │
└─────────────────────┘
```

**인터랙션:**
- 노드 그래프 (pan & zoom)
- 노드 탭 → 상세 모달
- 타임라인 슬라이더 드래그
  - 해당 시점까지 노드만 표시
  - 애니메이션 재생 버튼
- 하단: 스크롤 가능 콘텐츠
  - Key events (bullet points)
  - Lessons learned (expandable cards)
  - Related cases (horizontal scroll)

#### 3. Node Detail Modal
```
┌─────────────────────┐
│  시리즈A 투자 유치   │
│  2004년 6월         │
├─────────────────────┤
│                     │
│  $6M 투자 유치      │
│                     │
│  [상세 설명]        │
│  초기 투자자들은... │
│                     │
│  Impact             │
│  • 팀 확장 시작     │
│  • 제품 개발 가속   │
│                     │
│  [Close]            │
└─────────────────────┘
```

#### 4. Explore Screen (검색/필터)
```
┌─────────────────────┐
│  🔍 Search cases... │
├─────────────────────┤
│  Filter by          │
│  [Industry ▼]       │
│  [Failure Type ▼]   │
│  [Funding Range ▼]  │
├─────────────────────┤
│  Results (24)       │
│  ┌───────────────┐ │
│  │ Theranos      │ │
│  ├───────────────┤ │
│  │ WeWork        │ │
│  ├───────────────┤ │
│  │ Quibi         │ │
│  └───────────────┘ │
└─────────────────────┘
```

---

## 🔧 노드 그래프 구현 상세

### 라이브러리 선택

**Option 1: react-native-svg + D3.js (추천)**
```bash
npm install react-native-svg d3
```
- 장점: 유연함, 커스터마이징 쉬움
- 단점: 직접 구현 필요

**Option 2: @shopify/react-native-skia**
```bash
npm install @shopify/react-native-skia
```
- 장점: 고성능, 부드러운 애니메이션
- 단점: 러닝커브 있음

**MVP 추천: react-native-svg + 간단한 레이아웃**

### 그래프 레이아웃 알고리즘

**Phase 1: 간단한 타임라인 레이아웃**
```typescript
// 노드를 시간순으로 왼쪽→오른쪽 배치
// 세로 위치는 노드 타입별로 레이어 구분

const layoutNodes = (nodes: Node[]) => {
  const sortedNodes = nodes.sort((a, b) => 
    new Date(a.date) - new Date(b.date)
  );
  
  const width = SCREEN_WIDTH - 40;
  const height = 400;
  
  return sortedNodes.map((node, index) => ({
    ...node,
    x: (index / (sortedNodes.length - 1)) * width,
    y: getYByType(node.node_type) // 타입별 y 좌표
  }));
};

const getYByType = (type: string) => {
  switch(type) {
    case 'start': return 50;
    case 'funding': return 150;
    case 'crisis': return 250;
    case 'shutdown': return 350;
    default: return 200;
  }
};
```

**Phase 2: Force-directed graph (D3 활용)**
- 노드 간 반발력/인력 계산
- 더 자연스러운 레이아웃

### 인터랙션 구현

```typescript
// Pan & Zoom
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle 
} from 'react-native-reanimated';

const GraphView = ({ nodes, edges }) => {
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = e.scale;
    });

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
      translateY.value = e.translationY;
    });

  const composed = Gesture.Simultaneous(pinchGesture, panGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateX: translateX.value },
      { translateY: translateY.value }
    ]
  }));

  return (
    <GestureDetector gesture={composed}>
      <Animated.View style={animatedStyle}>
        {/* SVG 그래프 렌더링 */}
      </Animated.View>
    </GestureDetector>
  );
};
```

### 타임라인 슬라이더

```typescript
import Slider from '@react-native-community/slider';

const TimelineSlider = ({ nodes, onTimeChange }) => {
  const [currentTime, setCurrentTime] = useState(0);
  
  const dates = nodes.map(n => new Date(n.date).getTime());
  const minTime = Math.min(...dates);
  const maxTime = Math.max(...dates);
  
  const handleChange = (value: number) => {
    setCurrentTime(value);
    const visibleNodes = nodes.filter(n => 
      new Date(n.date).getTime() <= value
    );
    onTimeChange(visibleNodes);
  };
  
  return (
    <Slider
      minimumValue={minTime}
      maximumValue={maxTime}
      value={currentTime}
      onValueChange={handleChange}
      minimumTrackTintColor="#ff4444"
      maximumTrackTintColor="#cccccc"
    />
  );
};
```

---

## 📦 프로젝트 구조

```
mistakr/
├── src/
│   ├── components/          # 재사용 컴포넌트
│   │   ├── CaseCard.tsx
│   │   ├── NodeGraph.tsx
│   │   ├── TimelineSlider.tsx
│   │   ├── NodeDetailModal.tsx
│   │   └── PremiumBadge.tsx
│   │
│   ├── screens/             # 화면
│   │   ├── auth/
│   │   │   ├── SplashScreen.tsx
│   │   │   └── OnboardingScreen.tsx
│   │   ├── home/
│   │   │   ├── HomeScreen.tsx
│   │   │   └── CaseDetailScreen.tsx
│   │   ├── explore/
│   │   │   └── ExploreScreen.tsx
│   │   ├── saved/
│   │   │   └── SavedScreen.tsx
│   │   └── profile/
│   │       └── ProfileScreen.tsx
│   │
│   ├── navigation/          # 네비게이션
│   │   ├── AppNavigator.tsx
│   │   └── TabNavigator.tsx
│   │
│   ├── services/            # API/비즈니스 로직
│   │   ├── supabase.ts
│   │   ├── caseService.ts
│   │   └── authService.ts
│   │
│   ├── store/               # 상태 관리
│   │   ├── casesStore.ts
│   │   └── userStore.ts
│   │
│   ├── types/               # TypeScript 타입
│   │   ├── Case.ts
│   │   ├── Node.ts
│   │   └── Edge.ts
│   │
│   ├── utils/               # 유틸리티
│   │   ├── graphLayout.ts
│   │   └── dateFormatter.ts
│   │
│   ├── constants/           # 상수
│   │   ├── colors.ts
│   │   └── typography.ts
│   │
│   └── App.tsx
│
├── assets/                  # 이미지, 폰트
│   ├── images/
│   └── fonts/
│
├── app.json
├── package.json
└── tsconfig.json
```

---

## 🚀 개발 단계별 계획

### Phase 1: MVP Core

**프로젝트 셋업 & 기본 UI**

```bash
# 프로젝트 초기화
- 기본 패키지 설치

# 네비게이션 구조
- TabNavigator 구현
- 기본 Screen 생성 (Home, Explore, Saved, Profile)
- 화면 전환 테스트

# Home Screen 기본 UI
- CaseCard 컴포넌트
- FlatList로 케이스 목록
- 더미 데이터로 UI 확인
```

**노드 그래프**
```bash
# 노드 그래프 구현
- NodeGraph 컴포넌트 (SVG)
- 노드 렌더링 (원형)
- 엣지 렌더링 (선)
- 간단한 레이아웃 (타임라인)

# FastApi 연동
- FastApi 프로젝트 생성
- 테이블 생성 (cases, nodes, edges)
- 첫 케이스 데이터 입력 (Theranos)
- API 연동 테스트

# Case Detail Screen
- 그래프 표시
- 스크롤 가능한 설명 섹션
- 기본 인터랙션 (노드 탭)
```

### Phase 2: 고급 기능

**인터랙션 & 애니메이션**
```bash
# 타임라인 슬라이더
- Slider 컴포넌트
- 시간에 따른 노드 필터링
- 애니메이션 재생

# Pan & Zoom
- Gesture Handler 구현
- 그래프 확대/축소
- 부드러운 애니메이션

# Node Detail Modal
- 모달 컴포넌트
- 상세 정보 표시
- 닫기 애니메이션
```

**검색/필터 & 폴리싱**
```bash
# Explore Screen
- 검색 기능
- 필터 (산업, 실패 유형)
- 결과 목록

# 북마크 기능
- Saved Screen
- 로컬 저장 (AsyncStorage)
- 북마크 추가/제거

# 폴리싱
- 로딩 상태 처리
- 에러 핸들링
- 성능 최적화
```

### Phase 3: Premium & AI

**나중에 구현 (MVP 이후)**
- 사용자 인증 (OAuth)
- Premium paywall
- AI 패턴 매칭
- 푸시 알림

---

## 💾 초기 데이터 준비

### Theranos 케이스 샘플 데이터

```typescript
// cases 테이블
{
  case_id: "theranos",
  company_name: "Theranos",
  industry: "Healthcare Tech",
  founded_year: 2003,
  shutdown_year: 2018,
  total_funding_usd: 700000000,
  failure_types: ["fraud", "technology", "regulatory"],
  short_description: "혁신적인 혈액 검사 기술을 약속했지만 사기로 밝혀진 사례",
  long_description: "엘리자베스 홈즈가 설립한 Theranos는...",
  is_premium: false
}

// nodes 테이블 (샘플)
[
  {
    case_id: "theranos",
    node_id: 1,
    label: "창업",
    date: "2003-01",
    node_type: "start",
    description: "스탠포드 중퇴 후 19세에 창업"
  },
  {
    case_id: "theranos",
    node_id: 2,
    label: "시리즈A $6M",
    date: "2004-06",
    node_type: "funding",
    description: "초기 투자 유치 성공"
  },
  {
    case_id: "theranos",
    node_id: 3,
    label: "Walgreens 파트너십",
    date: "2013-09",
    node_type: "funding",
    description: "대형 약국 체인과 계약"
  },
  {
    case_id: "theranos",
    node_id: 4,
    label: "WSJ 폭로 기사",
    date: "2015-10",
    node_type: "crisis",
    description: "기술 사기 의혹 제기"
  },
  {
    case_id: "theranos",
    node_id: 5,
    label: "FDA 조사",
    date: "2016-01",
    node_type: "crisis",
    description: "규제 당국 조사 시작"
  },
  {
    case_id: "theranos",
    node_id: 6,
    label: "파산",
    date: "2018-09",
    node_type: "shutdown",
    description: "회사 청산"
  }
]

// edges 테이블
[
  { case_id: "theranos", from_node: 1, to_node: 2, label: "투자 유치" },
  { case_id: "theranos", from_node: 2, to_node: 3, label: "성장" },
  { case_id: "theranos", from_node: 3, to_node: 4, label: "과대광고 발각" },
  { case_id: "theranos", from_node: 4, to_node: 5, label: "조사 착수" },
  { case_id: "theranos", from_node: 5, to_node: 6, label: "법적 문제" }
]

// lessons 테이블
[
  {
    case_id: "theranos",
    lesson_text: "기술 검증 없는 과대광고는 언젠가 들통난다",
    category: "product"
  },
  {
    case_id: "theranos",
    lesson_text: "투명성 부재는 신뢰를 무너뜨린다",
    category: "team"
  }
]
```

---

## 🧪 테스트 계획

### 수동 테스트 체크리스트

**기능 테스트:**
- [ ] 케이스 목록 로딩
- [ ] 케이스 상세 화면 전환
- [ ] 노드 그래프 렌더링
- [ ] 노드 탭 → 모달 표시
- [ ] 타임라인 슬라이더 동작
- [ ] Pan & Zoom 동작
- [ ] 검색 기능
- [ ] 필터 기능
- [ ] 북마크 추가/제거

**성능 테스트:**
- [ ] 케이스 50개 로딩 시간 < 2초
- [ ] 그래프 렌더링 (30 노드) < 1초
- [ ] 애니메이션 60fps 유지
- [ ] 메모리 사용량 < 200MB

**디바이스 테스트:**
- [ ] iOS (iPhone 12 이상)
- [ ] Android (Samsung Galaxy S21 이상)
- [ ] 다양한 화면 크기

---

## 📊 성공 지표

### Week 2 (MVP 완성)
- [ ] Theranos 케이스 완전 동작
- [ ] 노드 그래프 인터랙션
- [ ] TestFlight 배포

### Week 4 (Beta)
- [ ] 5개 케이스 완성
- [ ] 50명 베타 테스터
- [ ] 피드백 수집

### Month 2
- [ ] App Store 정식 출시
- [ ] 100 다운로드
- [ ] 평점 4.0+

### Month 3
- [ ] 1,000 다운로드
- [ ] 첫 Premium 구독자
- [ ] 10개 케이스

---

## ⚠️ 주의사항 & 리스크

### 기술적 리스크

**1. 노드 그래프 성능**
- 노드 50개 이상 시 렌더링 느려질 수 있음
- 해결: 가상화, 레벨 오브 디테일(LOD)

**2. 데이터 크기**
- 케이스 100개 × 30 노드 = 대용량
- 해결: 페이지네이션, lazy loading

**3. 크로스 플랫폼 이슈**
- iOS/Android 그래픽 차이
- 해결: 충분한 테스트, Skia 고려

### 비즈니스 리스크

**1. 콘텐츠 생성 속도**
- 케이스 제작 시간 오래 걸림
- 해결: 간단한 케이스부터, 커뮤니티 기여

**2. Premium 전환율**
- Free 콘텐츠만으로 만족할 수 있음
- 해결: Premium 가치 명확화

---

## 📚 참고 자료

### React Native 그래프 라이브러리
- react-native-svg: https://github.com/software-mansion/react-native-svg
- D3.js: https://d3js.org/
- Skia: https://shopify.github.io/react-native-skia/

### 유사 앱 (영감)
- Miro (노드 그래프)
- Notion (타임라인)
- Duolingo (게이미피케이션)

---