import { Injectable } from '@nestjs/common';
import { MailSendOptions, MailService } from '@jeonghochoi/core-worker';

export type MailTransportType = 'smtp' | 'ses';

interface MailClientRegistration {
    transport: MailTransportType;
}

@Injectable()
export class MailClient {
    private readonly registry = new Map<string, MailClientRegistration>();

    constructor(private readonly mailService: MailService) {}

    register(name: string, options: MailClientRegistration): void {
        this.registry.set(name, options);
    }

    use(name: string): MailEndpoint {
        const registration = this.registry.get(name);

        if (!registration) {
            throw new Error(`mail client [${name}] is not registered`);
        }

        return new MailEndpoint(this.mailService, registration.transport);
    }
}

export class MailEndpoint {
    constructor(
        private readonly mailService: MailService,
        private readonly transport: MailTransportType,
    ) {}

    async send(
        templateName: string,
        context: Record<string, any>,
        options: Omit<MailSendOptions, 'html'>,
    ): Promise<void> {
        await this.mailService.send(
            this.transport,
            templateName,
            context,
            options,
        );
    }
}
