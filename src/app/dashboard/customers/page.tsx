"use client";

import { PageContainer } from "@/components/Container";
import { FC, useState } from "react";
import TableList from "@/components/Table";
import { TableCell } from "@/components/ui/table";
import { ICustomerSchema } from "@/types/customers";
import useDisclose from "@/hooks/useDisclose";
import { format } from "date-fns";
import { ReloadIcon } from "@radix-ui/react-icons";
import { COLUMNS } from "@/mocks/customer";
import { CustomerModal } from "@/components/Modals";
import { useAllUsers } from "@/service/user/hooks";
import { toast } from "@/components/ui/use-toast";
import useDisplayToast from "@/hooks/useToast";

const renderTransactionRow = (row: ICustomerSchema) => (
  <>
    <TableCell>{format(row.signUpDate, "MMM dd, yyyy h:mm a")}</TableCell>
    <TableCell>{`${row.first_name} ${row.last_name}`}</TableCell>
    <TableCell>{row.email}</TableCell>
    <TableCell>{row.phone_number}</TableCell>
    <TableCell>{format(row.lastActivity, "MMM dd, yyyy h:mm a")}</TableCell>
    <TableCell>{row.residence}</TableCell>
  </>
);

const CustomerHomePage: FC = () => {
  const { showToast } = useDisplayToast();
  const { isOpen, toggle } = useDisclose();
  const [page, setPage] = useState(1);
  const { data, isFetching } = useAllUsers(page, 10);

  const onSubmit = (values: {
    name: string;
    email: string;
    signupDate: string;
    lastActivity: string;
  }) => {
    showToast(
      "🎉👏🎊 User Created and is under review to be added! 🎉👏🎊",
      "success",
    );
    toggle();
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
            data={data || []}
            renderRow={renderTransactionRow}
            totalItems={data?.length || 0}
            itemsPerPage={10}
          />
        </PageContainer>
      </div>
      <CustomerModal
        open={isOpen}
        onDismiss={toggle}
        onSubmit={onSubmit}
        isLoading={isFetching}
      />
    </>
  );
};

export default CustomerHomePage;
