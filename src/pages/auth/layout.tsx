import LogoIcon from '@/assets/jsx-icons/logo-icon';
import LogoTextIcon from '@/assets/jsx-icons/logo-text-icon';
import { Link } from '@tanstack/react-router';

const AuthLayout = (props: { children: React.ReactNode }) => {
  const { children } = props;

  return (
    <main className="flex justify-center bg-[#FEFCF9]">
      <div className="flex h-screen w-full max-w-400 flex-col justify-between">
        <div className="flex w-full max-w-100 flex-col gap-6 self-center pt-25 max-sm:px-5 sm:pt-50">
          <div className="flex items-center gap-2">
            <LogoIcon />
            <LogoTextIcon />
          </div>
          {children}
        </div>
        <div>
          <div className="font-inter flex justify-between px-5 max-sm:flex-col sm:items-center sm:px-20">
            <Link to={'/auth/login'} className="[.active]:font-bold">
              Login
            </Link>
            <Link to={'/auth/sign-up'} className="[.active]:font-bold">
              Sign up
            </Link>
            <Link to={'/auth/forgot-password'} className="[.active]:font-bold">
              Forgot password
            </Link>
            <Link to={'/auth/verify-email'} className="[.active]:font-bold">
              Verify email
            </Link>
            <Link
              to={'/auth/verify-reset-password'}
              className="[.active]:font-bold"
            >
              Verify reset password
            </Link>
            <Link to={'/auth/create-password'} className="[.active]:font-bold">
              Create password
            </Link>
            <Link to={'/auth/business-info'} className="[.active]:font-bold">
              Business info
            </Link>
            <Link to={'/auth/reset-password'} className="[.active]:font-bold">
              Reset password
            </Link>
          </div>
          <footer className="font-inter flex items-center justify-between px-5 py-8 tracking-[-0.02em] text-[#626262] sm:p-10">
            <p>Privacy policy</p>
            <p>Terms of service</p>
          </footer>
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
