import AdminPageWrapper from "../wrapper/AdminPageWrapper";
import AdminCompanies from "../../../components/admin/company/AdminCompanies";
import AdminCompanyStats from "../../../components/admin/company/AdminCompanyStats";

export default function ViewCompanyPage() {
  return (
    <>
      <AdminPageWrapper
        StatsComponent={AdminCompanyStats}
        TableComponent={AdminCompanies}
      />
    </>
  );
}
