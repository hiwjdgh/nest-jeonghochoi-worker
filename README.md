# Worker Template (NestJS + BullMQ)

이 프로젝트는 **NestJS + BullMQ 기반의 Worker 템플릿**입니다.  
API 서버와 분리된 **비동기 작업 전용 Worker**를 빠르게 생성하고 운영하기 위한 목적입니다.

---

## 📌 목적

- HTTP 서버 ❌
- BullMQ 기반 Job 처리
- DB / 외부 API / 배치 작업 처리
- 재시도 / 장애 격리 / 스케일링 용이

> **원칙: 프로젝트 1개 = Worker 1종**

---

## 🧱 기술 스택

- Node.js 18+
- NestJS
- BullMQ (Redis)
- TypeScript (NodeNext)
- TypeORM (선택)
- fetch / axios (외부 API)

---

## 📁 디렉토리 구조

```text
src/
├── main.ts                  # Worker entry (HTTP 없음)
├── worker.module.ts         # Worker 모듈
├── processors/              # BullMQ Processor
│   └── payment.processor.ts
├── config/
│   └── redis.config.ts
└── bootstrap/
    └── shutdown.ts          # Graceful shutdown
```

---

## 🚀 실행 방식

### 1️⃣ 의존성 설치

```bash
npm install
```

### 2️⃣ Redis 실행

```bash
docker run -p 6379:6379 redis:7
```

### 3️⃣ Worker 실행

```bash
npm run build
node dist/main.js
```

> 이 Worker는 **HTTP 포트를 열지 않습니다**

---

## ⚙️ 환경 변수

```env
REDIS_HOST=localhost
REDIS_PORT=6379

WORKER_CONCURRENCY=5

DB_HOST=localhost
DB_PORT=5432
DB_USER=worker
DB_PASS=worker
DB_NAME=worker_db
```

---

## 🧠 Worker 동작 방식

```text
API Server
   ↓
BullMQ Queue (Redis)
   ↓
Worker Process
   ↓
DB / 외부 API / 파일 / 배치
```

- API 서버는 **Job만 발행**
- Worker는 **모든 비즈니스 처리 담당**

---

## 🧵 concurrency 설명

```ts
@Processor('payment', {
  concurrency: Number(process.env.WORKER_CONCURRENCY ?? 5),
})
```

- `WORKER_CONCURRENCY` = **한 Worker 프로세스가 동시에 처리할 Job 수**
- Node.js의 async I/O 병렬성 활용
- Worker 종류별로 값 다르게 설정 권장

| Worker       | 권장 concurrency |
| ------------ | ---------------- |
| payment      | 1 ~ 3            |
| notification | 10 ~ 50          |
| public-data  | 1                |

---

## 🧩 Processor 예시 (BullMQ 정식 패턴)

```ts
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('payment')
export class PaymentProcessor extends WorkerHost {
    async process(job: Job<{ orderId: string }>): Promise<void> {
        await this.doSomething(job.data);
    }

    private async doSomething(payload: { orderId: string }): Promise<void> {
        await new Promise((res) => setTimeout(res, 300));
        console.log(payload);
    }
}
```

---

## 🧯 Graceful Shutdown

```ts
process.on('SIGTERM', () => void shutdown());
process.on('SIGINT', () => void shutdown());
```

- 배포 / 컨테이너 종료 시
- 실행 중 Job 안전하게 종료
- 중복 실행 방지

---

## 🗄 DB 사용 원칙

- Worker는 DB를 **직접 사용**
- Job 단위 트랜잭션 권장
- API 서버 트랜잭션과 공유 ❌

```ts
await dataSource.transaction(async manager => {
  await manager.save(...);
});
```

---

## 🪵 로그 정책

- JSON 구조 로그 권장
- 로그 = 운영/분석
- DB = 복구/재처리

```json
{
    "level": "info",
    "message": "job.start",
    "jobId": 123
}
```

---

## 🔁 중복 실행 방지

### 1️⃣ jobId 사용

```ts
queue.add('sync', data, {
    jobId: `sync:${date}`,
});
```

### 2️⃣ DB Unique Key (최종 방어)

```sql
UNIQUE (job_type, target_id)
```

---

## 🔄 재시도 전략

```ts
queue.add('approve', payload, {
    attempts: 3,
    backoff: {
        type: 'exponential',
        delay: 3000,
    },
});
```

- 실패 시 자동 재시도
- 최종 실패 Job은 DB로 관리 권장

---

## 📦 Worker 생성 방식 (Generator 사용 시)

```bash
npm run gen:worker payment
```

결과:

```text
worker-payment/
```

- 바로 실행 가능
- tsconfig / BullMQ / shutdown 포함

---

## ✅ 설계 원칙 요약

- Worker는 **작업 단위 책임**
- API 서버는 **이벤트 발행만**
- 긴 Job은 Worker 분리
- 순서 중요 → concurrency = 1
- 중복 방지는 구조로 해결

---

## 📎 참고

- BullMQ 공식 문서
- NestJS WorkerHost 패턴
- Redis 기반 비동기 처리 아키텍처

---

## 🏁 마무리

이 템플릿은 다음 용도로 바로 사용 가능합니다:

- 결제 처리
- 알림 발송
- 공공데이터 수집
- 배치 / 통계 작업

---
