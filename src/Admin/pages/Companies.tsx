import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import CompaniesTable from "../components/tables/CompaniesTable";

export default function Companies() {
	
	return (
		<>
			<PageMeta
				title="Companies | Eclosia"
				description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
			/>
			<PageBreadcrumb pageTitle="Entreprises " />
			<div className="space-y-6">

				<CompaniesTable />
				
			</div>
		</>
	);
}
