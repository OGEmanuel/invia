import Navbar from './navbar';

const RootLayout = (props: { children: React.ReactNode }) => {
  const { children } = props;
  return (
    <div className="bg-[#FEFCF9]">
      <Navbar />
      {children}
    </div>
  );
};

export default RootLayout;
