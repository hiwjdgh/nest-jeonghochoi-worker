import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('__name__', {
    concurrency: Number(process.env.WORKER_CONCURRENCY ?? 5),
})
export class __Name__Processor extends WorkerHost {
    async process(job: Job<{ foo: string }>): Promise<void> {
        await this.doSomething(job.data);
    }

    /**
     * 🧪 async mock function
     * 실제 DB / API 로직으로 교체 예정
     */
    private async doSomething(payload: { foo: string }): Promise<void> {
        await this.fakeDelay(300);

        console.log('[Worker][Mock]', payload);
    }

    /**
     * ⏱ 비동기 동작을 보장하기 위한 mock delay
     */
    private async fakeDelay(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}
