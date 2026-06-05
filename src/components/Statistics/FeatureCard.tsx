import type { CSSProperties } from 'react';
import styles from './FeatureCard.module.css';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  offset: number;
}

function FeatureCard({ icon, title, description, offset }: FeatureCardProps) {
  return (
    <li
      className={styles.card}
      style={{ '--offset': offset } as CSSProperties}
    >
      <div className={styles.iconWrapper}>
        <img src={icon} alt="" width={40} height={40} />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </li>
  );
}

export default FeatureCard;
