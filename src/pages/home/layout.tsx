//73px is the height of the navbar

import Navbar from './navbar';

const RootLayout = (props: { children: React.ReactNode }) => {
  const { children } = props;
  return (
    <div className="bg-background">
      <Navbar />
      <div className="pt-18.25">{children}</div>
    </div>
  );
};

export default RootLayout;
