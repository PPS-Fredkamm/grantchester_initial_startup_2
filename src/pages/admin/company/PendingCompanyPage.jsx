import AdminPageWrapper from "../wrapper/AdminPageWrapper";
import PendingCompanyStats from "../../../components/admin/company/pending/PendingCompanyStats";
import PendingCompanies from "../../../components/admin/company/pending/PendingCompanies";

export default function PendingCompanyPage() {
  return (
    <>
      <AdminPageWrapper
        StatsComponent={PendingCompanyStats}
        TableComponent={PendingCompanies}
      />
    </>
  );
}
