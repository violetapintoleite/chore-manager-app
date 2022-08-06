import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/modules/hometext.css";

function InspoQuote() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const getQuote = () => {
      fetch("https://type.fit/api/quotes")
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          //check that only getting one number back
          // console.log(data[Math.floor(Math.random() * data.length)]);

          // let quoteNumber = Math.floor(Math.random() * data.length);
          //check that only getting one quote back
          // console.log(quoteNumber);
          let oneQuote = data[Math.floor(Math.random() * data.length)];

          setQuote(oneQuote);
          console.log("from the quote variable", oneQuote);
        });
    };

    getQuote();
    setInterval(() => {
      getQuote();
    }, 3000);
  }, []);

  return (

    <div className="quote text-center">  
        <h5 className="quote font-for-quote ">{quote.text}</h5>
        <h5 className=" ">{quote.author}</h5>

    </div>
  );
}

export default InspoQuote;
