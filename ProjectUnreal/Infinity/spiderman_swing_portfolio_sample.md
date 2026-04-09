# Spider-Man Swing 물리 구현 사례

## 1. 문제의 본질 규명 또는 구현 목적

Spider-Man 스윙은 단순 이동 스킬이 아니라, 플레이어가 공중에서 로프에 매달린 상태를 자연스럽게 체감하게 만드는 물리 시스템이 필요했다.
중력만 적용하면 캐릭터는 앵커 포인트에서 점점 멀어지고, 스윙이 아니라 단순 낙하나 비정상적인 포물선 운동처럼 보이게 된다.

즉, 이 기능의 핵심은 중력 처리 자체가 아니라 다음 조건을 매 프레임 만족시키는 것이었다.

- 로프 길이가 일정하게 유지될 것
- 스윙 중에는 접선 방향 속도만 유지될 것
- 프레임 누적으로 로프가 점점 늘어나지 않을 것

## 2. 전략 고도화

문제를 구속 조건이 있는 운동으로 해석하고, 로프가 팽팽해지는 순간 속도를 분해하는 방식으로 해결했다.

1. 속도 분해
현재 속도를 반지름 방향 성분과 접선 방향 성분으로 나눈다.

2. 구속 조건 적용
로프가 팽팽한 상태에서는 반지름 방향 속도를 제거해 더 이상 앵커 바깥으로 나가지 못하게 한다.

3. 위치 보정
속도만 수정하면 프레임 오차가 누적되므로, 위치 자체를 `CurrentRopeLength` 에 맞게 보정해 길이를 고정한다.

## 3. 실행 및 성과 증명

구현 파일:
- [Skill1_SpiderManSwing.cpp](C:\Users\EJ\Desktop\Fork\Infinity\Source\InfinityFighter\Private\Skill\Skill1_SpiderManSwing.cpp)

핵심 구현:
- `CalculateSwingPhysics()` 에서 중력 적용
- `Distance > CurrentRopeLength` 일 때 구속 조건 발동
- `DotProduct` 기반 반지름/접선 속도 분해
- 접선 속도만 유지
- `CorrectPosition` 으로 로프 길이 유지
- `SwingDamping` 으로 감쇠 적용

핵심 수식:

```text
v_r = (v · r̂) r̂
v_t = v - v_r
v_new = v_t
```

물리 도식:

```text
        Anchor
          ●
          |
          |   r̂
          |
    v_r ↓ ● Player ----> v_t
         ↘
           v
```

문제 해결 결과:
- 로프가 팽팽해질 때 캐릭터가 바깥으로 이탈하는 현상을 억제
- 단순 낙하가 아니라 원운동에 가까운 스윙 궤적 유지
- 위치 보정을 통해 프레임 누적으로 로프 길이가 늘어나는 현상 감소
- 감쇠를 통해 공기 저항이 있는 듯한 자연스러운 스윙 연출

## 4. 핵심 구조

```text
[ 입력 ]
스윙 앵커 포인트 확보
        ->
[ 물리 계산 ]
중력 적용 + 속도 분해 + 구속 조건 적용
        ->
[ 위치 보정 ]
로프 길이 유지
        ->
[ 결과 반영 ]
CharacterMovementComponent::Velocity 갱신
```

## 5. 사용한 수학/자료구조와 이유

- `FVector`
  위치, 속도, 방향 벡터 계산의 기본 자료구조
- `DotProduct`
  속도를 반지름 성분과 접선 성분으로 분리하기 위한 핵심 연산
- `FTimerHandle`
  스윙 상태 동안 고정 주기로 업데이트를 반복 수행

## 6. 핵심 코드 하이라이트

```cpp
if (Distance > CurrentRopeLength)
{
    FVector RadialVelocity =
        FVector::DotProduct(SwingVelocity, RopeDirection) * RopeDirection;
    FVector TangentialVelocity = SwingVelocity - RadialVelocity;

    SwingVelocity = TangentialVelocity;

    FVector CorrectPosition =
        SwingAnchorPoint - RopeDirection * CurrentRopeLength;
    Owner->SetActorLocation(CorrectPosition);
}
```

이 로직이 핵심인 이유는, 단순히 속도를 줄이는 것이 아니라 로프 바깥 방향 성분만 제거하고 로프를 따라 도는 성분은 남긴다는 구속 물리의 의도를 직접 반영하기 때문이다.

## 7. 포트폴리오 핵심 문장

Spider-Man 스윙은 단순 점프 보조 기능이 아니라, 로프 길이를 유지하는 Constraint-based Physics 문제로 접근했습니다.
속도를 반지름/접선 성분으로 분해하고, 로프가 팽팽할 때 반지름 성분만 제거한 뒤 위치 보정을 함께 적용해, 프레임 누적 오차 없이 자연스러운 스윙 궤적을 유지하도록 구현했습니다.
