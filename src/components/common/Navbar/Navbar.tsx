"use client";

import { type FC, useState } from "react";
import Link from "next/link";
import {
  Button,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
  Dialog,
  DialogTrigger,
  DialogContent,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/shadcn";
import { Menu } from "lucide-react";
import { ThemeProvider, ModeToggle } from "@/components/ui/shadcn";
import Auth from "@/components/common/Auth/Auth";
import type { MenuItem } from "@/types";
import React from "react";
import { useAuthStore } from "@/store/auth";

export interface routes {
  menu: MenuItem[];
}

// 提取常用的链接样式
const linkStyle = "text-foreground/80 hover:text-foreground transition-colors";
const noShadowClass = "shadow-none";

const Navbar: FC<routes> = React.memo(({ menu }) => {
  Navbar.displayName = "Navbar";
  const [, setIsOpen] = useState(false);
  const { accessToken, userInfo } = useAuthStore();

  const MobileMenu = () => (
    <DialogContent className="w-[300px] sm:w-[400px] shadow-none">
      <nav className="flex flex-col gap-3 py-2">
        {menu.map((item) => (
          <div key={item.key} className="px-1">
            {item.children ? (
              <div className="space-y-2">
                <h2 className="font-medium text-base">{item.title}</h2>
                <ul className="space-y-2 pl-3">
                  {item.children.map((child) => (
                    <li key={child.key}>
                      <Link
                        href={child.link}
                        onClick={() => setIsOpen(false)}
                        className={linkStyle}
                      >
                        {child.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <Link
                href={item.link}
                onClick={() => setIsOpen(false)}
                className={linkStyle}
              >
                {item.title}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </DialogContent>
  );

  return (
    <ThemeProvider>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="hidden font-bold sm:inline-block">Jank</span>
            </Link>
            <NavigationMenu>
              <NavigationMenuList>
                {menu.map((item) => (
                  <NavigationMenuItem key={item.key}>
                    {item.children ? (
                      <>
                        <NavigationMenuTrigger className={noShadowClass}>
                          {item.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {item.children.map((child) => (
                              <li key={child.key}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    href={child.link}
                                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                  >
                                    <div className="text-sm font-medium leading-none">
                                      {child.title}
                                    </div>
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <Link
                        href={item.link}
                        className={`${linkStyle} block px-3 py-2 text-sm font-medium`}
                      >
                        {item.title}
                      </Link>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </DialogTrigger>
                <MobileMenu />
              </Dialog>
            </div>
            <div className="flex items-center gap-2">
              <ModeToggle />
              {accessToken ? (
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage
                      src={userInfo?.avatar || ""}
                      alt={userInfo?.nickname}
                    />
                    <AvatarFallback>
                      {userInfo?.nickname?.slice(0, 2) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>
              ) : (
                <Auth />
              )}
            </div>
          </div>
        </div>
      </header>
    </ThemeProvider>
  );
});

export { Navbar };
