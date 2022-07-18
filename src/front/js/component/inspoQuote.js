import React, {useState, useEffect, useContext} from "react";
import { Context } from "../store/appContext";

function InspoQuote() {
const [quote, setQuote] = useState("");

useEffect(() => {
  const getQuote = () => {

    fetch("https://type.fit/api/quotes")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {  
    console.log(data[Math.floor(Math.random() * data.length)]);
  
    let quoteNumber = Math.floor(Math.random() * data.length);
    console.log(quoteNumber);
    let oneQuote = data[Math.floor(Math.random() * data.length)];
   
    setQuote(oneQuote);
    console.log("from the quote variable", oneQuote);
  });
};

getQuote();

}, []);

  return (
    <div>
      <div className="">
        <h3>{quote.text}</h3>
        <h4>{quote.author}</h4>
      </div>
    </div>
  )
}

export default InspoQuote

 