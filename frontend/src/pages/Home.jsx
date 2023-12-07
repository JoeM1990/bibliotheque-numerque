import React from "react";
import { Helmet } from "react-helmet";
import Header from "../components/Header";

const Home = () => {
  return (
    <div className="bg-slate-100 dark:bg-slate-800 w-full h-full">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Accueil</title>
        {/* <link rel="canonical" href="https://mabibliothequenumerique.vercel.app/" /> */}
      </Helmet>
      <Header />
    </div>
  );
};

export default Home;
