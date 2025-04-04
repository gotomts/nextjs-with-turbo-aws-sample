'use client';

import { Button } from '@repo/ui/button';
import { logger } from '../shared/core/logger';

type LogButtonProps = {
  className?: string;
  appName: string;
  children: React.ReactNode;
};

export function LogButton({ className, appName, children }: LogButtonProps) {
  return (
    <Button 
      appName={appName}
      className={className}
      onClick={() => logger.info('Hello, world! LogButton')}
    >
      {children}
    </Button>
  );
}