import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const Page404 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 5000);
  });

  return (
    <div className="bg-slate-100 dark:bg-slate-800 overflow-hidden">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Oups ! Error 404</title>
     
      </Helmet>
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="px-4 lg:py-12">
          <div className="lg:gap-4 lg:flex">
            <div className="flex flex-col items-center justify-center md:py-24 lg:py-32">
              <h2 className="font-poppins font-bold text-yellow-600 text-9xl  dark:text-white">
                404
              </h2>
              <p className="mb-2 text-2xl font-bold text-center text-gray-800 dark:text-slate-100 md:text-3xl">
                <span className="font-open text-red-500">Oups !</span> Il n'y pas
                de livre par ici <br/> ou tu as été déconnecté de ta bibliothèque.
              </p>
              <p className="font-open mb-4 text-center text-gray-500 dark:text-slate-100 md:text-lg">
                Tu vas être redirigé à l'accueil.
              </p>
            </div>
            <div className="mt-2">
              <img
                src="https://www.plkdenoetique.com/wp-content/uploads/2016/03/falling_into_a_good_book_joel_robison-e1458749901453-825x465.jpg"
                alt=""
                aria-hidden="true"
                className="object-cover w-full h-96 rounded-md box-shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page404;
