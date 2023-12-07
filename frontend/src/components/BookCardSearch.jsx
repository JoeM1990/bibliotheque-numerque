import React, { useState } from "react";
import { Modal } from "reactstrap";

function BookCardSearch({
  thumbnail,
  title,
  pageCount,
  language,
  description,
  authors,
  publisher,
  previewLink,
  infoLink,
}) {
  // States
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div className="m-6 justify-self-center transform transition duration-400 hover:scale-110 flex flex-col justify-center text-center w-72 p-2 bg-white dark:bg-slate-400 rounded-lg border border-gray-200 shadow-md">
      <img
        top
        style={{ width: "100%", height: "233px" }}
        src={thumbnail}
        alt={title}
      />
      <div className="text-ellipsis overflow-hidden">
        <div className="font-poppins font-bold text-yellow-900 dark:text-yellow-600 p-2">
          {title}
        </div>
        <button
          type="button"
          className="hover:animate-bounce cursor-pointer text-white dark:text-black hover:text-white bg-yellow-600 dark:bg-yellow-900 box-shadow-lg font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-8 ml-8 mt-6"
          onClick={toggle}
        >
          En savoir plus
        </button>
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        <div className="modal-header d-flex justify-content-center">
          <h5 className="modal-title text-center" id="exampleModalLabel">
            {title}
          </h5>
          <button
            aria-label="Close"
            className="close"
            type="button"
            onClick={toggle}
          >
            <span aria-hidden className="text-red-700">
              X
            </span>
          </button>
        </div>
        <div className="modal-body">
          <div className="d-flex justify-content-between ml-3">
            <img src={thumbnail} alt={title} style={{ height: "233px" }} />
            <div>
              <p className="font-open ">Nombre de pages: {pageCount}</p>
              <p className="font-open">Langue : {language}</p>
              <p className="font-open">Auteur(s) : {authors}</p>
              <p className="font-open">Editeur: {publisher}</p>
            </div>
          </div>
          <div className="mt-3">{description}</div>
        </div>
        <div className="modal-footer">
          <div className="left-silde">
            <a
              href={previewLink}
              className="btn-link text-danger"
              color="default"
              type="button"
              target="_blank"
              rel="noopener noreferrer"
            >
              Aperçu du livre
            </a>
          </div>
          <div className="divider" />
          <div className="right-silde">
            <a
              href={infoLink}
              className="btn-link text-success"
              color="default"
              type="button"
              target="_blank"
              rel="noopener noreferrer"
            >
              Infos
            </a>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default BookCardSearch;
