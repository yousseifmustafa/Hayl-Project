import Image from "next/image";
import styles from "@/components/Loading/LoadingPage.module.css";

const LoadingPage = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.loader}>
        {/* الدائرة التي تدور حول اللوجو */}
        <div className={styles.spinner}></div>

        {/* اللوجو */}
        <Image
          src="https://res.cloudinary.com/dl9gghlyx/image/upload/v1738881188/Icon_ttv4ph.png"
          alt="Loading..."
          width={120}
          height={120}
          className={styles.logo}
        />
      </div>
    </div>
  );
};

export default LoadingPage;
