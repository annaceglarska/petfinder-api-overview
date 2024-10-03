import { Organizations } from "../organizations/Organizations";
import { Pets } from "../pets/Pets";
import styles from "./Main.module.css";

export const Main: React.FC = () => {
  return (
    <div className={styles["main__container"]}>
      <h1>Pets</h1>
      <Pets />
      <h1>Organizations</h1>
      <Organizations />
    </div>
  );
};
