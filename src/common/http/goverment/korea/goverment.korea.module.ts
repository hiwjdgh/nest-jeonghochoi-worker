import { Module } from '@nestjs/common';
import { HttpModule } from '@jeonghochoi/core-worker';
import { GovermentKoreaClient } from './goverment.korea.client';

@Module({
    imports: [HttpModule],
    providers: [GovermentKoreaClient],
    exports: [GovermentKoreaClient],
})
export class GovermentKoreaModule {}
