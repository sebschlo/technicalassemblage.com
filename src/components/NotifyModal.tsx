import { useEffect, useRef, useState } from 'react';
import { Modal } from './Modal';
import { isValidEmail, subscribeEmail } from '../lib/notify';
import styles from './NotifyModal.module.css';

type NotifyModalProps = {
  product: string | null;
  onClose: () => void;
};

type Status = 'idle' | 'submitting' | 'done';

export function NotifyModal({ product, onClose }: NotifyModalProps) {
  const open = product !== null;
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setEmail('');
      setStatus('idle');
      setError(null);
      const t = setTimeout(() => inputRef.current?.focus(), 60);
      return () => clearTimeout(t);
    }
  }, [open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'submitting') return;

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      inputRef.current?.focus();
      return;
    }

    setError(null);
    setStatus('submitting');
    const result = await subscribeEmail(email, product ?? '');
    if (result === 'error') {
      setStatus('idle');
      setError('Something went wrong. Please try again.');
      return;
    }
    setStatus('done');
  }

  return (
    <Modal open={open} onClose={onClose} labelledBy="notify-title">
      {status !== 'done' ? (
        <>
          <div className={styles.kicker}>{product}</div>
          <h3 id="notify-title" className={styles.title}>
            Stay in the loop
          </h3>
          <p className={styles.copy}>
            {product} ships Q3 2026. Leave your email and we'll let you know the
            moment it goes live.
          </p>
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <input
              ref={inputRef}
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(null);
              }}
              className={styles.input}
              aria-label="Email address"
              aria-invalid={error ? true : undefined}
              disabled={status === 'submitting'}
            />
            <button
              type="submit"
              className={styles.button}
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? 'Adding…' : 'Notify me'}
            </button>
          </form>
          {error && (
            <p className={styles.error} role="alert">
              {error}
            </p>
          )}
        </>
      ) : (
        <div className={styles.success}>
          <h3 id="notify-title" className={styles.title}>
            You're on the list.
          </h3>
          <p className={styles.copy}>
            Thanks — we'll be in touch when {product} launches.
          </p>
          <button className={styles.button} onClick={onClose}>
            Done
          </button>
        </div>
      )}
    </Modal>
  );
}
