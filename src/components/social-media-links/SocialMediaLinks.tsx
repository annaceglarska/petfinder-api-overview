import { IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useAppSelector } from "../../app/hooks";
import { getOrganization } from "../../slices/organizations/organizations.slice";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { SocialMedia } from "../../services/api/petfinder/organizations/organizations.type";
import { useMemo } from "react";
import styles from "./SocialMedia.module.css";
import { useTranslation } from "react-i18next";

const SocialMediaLinks = () => {
  const organizationSocialMedia = useAppSelector(getOrganization)?.social_media;
  const { t } = useTranslation();

  const socialMediaConfig: Record<keyof SocialMedia, any> = {
    facebook: FacebookIcon,
    instagram: InstagramIcon,
    pinterest: PinterestIcon,
    twitter: XIcon,
    youtube: YouTubeIcon,
  };

  const socialMedia = useMemo(() => {
    if (!organizationSocialMedia) {
      return [];
    }
    return Object.entries(organizationSocialMedia)
      .filter(([_, value]) => value)
      .map(([platform, link]) => {
        const ComponentSM = socialMediaConfig[platform as keyof SocialMedia];
        return (
          <IconButton href={link} target="_blank">
            <ComponentSM fontSize="large" color="primary" />
          </IconButton>
        );
      });
  }, [organizationSocialMedia]);

  return (
    <div className={styles["social-media__container"]}>
      {Boolean(socialMedia.length) && <p>{t("FOLLOW_US")}</p>}
      <div>{socialMedia}</div>
    </div>
  );
};

export default SocialMediaLinks;
