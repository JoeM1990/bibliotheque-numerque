import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
  });

  const [err, setError] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("auth/signup", inputs);
      navigate("/signin");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <section>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Inscription</title>
        
      </Helmet>
      <div className="bg-slate-100 dark:bg-slate-800">
        <div
          className="relative overflow-hidden bg-no-repeat bg-cover"
          style={{
            backgroundPosition: "50%",
            backgroundImage:
              "url('https://cdn.pixabay.com/photo/2016/05/28/07/05/book-1421097_1280.jpg",
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
                  Inscription
                </h2>
                <form className="grid justify-items-center">
                  <label
                    htmlFor="username"
                    className="font-open grid grid-col mb-2 text-sm font-medium text-white dark:text-gray-300"
                  >
                    Nom d'utilisateur
                    <input
                      className="font-open text-gray-900 m-2 p-4 w-96 rounded-lg shadow-md cursor-pointer font-normal"
                      type="text"
                      id="username"
                      required
                      aria-required="true"
                      autoComplete="off"
                      onChange={handleChange}
                      name="username"
                    />
                  </label>
                  <label
                    htmlFor="email"
                    className="font-open grid grid-col mb-2 text-sm font-medium text-white dark:text-gray-300"
                  >
                    E-mail
                    <input
                      className="font-open text-gray-900 m-2 p-4 w-96 rounded-lg shadow-md cursor-pointer font-normal"
                      type="email"
                      id="email"
                      required
                      aria-required="true"
                      autoComplete="off"
                      placeholder="jeanne123@email.com"
                      onChange={handleChange}
                      name="email"
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
                      id="password"
                      required
                      aria-required="true"
                      onChange={handleChange}
                      name="password"
                    />
                  </label>
                  <label
                    htmlFor="img"
                    className="font-open grid grid-col mb-2 text-sm font-medium text-white dark:text-gray-300"
                  >
                    Photo de profil (url)
                    <input
                      className="font-open text-gray-900 m-2 p-4 w-96 rounded-lg shadow-md cursor-pointer font-normal"
                      type="text"
                      id="img"
                      required
                      aria-required="true"
                      onChange={handleChange}
                      name="img"
                    />
                  </label>
                  <label>
                    <input type="checkbox" className="mr-4 checked:bg-yellow-600" />
                    J'accepte les cookies que mes données soient utilisées
                    conformément aux{" "}
                    <a
                      href="/legals"
                      alt="Redirection vers la page des mentions légales / RGPD"
                      aria-label="Redirection vers la page des mentions légales / RGPD"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-yellow-600 font-bold"
                    >
                      RGPD
                    </a>
                  </label>
                  <button
                    type="submit"
                    className="font-poppins hover:animate-bounce cursor-pointer text-white hover:text-white bg-yellow-600 box-shadow-lg font-bold rounded-lg text-sm px-5 py-2.5 text-center m-8"
                    onClick={handleSubmit}
                  >
                    S'inscrire
                  </button>
                  {err && (
                    <p className="font-poppins text-red-400 p-2"> {err} </p>
                  )}{" "}
                </form>
              </div>
            </div>
          </div>
        </div>
        <Link to="/signin">
          <button
            type="button"
            className="font-poppins animate-pulse p-3 flex flex-col cursor-pointer text-black dark:text-white"
          >
            Vous avez déjà un compte ? Connectez-vous.
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Signup;
