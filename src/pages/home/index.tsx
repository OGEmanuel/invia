import { Link } from "@tanstack/react-router";

const Home = () => {
  return (
    <>
      <p>Home</p>
      <Link to={"/auth"}>Auth</Link>
    </>
  );
};

export default Home;
