import { useMemo } from "react";
import { WorkingHours } from "../../services/api/petfinder/organizations/organizations.type";
import styles from "./OrganizationOpenHours.module.css";
import { changeOpenHoursFormat } from "./helpers/OrganizationOpenHours";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useGetOrganizationByIdQueryState } from "../../slices/organizations/organization.api";

const OrganizationOpenHours = () => {
  const params = useParams();
  const { data: organization } = useGetOrganizationByIdQueryState(params.id!);
  const organizationHours: WorkingHours | undefined =
    organization?.organization.hours;
  const { t } = useTranslation();

  const openHoursInfo = useMemo(() => {
    if (!organizationHours) {
      return [];
    }
    const organizationHoursArray = Object.entries(organizationHours);
    const currentDay = new Date().getDay();
    const firstPartOfOrganizationHoursArray = organizationHoursArray.slice(
      0,
      currentDay - 1
    );
    const secondPartOfOrganizationHoursArray = organizationHoursArray.slice(
      currentDay - 1
    );
    const organizationHoursSortedFromCurrentDay = [
      ...secondPartOfOrganizationHoursArray,
      ...firstPartOfOrganizationHoursArray,
    ];
    return organizationHoursSortedFromCurrentDay
      .filter(([_, value]) => value)
      .map(([day, hours]) => (
        <p>
          {day}: {changeOpenHoursFormat(hours)}
        </p>
      ));
  }, [organizationHours]);
  return (
    <div className={styles["open-hours__hours-container"]}>
      {Boolean(openHoursInfo.length) && (
        <div>
          <p>
            <b>{t("OPENING_HOURS")}</b>
          </p>
          {openHoursInfo}
        </div>
      )}
    </div>
  );
};

export default OrganizationOpenHours;
