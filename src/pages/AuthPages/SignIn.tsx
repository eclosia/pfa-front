import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from '../../components/auth/SignInForm';

export default function SignIn() {

    return (
        <>
            <PageMeta
                title="Sign In | Eclosia"
                description="Sign in to your Eclosia account"
            />
            <AuthLayout>
                <SignInForm />
            </AuthLayout>
        </>
    );
}
