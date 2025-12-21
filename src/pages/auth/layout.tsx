import Logo from './components/logo';

const AuthLayout = (props: { children: React.ReactNode }) => {
  const { children } = props;

  return (
    <main className="flex justify-center bg-[#FEFCF9]">
      <div className="flex h-screen w-full max-w-400 flex-col justify-between">
        <div className="flex w-full max-w-100 flex-col gap-6 self-center pt-25 max-sm:px-5 sm:pt-50">
          <Logo />
          {children}
        </div>
        <footer className="font-inter flex items-center justify-between px-5 py-8 leading-6 tracking-[-0.02em] text-[#626262] sm:p-10">
          <p>Privacy policy</p>
          <p>Terms of service</p>
        </footer>
      </div>
    </main>
  );
};

export default AuthLayout;
