'use client';

import { LogButton } from './LogButton';
import styles from '../app/page.module.css';

export function ClientSection() {
  return (
    <LogButton appName="web (with-nestjs)" className={styles.button}>
      Click me!
    </LogButton>
  );
}