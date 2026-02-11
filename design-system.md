참고 이미지 2장의 공통점은 **“거친 다크 + 소프트 글로우 라임 포인트 + 둥근 카드 + 얕은 대비”** 입니다.
(Mistakr에도 그대로 이식 가능. “실패 사례 카드” 주축 UI에 최적)

아래는 **색/타입/컴포넌트 토큰까지 바로 박을 수 있는 수준**으로 정밀하게 정리한 디자인 시스템입니다.

---

## 1) Color System (추출 기반 + 운영용 보정)

참고 이미지에서 실제로 잡히는 포인트 컬러는 라임 계열입니다: **#E0FB8A ~ #E0FD8A**

### Core

* **BG / app background**: `#161616` (거의 블랙인데 완전 블랙 아님)
* **Surface / card**: `#1C1C1C`
* **Surface-2 / elevated**: `#232323`
* **Stroke / divider**: `#2A2A2A`

### Text

* **Text primary**: `#E7E7E7`
* **Text secondary**: `#C9C9C8`
* **Text disabled**: `#8C8C8C`

### Accent (Lime)

* **Accent primary**: `#E0FB8A`  ← CTA/선택 Chip/메인 액션
* **Accent pressed**: `#CFF27A`
* **Accent subtle bg**: `rgba(224,251,138,0.10)`  ← 포인트 배경/뱃지

### Semantic (Mistakr용)

* **Risk / warning**: `#FFB020` (Burn-rate 등 경고)
* **Critical**: `#FF5A5F` (즉시 조치 필요 시그널)

> 원칙: 라임은 “좋다”가 아니라 **Action / Focus / Conversion**에만 사용. (남발하면 싸구려 됨)

---

## 2) Typography System (참고 이미지 스타일)

Pretendard-ExtraLight 100
Pretendard-Thin 200
Pretendard-Light 300
Pretendard-Regular 400
Pretendard-Medium 500
Pretendard-SemiBold 600
Pretendard-Bold 700
Pretendard-ExtraBold 800
Pretendard-Black 900

### Type scale (실사용 토큰)

* `display`: 32 / 40, w800
* `h1`: 24 / 30, w700
* `h2`: 18 / 24, w700
* `body`: 15 / 22, w500
* `caption`: 13 / 18, w500
* `micro`: 11 / 14, w500

---

## 3) Layout / Spacing / Radius (이 이미지 느낌의 핵심)

### Spacing scale

`4, 8, 12, 16, 20, 24, 32`

* Screen padding: **16**
* Section gap: **24**
* Card padding: **16**
* Chip padding: **(12, 8)**

### Radius

* Card: **18~22**
* Chip: **999**
* Bottom bar container: **18**
* Icon button: **12**

> 둥근 정도가 “컨셉의 50%”임. 각지게 하면 브랜드 깨짐.

---

## 4) Shadow / Elevation (다크에서 카드 분리)

다크 UI에서 그림자는 잘 안 보이므로 **“stroke + soft highlight”** 조합이 맞습니다.

* Card border: `1px` with `#2A2A2A`
* Card shadow(옵션): `rgba(0,0,0,0.6)` blur 18
* Accent glow(CTA만): `rgba(224,251,138,0.22)` blur 24

---

## 5) Components 규격 (Mistakr 홈에 바로 적용)

### A. Failure Case Card (주력)

구성(권장)

* 상단: Startup명 / 연도 / 산업 뱃지
* 제목: “실패 한 줄 요약”
* 하단: **Failure Signals 2~3개 pill** + “Read” chevron

스타일

* 배경: `surface` 또는 `surface-2`
* border: `stroke`
* 텍스트 대비는 강하게(white), 서브는 회색

### B. Chips (산업/필터)

* 기본: bg `surface-2`, text `secondary`, stroke `stroke`
* selected: bg `accent`, text `#161616`
* pressed: bg `accentPressed`

### C. Primary CTA (컨설팅 퍼널 버튼)

참고 이미지의 큰 라운드 버튼 그대로.

* bg: `accent`
* text: `#161616` (bold)
* height: 56
* radius: 18~20

문구 톤(예시)

* “진단 시작하기”
* “케이스로 비교하기”
* “Pitch deck 업로드”

### D. Bottom Tab + Center Action

참고 이미지처럼 **중앙 FAB**가 강력.

* FAB: accent + shadow(glow)
* 나머지 아이콘: grey, active만 accent

---

## 6) Visual Style (이미지/그래픽 룰)

참고 이미지의 아트는 “모노톤 3D/사진 + 텍스처”입니다.
Mistakr에 맞춰서는:

* 케이스 썸네일: **흑백/저채도**(실패 분위기) + 라임 포인트(작게)
* 전체 화면: **아주 미세한 grain** (0.06~0.10 opacity)
* 강조: 브러시/언더라인은 “로고와 같은 결”로만 제한적으로 사용

---

## 7) RN Theme 토큰 예시 (바로 넣기)

```ts
export const colors = {
  bg: '#161616',
  surface: '#1C1C1C',
  surface2: '#232323',
  stroke: '#2A2A2A',

  textPrimary: '#E7E7E7',
  textSecondary: '#C9C9C8',
  textDisabled: '#8C8C8C',

  accent: '#E0FB8A',
  accentPressed: '#CFF27A',
  accentSubtle: 'rgba(224,251,138,0.10)',

  warning: '#FFB020',
  critical: '#FF5A5F',
};
```