"use client";

import { PageContainer } from "@/components/Container";
import { FC } from "react";
import TableList from "@/components/Table";
import { TableCell } from "@/components/ui/table";
import {
  ICustomerSchema,
} from "@/types/transactions";
import useDisclose from "@/hooks/useDisclose";
import { format } from "date-fns";
import { ReloadIcon } from "@radix-ui/react-icons";
import { COLUMNS } from "@/mocks/transactions";
import { CustomerModal } from "@/components/Modals";


const renderTransactionRow = (row: ICustomerSchema) => (
  <>
    <TableCell>
      {format(new Date(row.signupDate), "MMM dd, yyyy h:mm a")}
    </TableCell>
    <TableCell>{row.name}</TableCell>
    <TableCell>{row.email}</TableCell>
    <TableCell>
      {format(new Date(row.lastActivity), "MMM dd, yyyy h:mm a")}
    </TableCell>
  </>
);

const CustomerHomePage: FC = () => {
  const { isOpen, toggle } = useDisclose();

  const onSubmit = (values: { name: string; email: string; signupDate: string; lastActivity: string; }) => {
    // withdraw({ ...values })
    //   .unwrap()
    //   .then((res: ICustomerResponse) => {
    //     toggle();
    //     refetch();
    //   });
  };


  return (
    <>
      <div className="h-screen">
        <PageContainer className="md:p-8 bg-brandGray h-screen">
          {/* {isFetching && (
            <div className="flex items-center justify-center h-full">
              <ReloadIcon className="h-12 w-12 text-black animate-spin" />
            </div>
          )} */}
          <TableList<ICustomerSchema>
            title="Customer Details"
            label="Add Customer"
            onClick={toggle}
            columns={COLUMNS}
            data={[]}
            renderRow={renderTransactionRow}
          />
        </PageContainer>
      </div>
      {/* <CustomerModal
        open={isOpen}
        onDismiss={toggle}
        onSubmit={onSubmit}
        isLoading={isWithdrawLoading}
      /> */}
    </>
  );
};

export default CustomerHomePage;
