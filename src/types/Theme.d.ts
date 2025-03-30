/* 导航烂-菜单 */
declare interface MenuItem {
  title: string;
  link: string;
  key: string;
  icon: string;
  children?: MenuItem[];
}

/* 侧边栏-头像卡片 */
declare interface AvatarCardProps {
  avatarUrl: string;
  name: string;
  title: string;
  backDetails: string[];
  socials: {
    name: string;
    icon: string;
    url: string;
  }[];
}
