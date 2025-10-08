import AdminPageWrapper from "../wrapper/AdminPageWrapper";
import AdminUserStats from "../../../components/admin/users/AdminUserStats";
import AdminUserTable from "../../../components/admin/users/AdminUserTable";

export default function ViewUsersPage() {
  return (
    <>
      <AdminPageWrapper
        StatsComponent={AdminUserStats}
        TableComponent={AdminUserTable}
      />
    </>
  );
}
