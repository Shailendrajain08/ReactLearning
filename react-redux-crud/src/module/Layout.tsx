import { Outlet } from "react-router-dom";
import GlobalNav from "./GlobalNav";
import Style from "./LayOutStyles.module.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
  return (
    <>
      <article className={Style.header}>
        <header>
          <h1>Welcome!</h1>
        </header>
      </article>

      <section className={Style.content_section}>
        <GlobalNav/>
        <main>
          <Outlet/>
        </main>
      </section>
      <ToastContainer />
    </>
  );
};

export default Layout;
