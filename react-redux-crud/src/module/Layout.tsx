import GlobalNav from "./GlobalNav";
import Style from "./LayOutStyles.module.css";

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
        <div>This is section</div>
      </section>
    </>
  );
};

export default Layout;
