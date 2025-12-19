import LogoIcon from '@/assets/jsx-icons/logo-icon';
import LogoTextIcon from '@/assets/jsx-icons/logo-text-icon';

const AuthLayout = (props: { children: React.ReactNode }) => {
  const { children } = props;

  return (
    <main className="flex justify-center bg-[#FEFCF9]">
      <div className="flex h-screen w-full max-w-400 flex-col justify-between">
        <div className="flex flex-col gap-6 self-center pt-50">
          <div className="flex items-center gap-2">
            <LogoIcon />
            <LogoTextIcon />
          </div>
          {children}
        </div>
        <footer className="font-inter flex items-center justify-between p-10 tracking-[-0.02em] text-[#626262]">
          <p>Privacy policy</p>
          <p>Terms of service</p>
        </footer>
      </div>
    </main>
  );
};

export default AuthLayout;
