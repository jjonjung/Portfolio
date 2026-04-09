# 물리/공간 알고리즘 포트폴리오 템플릿

## 1. Projectile Collision Handling 템플릿

### 문제의 본질 규명 또는 구현 목적
- 투사체는 단순 이동보다 정확한 타격 판정과 자기 자신/소유자 무시가 중요했다.
- 겹침과 블로킹 히트가 혼재하므로 일관된 충돌 처리 계층이 필요했다.

### 전략 고도화
- Overlap 이벤트로 피해 가능 대상만 빠르게 필터링
- `bFromSweep` 가 있으면 `FHitResult` 기반 정밀 처리 우선
- Owner / Instigator / ProjectileOwner 는 즉시 제외
- 서버 권한에서만 실제 데미지 처리

### 실행 및 성과 증명
- 관련 파일:
  - `Private/Base/Projectile.cpp`
  - `Private/BaseProjectile.cpp`

```text
[ Spawn ]
   -> [ Move ]
   -> [ Overlap / Hit ]
   -> [ Owner Filter ]
   -> [ Damage ]
   -> [ Destroy ]
```

| 항목 | 개선 전 | 개선 후 |
|---|---|---|
| 충돌 처리 | 단순 히트 중심 | Overlap + SweepResult 병행 |
| 자기 충돌 | 예외 누락 가능 | Owner/Instigator/ProjectileOwner 제외 |
| 권한 처리 | 클라/서버 혼재 위험 | 서버 전용 데미지 처리 |

## 2. AABB / OBB 템플릿

### 문제의 본질 규명 또는 구현 목적
- 월드 좌표를 화면, 미니맵, 탐색 범위 등 다른 좌표계로 변환하려면 안정적인 경계 박스가 필요했다.
- 단순 위치값만으로는 범위 정규화와 시각화 기준을 일관되게 만들기 어려웠다.

### 전략 고도화
- 현재 구현은 `AABB` 기준으로 범위를 계산
- 필요 시 회전 객체까지 다루기 위해 `OBB` 확장 가능 구조로 설명
- `AABB -> UV 변환 -> 시각화` 파이프라인으로 정리

### 실행 및 성과 증명
- 현재 구현 근거:
  - `Public/UI/MapBoundsActor.h`
- 현재는 `AABB` 기반 설명만 주장
- `OBB` 는 확장 설계 템플릿으로만 기술

```text
[ World Bounds ]
   -> [ AABB Compute ]
   -> [ Normalize / UV ]
   -> [ UI Projection ]
```

| 구분 | AABB | OBB |
|---|---|---|
| 축 정렬 | 월드 축 기준 | 객체 회전 기준 |
| 계산 비용 | 낮음 | 높음 |
| 용도 | UI 범위, 간단 충돌 | 정밀 회전 물체 판정 |

## 3. Octree 템플릿

### 문제의 본질 규명 또는 구현 목적
- 오브젝트 수가 많아지면 모든 객체를 선형 탐색하는 방식은 비효율적이다.
- 충돌 후보 탐색과 근접 질의를 줄이기 위한 공간 분할 구조가 필요하다.

### 전략 고도화
- 월드 공간을 재귀적으로 8분할
- 객체를 노드에 배치하고, 쿼리 시 필요한 노드만 순회
- Broad Phase 탐색 최적화 후, Narrow Phase 와 분리

### 실행 및 성과 증명
- 현재 `Infinity` 에서 직접 구현 근거는 없음
- 따라서 포트폴리오에서는 확장 가능한 설계 템플릿으로만 사용

```text
[ World Space ]
   -> [ Octree Partition ]
   -> [ Candidate Query ]
   -> [ Narrow Phase ]
```

| 항목 | 선형 탐색 | Octree 기반 탐색 |
|---|---|---|
| 후보 수집 | 전체 순회 | 부분 노드 탐색 |
| 확장성 | 낮음 | 높음 |
| 용도 | 소규모 객체 | 대규모 공간 분할 |
