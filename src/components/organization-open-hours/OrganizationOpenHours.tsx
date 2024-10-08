import { useMemo, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { WorkingHours } from "../../services/api/petfinder/organizations/organizations.type";
import { getOrganization } from "../../slices/organizations/organizations.slice";
import styles from "./OrganizationOpenHours.module.css";
import {
  changeOpenHoursFormat,
  checkIfAnyOpenHoursInfo,
} from "./helpers/OrganizationOpenHours";

const OrganizationOpenHours = () => {
  const organizationHours: WorkingHours | undefined =
    useAppSelector(getOrganization)?.hours;
  const isAnyOpenHoursInfo: boolean = organizationHours
    ? checkIfAnyOpenHoursInfo(organizationHours)
    : false;

  const openHoursInfo = useMemo(() => {
    if (!isAnyOpenHoursInfo) {
      return [];
    }
    const organizationHoursArray = Object.entries(organizationHours!);
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
  }, [organizationHours, isAnyOpenHoursInfo]);
  return (
    <div className={styles["open-hours__hours-container"]}>
      {isAnyOpenHoursInfo && (
        <div>
          <p>
            <b>Hours</b>
          </p>
          {openHoursInfo}
        </div>
      )}
    </div>
  );
};

export default OrganizationOpenHours;
