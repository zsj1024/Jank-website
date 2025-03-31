/* 侧边栏-头像卡片 */
declare interface AvatarCardProps {
    avatarUrl: string
    backDetails: string[]
    name: string
    socials: {
        icon: string
        name: string
        url: string
    }[]
    title: string
}

/* 导航烂-菜单 */
declare interface MenuItem {
    children?: MenuItem[]
    icon: string
    key: string
    link: string
    title: string
}