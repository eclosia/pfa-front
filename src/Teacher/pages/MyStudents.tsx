import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import StudentsTable from "../components/tables/StudentsTable";

export default function MyStudents() {
	
	return (
		<>
			<PageMeta
				title="Mes Étudiants | Eclosia"
				description="Ceci est la page du tableau de bord de mes étudiants pour TailAdmin - Template de tableau de bord React.js avec Tailwind CSS"
			/>
			<PageBreadcrumb pageTitle="Mes Étudiants" />
			<div className="space-y-6">

				<StudentsTable />
				
			</div>
		</>
	);
}
