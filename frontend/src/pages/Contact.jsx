import React, { useRef, useState, useEffect } from "react";
import emailjs from "emailjs-com";
import { Helmet } from "react-helmet";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Fade } from "react-awesome-reveal";

function Contact() {
  // Toastify
  const notify = () =>
    toast(
      "Votre message a bien été envoyé. Nous vous répondrons au plus vite."
    );

  const formRef = useRef();
  const [done, setDone] = useState(false);
  const [btn, setBtn] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_EMAIL_TEMPLATE,
        formRef.current,
        process.env.REACT_APP_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log(result.text);
          setDone(true);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  useEffect(() => {
    if (name !== "" && email !== "" && subject !== "" && message !== "") {
      setBtn(true);
    } else if (btn) {
      setBtn(false);
    }
  }, [name, email, subject, message, btn]);

  return (
    <div className="lg:flex lg:flex-row md:flex-col sm:flex-col bg-slate-100 dark:bg-slate-800 overflow-hidden justify-center">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Contact</title>
        <link rel="canonical" href="https://mabibliothequenumerique.vercel.app/contact" />
      </Helmet>
      <div className="flex flex-col font-bold justify-center items-center text-center ">
        <h2 className="font-poppins text-xl text-center text-black dark:text-white font-bold m-2 p-2">
          Contact
        </h2>
        <p className="font-poppins text-black dark:text-white">
          {" "}
          Une question ? Une suggestion ?
        </p>
        <p className="font-poppins text-yellow-600 mb-6">
          Rendez-vous dans le formulaire ci-dessous.
        </p>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="grid justify-items-center"
        >
          <Fade>
            <label className="font-open grid grid-col mb-2 text-sm font-medium text-black dark:text-white">
              Nom
              <input
                type="text"
                placeholder="Votre nom"
                name="user_name"
                required
                aria-required="true"
                autoComplete="off"
                className="font-open m-2 p-4 w-96 rounded-lg shadow-md cursor-pointer font-normal"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </label>
            <label className="font-open grid grid-col mb-2 text-sm font-medium text-black dark:text-white">
              E-mail
              <input
                type="email"
                placeholder="Votre e-mail"
                name="user_email"
                required
                aria-required="true"
                autoComplete="off"
                className="font-open m-2 p-4 w-96 rounded-lg shadow-md cursor-pointer font-normal"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </label>
            <label className="font-open grid grid-col mb-2 text-sm font-medium text-black dark:text-white">
              Sujet
              <input
                type="text"
                placeholder="Sujet de votre message"
                name="user_subject"
                required
                aria-required="true"
                autoComplete="off"
                className="font-open m-2 p-4 w-96 rounded-lg shadow-md cursor-pointer font-normal"
                onChange={(e) => setSubject(e.target.value)}
                value={subject}
              />
            </label>
            <label className="font-open grid grid-col mb-2 text-sm font-medium text-black dark:text-white">
              Message
              <textarea
                rows="10"
                placeholder="Votre message"
                name="message"
                required
                aria-required="true"
                autoComplete="off"
                className="font-open m-2 p-4 w-96 rounded-lg shadow-md cursor-pointer font-normal"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
            </label>
            {done && <ToastContainer />}
            {btn ? (
              <button
                type="submit"
                className="font-poppins hover:animate-bounce cursor-pointer text-white hover:text-white bg-yellow-600 box-shadow-lg font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-8 ml-8 mt-6"
                onClick={notify}
              >
                Envoyer
              </button>
            ) : (
              <button
                disabled
                type="submit"
                className="font-poppins hover:animate-bounce cursor-pointer text-white hover:text-white bg-yellow-200 box-shadow-lg font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-8 ml-8 mt-6"
              >
                Envoyer
              </button>
            )}
          </Fade>
        </form>
      </div>
    </div>
  );
}

export default Contact;
