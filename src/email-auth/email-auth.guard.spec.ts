import { EmailAuthGuard } from './email-auth.guard';

describe('EmailAuthGuard', () => {
  it('should be defined', () => {
    expect(new EmailAuthGuard()).toBeDefined();
  });
});
