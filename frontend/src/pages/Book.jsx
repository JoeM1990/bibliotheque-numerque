import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContext";

const Book = () => {
  const [book, setBook] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const bookId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://fakeapi-wqoi.onrender.com/books/${bookId}`);
        setBook(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [bookId]);

  const handleDelete = async (e) => {
    try {
      //await axios.delete(`https://fakeapi-wqoi.onrender.com/books/${bookId}`);
      navigate("/library");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-slate-100 dark:bg-slate-800">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Livre</title>
       
      </Helmet>

      <div className="flex flex-row justify-around p-2">
        <img
          className="w-72 h-96 p-2 m-2 rounded-lg	drop-shadow-md"
          src={book?.imageData}
          alt="Couverture du livre"
        />

        <div>
          {/* {book.userImg && (
            <img
              className="w-20 h-20 rounded-full p-2 m-2"
              src={book.imageData}
              alt="Avatar de l'utilisateur"
            />
          )} */}
          <span className="p-2 m-2 font-poppins font-bold">
            {book.username}
          </span>
          <p className="p-2 m-2 font-normal text-white">{moment(book.date).fromNow()}</p>
          <p className="p-2 m-2 font-normal text-white">
            {book.opinion}/5
          </p>
          {currentUser.username === book.author && (
            <div className="grid-cols-1">
              <Link to={`/add?edit=2`} state={book}>
                <button
                  type="button"
                  className="font-open w-36 cursor-pointer text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-4 mt-4"
                >
                  Modifier
                </button>
              </Link>
              <button
                type="button"
                className="font-open w-36 cursor-pointer text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2"
                onClick={handleDelete}
              >
                Supprimer
              </button>
            </div>
          )}
          <div className="grid-cols-2">
            <iframe src={book.fileData} width="500px" height="300px">

            </iframe>
          </div>
        </div>
      </div>
      <div className="divide-y divide-slate-300 pr-10 pl-10">
        <h2 className="p-2 font-poppins font-bold text-white">{book.title}</h2>
        <h2 className="p-2 font-poppins text-white">{book.author}</h2>
        <p className="text-justify p-2 font-normal leading-6 text-white">{book.desc}</p>
      </div>
    </div>
  );
};

export default Book;
