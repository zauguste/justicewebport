"use client";

import React from "react";
import Image from "next/image";
import styles from "./FolderAnimation.module.css";



type FolderAnimationProps = {
  className?: string;
  hero?: boolean;
};

const FolderAnimation: React.FC<FolderAnimationProps> = ({ className, hero }) => {
  const wrapperClassName = [
    hero ? styles.heroWrapper : styles.wrapper,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClassName} aria-hidden>
      {/* Only show the logo GIF in non-hero mode */}
      {!hero && (
        <Image
          src="/AUD.gif"
          alt=""
          width={200}
          height={200}
          className={styles.source}
          priority
        />
      )}

      <div id="folder-origin" className={hero ? styles.heroFolderStack : styles.folderStack}>
        <img
          src="/J_FOLDER_CLOSED.svg"
          alt=""
          className={styles.folderClosed}
        />
        <img
          id="folder-open-img"
          src="/J_FOLDER_OPEN.svg"
          alt=""
          className={styles.folderOpen}
        />
      </div>
    </div>
  );
};

export default FolderAnimation;
