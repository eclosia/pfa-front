import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="Connexion | TailAdmin - Template de tableau de bord Next.js"
        description="Page de connexion pour TailAdmin - Template de tableau de bord React.js avec Tailwind CSS"
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
