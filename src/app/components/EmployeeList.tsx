"use client";
import react, { useState } from "react";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { Button, Container } from "@mui/material";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs/custom-breadcrumbs";
import { HiOutlinePlus } from "react-icons/hi";
import AddEmployeeModal from "./AddEmployeeModal";
import { IEmployee } from "@/types/employee";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { ConfirmDialog } from "@/components/custom-dialog";
import { deleteEmployee } from "@/api/employee";

const EmployeeList = ({
  employees,
}: {
  employees: IEmployee[] | undefined;
}) => {
  const [showAddEditModal, setShowAddEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<IEmployee>();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "firstName",
      headerName: "First name",
      flex: 1,
    },
    {
      field: "lastName",
      headerName: "Last name",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 150,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<FaEdit size={18} />}
          color="primary"
          label="Edit"
          key="edit"
          onClick={() => {
            setSelectedItem(params?.row as IEmployee);
            setShowAddEditModal(true);
          }}
        />,
        <GridActionsCellItem
          icon={<RiDeleteBin5Line size={18} />}
          color="error"
          label="Delete"
          key="delete"
          onClick={() => {
            setSelectedItem(params.row as IEmployee);
            setShowDeleteModal(true);
          }}
        />,
      ],
    },
  ];

  const handleDelete = async () => {
    await deleteEmployee(selectedItem?.id || "");
    setShowDeleteModal(false);
    setSelectedItem(undefined);
  };

  return (
    <Container maxWidth="lg">
      <CustomBreadcrumbs
        heading="List"
        links={[
          { name: "Dashboard", href: "" },
          { name: "Employee", href: "" },

          { name: "List" },
        ]}
        action={
          <Button
            variant="contained"
            startIcon={<HiOutlinePlus />}
            onClick={() => setShowAddEditModal(true)}
          >
            New User
          </Button>
        }
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <DataGrid
        rows={employees || []}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
      <AddEmployeeModal
        open={showAddEditModal}
        handleClose={() => {
          setShowAddEditModal(false);
          setSelectedItem(undefined);
        }}
        data={selectedItem}
      />
      <ConfirmDialog
        open={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedItem(undefined);
        }}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        }
      />
    </Container>
  );
};

export default EmployeeList;
