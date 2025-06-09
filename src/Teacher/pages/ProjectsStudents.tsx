import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ProjectsStudentsTable from "../components/tables/ProjectsStudentsTable";

export default function ProjectsStudents() {
	
	return (
		<>
			<PageMeta
				title="Étudiants | Eclosia"
				description="Ceci est la page du tableau de bord des étudiants pour TailAdmin - Template de tableau de bord React.js avec Tailwind CSS"
			/>
			<PageBreadcrumb pageTitle="Étudiants" />
			<div className="space-y-6">

				<ProjectsStudentsTable />
				
			</div>
		</>
	);
}
