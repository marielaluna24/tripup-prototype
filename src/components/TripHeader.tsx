import { ChevronLeft, Image } from "lucide-react";
import type { ReactNode } from "react";
import type { PersonId } from "../data/people";
import { TripCoverLisbon } from "../art/TripCover";
import { AvatarStack } from "./AvatarStack";
import styles from "./TripHeader.module.css";

export function TripHeader({
  collapsed,
  title,
  onBack,
  peopleIds,
  onOpenPeople,
  onAdd,
  showChangeImage = true,
  topRight,
}: {
  collapsed: boolean;
  title: string;
  onBack: () => void;
  peopleIds: PersonId[];
  onOpenPeople: () => void;
  onAdd?: () => void;
  showChangeImage?: boolean;
  topRight?: ReactNode;
}) {
  return (
    <div className={`${styles.wrapper} ${collapsed ? styles.collapsed : ""}`}>
      <div className={`${styles.full} ${collapsed ? styles.hidden : ""}`}>
        <div className={styles.coverArt}>
          <TripCoverLisbon />
        </div>
        <button type="button" className={styles.backBtn} onClick={onBack} aria-label="Back to trips">
          <ChevronLeft size={20} aria-hidden="true" />
        </button>
        {showChangeImage && (
          <button type="button" className={styles.changeImage}>
            <Image size={15} aria-hidden="true" />
            Change Image
          </button>
        )}
        {topRight}
        <div className={styles.titleRow}>
          <h1 className={styles.title}>{title}</h1>
          <AvatarStack ids={peopleIds} max={3} onOpenPeople={onOpenPeople} onAdd={onAdd} borderOn="dark" />
        </div>
      </div>
      <div className={`${styles.compact} ${collapsed ? "" : styles.hidden}`}>
        <button type="button" className={styles.compactBack} onClick={onBack} aria-label="Back to trips">
          <ChevronLeft size={18} aria-hidden="true" />
        </button>
        <span className={styles.compactTitle}>{title}</span>
      </div>
    </div>
  );
}
