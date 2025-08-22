"use client";

import StaggeredDropDown from "./HoverDev/StaggeredDropDown";

export default function Navbar() {
  return (
    <nav className="fixed top-[0%] left-[32%] transform -translate-x-1/2 z-50">
      <StaggeredDropDown />
    </nav>
  );
}
