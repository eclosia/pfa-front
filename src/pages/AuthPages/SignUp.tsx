import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignUpForm from "../../components/auth/SignUpForm";

export default function SignUp() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900/30 via-gray-900/30 to-purple-900/30 dark:from-blue-900/20 dark:via-gray-900/20 dark:to-purple-900/20 backdrop-blur-md">
      <PageMeta
        title="React.js SignUp Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js SignUp Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </div>
  );
}
