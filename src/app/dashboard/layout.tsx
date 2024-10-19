import { Fragment, FC, ReactNode } from "react";
import { Sidebar } from "@components/layout/sidebar";
import MainNav from "@components/layout/index";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <Fragment>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-col flex-1 md:ml-[16rem] pt-4">
          <MainNav />
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </Fragment>
  );
};

export default DashboardLayout;
