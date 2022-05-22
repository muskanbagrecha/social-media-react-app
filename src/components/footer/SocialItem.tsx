interface SocialItemProps {
  path: string;
  iconClass: string;
}

export const SocialItem = ({ path, iconClass }: SocialItemProps) => {
  return (
    <li>
      <a href={path}>
        <i className={iconClass} aria-hidden="true"></i>
      </a>
    </li>
  );
};
