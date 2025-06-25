"use client";
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  Navbar,
  NavbarButton,
  NavBody,
  NavItems,
} from "@/components/ui/resizable-navbar";
import { AttendeesList } from "@/components/ui/attendees-list";
import Image from "next/image";
import { useState } from "react";

export function Header() {
  const navItems = [
    {
      name: "Hành trình",
      link: "#timeline",
    },
    {
      name: "Ảnh tốt nghiệp",
      link: "#graduation",
    },
    {
      name: "Liên hệ qua facebook",
      link: "https://www.facebook.com/Thag.dev/",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAttendeesList, setShowAttendeesList] = useState(false);

  return (
    <>
      <Navbar>
        <NavBody>
          <Image src="/assets/logo.svg" alt="logo" width={120} height={100} />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton 
              variant="primary"
              onClick={() => setShowAttendeesList(true)}
            >
              DS. Người tham dự
            </NavbarButton>
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setShowAttendeesList(true);
                }}
                variant="primary"
                className="w-full"
              >
                DS. Người tham dự
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Attendees List Modal */}
      <AttendeesList
        isOpen={showAttendeesList}
        onClose={() => setShowAttendeesList(false)}
      />
    </>
  );
}
