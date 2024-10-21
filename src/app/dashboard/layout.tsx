import { Fragment, FC, ReactNode } from "react";
import { Sidebar } from "@components/layout/sidebar";
import Header from "@/components/layout";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <Fragment>
      <div className="lg:hidden">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1 overflow-y-hidden">
        <Header />
        <div className="flex flex-1">
          <div className="hidden lg:block">
            <Sidebar />
          </div>
          <main className="flex-1 mx-2 ml-0 md:ml-[15rem] overflow-y-hidden">
            {children}
          </main>
        </div>
      </div>
    </Fragment>
  );
};

export default DashboardLayout;
