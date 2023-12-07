import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Signin = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [err, setError] = useState(null);

  const { signin } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     // await signin(inputs);
      navigate("/library");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <section>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Connexion</title>
        <link rel="canonical" href="https://mabibliothequenumerique.vercel.app/signin" />
      </Helmet>
      <div className="bg-slate-100 dark:bg-slate-800">
        <div
          className="relative overflow-hidden bg-no-repeat bg-cover"
          style={{
            backgroundPosition: "50%",
            backgroundImage:
              "url('https://cdn.pixabay.com/photo/2016/11/22/19/25/adult-1850177_1280.jpg",
            height: "700px",
          }}
        >
          <div
            className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.55)" }}
          >
            <div className="flex justify-center items-center h-full">
              <div className="text-center text-white px-6 md:px-12">
                <h2 className="font-poppins text-xl md:text-3xl xl:text-4xl font-bold tracking-tight mb-12">
                  Connexion
                </h2>
                <form className="grid justify-items-center">
                  <label
                    htmlFor="username"
                    className="font-open grid grid-col mb-2 text-sm font-medium text-white dark:text-gray-300"
                  >
                    Nom d'utilisateur
                    <input
                      className="font-open text-gray-900 m-2 p-4 w-96 rounded-lg shadow-md cursor-pointer font-normal"
                      type="username"
                      required
                      aria-required="true"
                      autoComplete="off"
                      placeholder="jeanne123@email.com"
                      name="username"
                      onChange={handleChange}
                    />
                  </label>
                  <label
                    htmlFor="password"
                    className="font-open grid grid-col mb-2 text-sm font-medium text-white dark:text-gray-300"
                  >
                    Mot de passe
                    <input
                      className="font-open text-gray-900 m-2 p-4 w-96 rounded-lg shadow-md cursor-pointer font-normal"
                      type="password"
                      required
                      aria-required="true"
                      autoComplete="off"
                      name="password"
                      onChange={handleChange}
                    />
                  </label>
                  <button
                    type="submit"
                    className="font-poppins hover:animate-bounce cursor-pointer text-white hover:text-white bg-yellow-600 box-shadow-lg font-bold rounded-lg text-sm px-5 py-2.5 text-center m-8"
                    onClick={handleSubmit}
                  >
                    Se connecter
                  </button>
                  {err && (
                    <p className="font-poppins text-red-400 p-2"> {err} </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
        <Link to="/signup">
          <button
            type="button"
            className="font-poppins animate-pulse p-3 flex flex-col cursor-pointer "
          >
            Vous n'avez pas de compte ? Inscrivez-vous.
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Signin;
