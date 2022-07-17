import React, {useState, useEffect, useContext} from "react";

function InspoQuote() {

    const [quote, setQuote] = useState("")
    
    // useEffect(() => {
        // async function fetchQuote () {
        //     let response = await fetch('https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en');
        //     let data = await response.json();
        //     return data.quoteText;
            // setQuote(data.results); 
        // };
    // },[quote] );
 
  return (
    <div>
        {/* <p>{data.quoteText}</p>
        <p>{data.quoteAuthor}</p> */}
    </div>
  )
}

export default InspoQuote

