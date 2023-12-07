import React, { useState } from "react";
import "../App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import axios from "axios";
import BookCardSearch from "../components/BookCardSearch";
import { Helmet } from "react-helmet";

function Search() {
  // States
  const [maxResults, setMaxResults] = useState(15);
  const [startIndex, setStartIndex] = useState(1);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);
  // Handle Search
  const handleSubmit = () => {
    setLoading(true);
    if (maxResults > 40 || maxResults < 1) {
      toast.error(
        "Le nombre maximum de résultats doit être situé entre 1 et 40"
      );
    } else {
      axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}&startIndex=${startIndex}`
        )
        .then((res) => {
          if (startIndex >= res.data.totalItems || startIndex < 1) {
            toast.error(
              `max reults must be between 1 and ${res.data.totalItems}`
            );
          } else if (res.data.items.length > 0) {
            setCards(res.data.items);
            setLoading(false);
          }
        })
        .catch((err) => {
          setLoading(true);
          console.log(err.response);
        });
    }
  };
  // Main Show Case
  const mainHeader = () => {
    return (
      
      <div
        className="relative overflow-hidden bg-no-repeat bg-cover"
        style={{
          backgroundPosition: "50%",
          backgroundImage:
            "url('https://cdn.pixabay.com/photo/2017/08/06/22/01/books-2596809_960_720.jpg')",
          height: "500px",
        }}
      >
              <Helmet>
        <meta charSet="utf-8" />
        <title>Rechercher un livre</title>
        <link rel="canonical" href="https://mabibliothequenumerique.vercel.app/search" />
      </Helmet>
        <div
          className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.55)" }}
        >
          <div className="flex justify-center items-center h-full">
            <div className="text-center text-white px-6 md:px-12">
              <h2 className="font-poppins text-xl text-white md:text-3xl xl:text-4xl font-bold tracking-tight mb-12">
                Rechercher un livre
              </h2>
              <div className="flex flex-col">
                <div>
                  <input
                    type="text"
                    required
                    aria-required="true"
                    autoComplete="off"
                    className="text-gray-900 m-2 p-4 w-2/3 rounded-lg shadow-md cursor-pointer font-normal"
                    placeholder="Rechercher un titre de livre, un tfc, un memoire ..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="hover:animate-bounce cursor-pointer text-white hover:text-white bg-yellow-600 box-shadow-lg font-bold rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={handleSubmit}
                  >
                    <i className="fas fa-search" />
                  </button>
                </div>
                <form className="flex flex-row">
                  <label htmlFor="maxResults">
                    Nombre maximum de résultat
                    <input
                      className="text-gray-900 m-2 p-4  rounded-lg shadow-md cursor-pointer font-normal"
                      type="number"
                      id="maxResults"
                      placeholder="Ex: 20"
                      value={maxResults}
                      onChange={(e) => setMaxResults(e.target.value)}
                    />
                  </label>

                  <label htmlFor="startIndex" className="font-open">
                    Démarrer à l'index...
                    <input
                      className="font-open text-gray-900 m-2 p-4  rounded-lg shadow-md cursor-pointer font-normal"
                      type="number"
                      id="startIndex"
                      placeholder="Ex: 1"
                      value={startIndex}
                      onChange={(e) => setStartIndex(e.target.value)}
                    />
                  </label>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleCards = () => {
    if (loading) {
      return (
        <div className="d-flex justify-content-center mt-3">
          <div role="status" style={{ width: "3rem", height: "3rem" }}>
            <svg
              aria-hidden="true"
              className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }
    const items = cards.map((item, i) => {
      let thumbnail = "";
      if (item.volumeInfo.imageLinks) {
        thumbnail = item.volumeInfo.imageLinks.thumbnail;
      }

      return (
        <div className="flex flex-row" key={item.id}>
          <BookCardSearch
            thumbnail={thumbnail}
            title={item.volumeInfo.title}
            pageCount={item.volumeInfo.pageCount}
            language={item.volumeInfo.language}
            authors={item.volumeInfo.authors}
            publisher={item.volumeInfo.publisher}
            description={item.volumeInfo.description}
            previewLink={item.volumeInfo.previewLink}
            infoLink={item.volumeInfo.infoLink}
          />
        </div>
      );
    });
    return (
      <div className="bg-slate-100 dark:bg-slate-800 grid grid-cols-4 gap-4">
        {items}
      </div>
    );
  };
  return (
    <>
      {mainHeader()}
      {handleCards()}
      <ToastContainer />
    </>
  );
}

export default Search;
