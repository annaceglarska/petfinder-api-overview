import { useAppSelector } from "../../app/hooks";
import { getOrganization } from "../../slices/organizations/organizations.slice";
import styles from "./OrganizationOpenHours.module.css";

const OrganizationOpenHours = () => {
  const organizationHours = useAppSelector(getOrganization)?.hours;
  return (
    <div className={styles["open-hours__hours-container"]}>
      {!!organizationHours?.monday?.valueOf() && (
        <div>
          <p>
            <b>Hours</b>
          </p>
          {Object.entries(organizationHours)
            .filter(([_, value]) => value)
            .map(([day, hours]) => (
              <p>
                {day}: {hours}
              </p>
            ))}
        </div>
      )}
    </div>
  );
};

export default OrganizationOpenHours;
