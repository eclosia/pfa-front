import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import RecentOrders from "../../components/ecommerce/RecentOrders";
export default function Stages() {

	return (
		<>
			<PageMeta
				title="Stages | Eclosia"
				description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
			/>
			<PageBreadcrumb pageTitle="Stages" />
			<div className="space-y-6">

				<RecentOrders />

			</div>
		</>
	);
}
