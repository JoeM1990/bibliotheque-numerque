import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Fade } from "react-awesome-reveal";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const Add = () => {
  const state = useLocation().state;
  const navigate = useNavigate();
  
  const [title, setTitle] = useState(state?.title || "");
  const [img, setImg] = useState(state?.img || "");
  const [cat, setCat] = useState(state?.cat || "");
  const [author, setAuthor] = useState(state?.author || "");
  const [publisher, setPublisher] = useState(state?.publisher || "");
  const [desc, setDesc] = useState(state?.desc || "");
  const [opinion, setOpinion] = useState(state?.opinion || "");

  const [imageData, setImageData] = useState(
    state?.imageData);
  
  const [fileData, setFileData] = useState(
      state?.fileData);

  const convertToBase64 = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setImageData(reader.result,
      );
    };

    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  };

  const convertFileToBase64 = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setFileData(reader.result,
      );
    };

    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  };


  const [btn, setBtn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      state
        ? await axios.put(`https://fakeapi-wqoi.onrender.com/books/${state.id}`, {
            title,
            author,
            publisher,
            opinion,
            desc,
            cat,
            imageData,
            fileData
          })
        : 
        await axios.post(`https://fakeapi-wqoi.onrender.com/books/`, {
            title,
            author,
            publisher,
            opinion,
            desc,
            cat,
            imageData,
            fileData,
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
      navigate("/library");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (
      title !== "" &&
      desc !== "" &&
      author !== "" &&
      publisher !== "" &&
      opinion !== "" &&
      cat !== "" &&
      imageData !== "" &&
      fileData !== ""
    ) {
      setBtn(true);
    } else if (btn) {
      setBtn(false);
    }
  }, [title, desc, author, publisher, opinion, cat, imageData, fileData, btn]);

  return (
    <div className="lg:flex lg:flex-row md:flex-col sm:flex-col bg-slate-100 dark:bg-slate-800 overflow-hidden justify-center">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Ajouter un livre</title>
       
      </Helmet>
      <div className="flex flex-col font-bold justify-center items-center text-center ">
        <h2 className="font-poppins text-xl text-center text-black dark:text-white font-bold m-2 p-2">
          Ajouter un livre
        </h2>
        <form className="grid justify-items-center">
          <Fade>
            <label
              htmlFor="title"
              className="font-open grid grid-col mb-2 text-sm font-medium text-black dark:text-white"
            >
              Titre du livre
              <input
                type="text"
                placeholder="ex : Les Misérables"
                name="title"
                required
                aria-required="true"
                autoComplete="off"
                className="text-gray-900 m-2 p-4 w-96 rounded-lg shadow-md cursor-pointer font-normal"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </label>
            <label
              htmlFor="author"
              className="font-open grid grid-col mb-2 text-sm font-medium text-black dark:text-white"
            >
              Auteur du livre
              <input
                type="text"
                placeholder="ex : Julien Kandambi"
                name="author"
                required
                aria-required="true"
                autoComplete="off"
                className="text-gray-900 m-2 p-4 w-96 rounded-lg shadow-md cursor-pointer font-normal"
                onChange={(e) => setAuthor(e.target.value)}
                value={author}
              />
            </label>
            <h2 className="m-2 p-2 font-open grid grid-col mb-2 text-sm font-medium text-black dark:text-white">
              Genre du livre
            </h2>

              <select
                //name="opinion"
                required
                aria-required="true"
                autoComplete="off"
                className="text-gray-900 m-2 p-4 w-96 rounded-lg shadow-md cursor-pointer font-normal"
                onChange={(e) => setCat(e.target.value)}
                value={opinion}
              >
                <option>Livre</option>
                <option>Tfc</option>
                <option>Memoire</option>
                <option>Journal</option>
                <option>Magasine</option>
              </select>
           
           
            <label
              htmlFor="publisher"
              className="font-open grid grid-col mb-2 text-sm font-medium text-black dark:text-white"
            >
              Editeur du livre
              <input
                type="text"
                placeholder="ex : Julien Kandambi"
                name="publisher"
                required
                aria-required="true"
                autoComplete="off"
                className="text-gray-900 m-2 p-4 w-96 rounded-lg shadow-md cursor-pointer font-normal"
                onChange={(e) => setPublisher(e.target.value)}
                value={publisher}
              />
            </label>
            <label
              htmlFor="desc"
              className="font-open grid grid-col mb-2 text-sm font-medium text-black dark:text-white"
            >
              Résumé du livre
              <textarea
                type="text"
                placeholder="C'est l'histoire de..."
                name="desc"
                required
                aria-required="true"
                autoComplete="off"
                className="text-gray-900 m-2 p-4 w-96 rounded-lg shadow-md cursor-pointer font-normal"
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
              />
            </label>
            <label
              htmlFor="opinion"
              className="font-open grid grid-col mb-2 text-sm font-medium text-black dark:text-white"
            >
              Avis sur le livre (note /5)
              <select
                name="opinion"
                required
                aria-required="true"
                autoComplete="off"
                className="text-gray-900 m-2 p-4 w-96 rounded-lg shadow-md cursor-pointer font-normal"
                onChange={(e) => setOpinion(e.target.value)}
                value={opinion}
              >
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </label>
            <label
              htmlFor="img"
              className="font-open grid grid-col mb-2 text-sm font-medium text-black dark:text-white"
            >
              Couverture du livre (url)
              {/* <input
                type="text"
                id="img"
                name="img"
                className="text-gray-900 m-2 p-4 w-96 rounded-lg shadow-md cursor-pointer font-normal"
                onChange={(e) => setImg(e.target.value)}
                value={img}
              ></input> */}
              <input 
                name="imageData"
                type="file" 
                onChange={convertToBase64} 
                className="text-gray-900 m-2 p-4 w-96 rounded-lg shadow-md cursor-pointer font-normal"
                accept="image/*" />
            </label>

            <label
              htmlFor="img"
              className="font-open grid grid-col mb-2 text-sm font-medium text-black dark:text-white"
            >
             Fichier
              {/* <input
                type="text"
                id="img"
                name="img"
                className="text-gray-900 m-2 p-4 w-96 rounded-lg shadow-md cursor-pointer font-normal"
                onChange={(e) => setImg(e.target.value)}
                value={img}
              ></input> */}
              <input 
                name="fileData"
                type="file" 
                onChange={convertFileToBase64} 
                className="text-gray-900 m-2 p-4 w-96 rounded-lg shadow-md cursor-pointer font-normal"
                accept="application/pdf" />
            </label>

            {btn ? (
              <button
                type="submit"
                className="font-poppins hover:animate-bounce cursor-pointer text-white hover:text-white bg-yellow-600 box-shadow-lg font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-8 ml-8 mt-6"
                onClick={handleSubmit}
              >
                Ajouter ce livre
              </button>
            ) : (
              <button
                disabled
                type="submit"
                className="font-poppins hover:animate-bounce cursor-pointer text-black hover:text-black bg-yellow-200 box-shadow-lg font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-8 ml-8 mt-6"
              >
                Ajouter ce livre
              </button>
            )}
          </Fade>
        </form>
      </div>
    </div>
  );
};

export default Add;
