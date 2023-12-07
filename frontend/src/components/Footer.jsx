import React from "react";

export default function Footer() {
  return (
    <footer className="h-20 bg-slate-100 dark:bg-slate-800 grid grid-cols-2 gap-3 p-8">
      <span className="font-poppins text-sm text-gray-500 sm:text-center dark:text-gray-400">
        Copyright© 2023. All Rights Reserved.
      </span>
      <ul className="flex flex-wrap  items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
          <a
            href="https://www.monkila-tech.com/"
            target="_blank"
            rel="noreferrer"
            className="font-poppins mr-3 hover:underline hover:text-yellow-600"
          >
            Design by ❤ MK-TECH
          </a>
        </li>

        <li>
          <a
            href="/contact"
            alt="redirection vers la page contact"
            className="hover:underline font-poppins mr-6 hover:text-yellow-600"
          >
            Contact
          </a>
         
        </li>
      </ul>
    </footer>
  );
}
