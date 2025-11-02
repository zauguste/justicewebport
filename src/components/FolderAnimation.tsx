"use client";

import Image from "next/image";
import styles from "./FolderAnimation.module.css";

type FolderAnimationProps = {
  className?: string;
};

const FolderAnimation: React.FC<FolderAnimationProps> = ({ className }) => {
  const wrapperClassName = className
    ? `${styles.wrapper} ${className}`
    : styles.wrapper;

  return (
    <div className={wrapperClassName} aria-hidden>
      <Image
        src="/AUD.gif"
        alt=""
        width={200}
        height={200}
        className={styles.source}
        priority
      />

      <div className={styles.paperTrail}>
        <span className={styles.paper} />
        <span className={styles.paper} />
        <span className={styles.paper} />
        <span className={styles.paper} />
      </div>

      <div className={styles.folderStack}>
        <Image
          src="/J_FOLDER_CLOSED.svg"
          alt=""
          width={220}
          height={180}
          className={styles.folderClosed}
          priority
        />
        <Image
          src="/J_FOLDER_OPEN.svg"
          alt=""
          width={220}
          height={320}
          className={styles.folderOpen}
          priority
        />
      </div>
    </div>
  );
};

export default FolderAnimation;
