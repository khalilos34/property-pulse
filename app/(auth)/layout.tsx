import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <main className="flex items-center justify-center">{children}</main>;
};

export default Layout;
