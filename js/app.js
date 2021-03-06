/* -----------------------------------------------------
             Book Archive JavaScript code start
-------------------------------------------------------*/


// for styling toggle the loading indicator
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}

// for styling toggle the book result area
const toggleSearchResult = displayStyle => {
    document.getElementById('search-result').style.display = displayStyle;
}

// set the search action message
let searchFeedbackMessage = document.getElementById('searchResultMessage');

// book search function
const searchBook = () => {

    // remove previous message
    searchFeedbackMessage.textContent = '';

    // get input text
    const inputValueText = document.getElementById("input-value");

    const inputValue = inputValueText.value;
    console.log(inputValue);

    // input field Error handle Message();
    if (inputValue == "") {
        searchFeedbackMessage.innerHTML = `<h1 class="text-danger">please input first!</h1>`
        const displayQuote = document.getElementById('show-Quote');
        displayQuote.textContent = '';
    }

    // fetching the data from the server
    else {
        const url = `https://openlibrary.org/search.json?q=${inputValue}`;

        fetch(url)
            .then(response => response.json())
            .then(data => displaySearchResult(data))

        // toggle spinner and search result data
        toggleSpinner('block');
        toggleSearchResult('none');

        // clear previous search input value
        inputValueText.value = '';
    }


}


// keyboard enter button press event handler
document.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        searchBook();
    }
})



// display books data
const displaySearchResult = data => {

    const searchResult = document.getElementById("search-result");

    // clear all previous search results
    searchResult.textContent = '';

    const { numFound, docs } = data;
    const total = docs.length || 0;

    // search result response 
    document.getElementById("searchResultMessage").innerHTML = `
        <h1> ${numFound} results founds! you got ${total} </h1>
        `;

    if (total === 0) {

        document.getElementById("searchResultMessage").innerHTML = `
            <h1 class="text-danger">no result found!</h1>
            
            <img src="no-book-found.png" class="img-fluid" alt="no-book-found" />

        `;


    }

    // for each loop with validation
    docs.forEach(doc => {
        console.log("my search result console", doc);
        const div = document.createElement("div");
        div.classList.add('col');
        div.innerHTML = `
            
        <div class="card trans-card">
            <img src="https://covers.openlibrary.org/b/id/${doc.hasOwnProperty('cover_i') && doc.cover_i}-M.jpg" class="card-img-top w-50 mx-auto p-3" alt="${doc.hasOwnProperty('title') && doc.title.length && doc.title} cover">
            <div class="card-body">
                <h5 class="card-title fw-bold">${doc.hasOwnProperty('title') && doc.title.length && doc.title}</h5>
                <p class="card-text"> <span class="text-secondary" >by </span> ${doc.hasOwnProperty('author_name') && doc.author_name.length && doc.author_name[0]}</p>
                <p>
                    Published ${doc.hasOwnProperty('publish_date') && doc.publish_date.length && doc.publish_date[0]}
                    by ${doc.hasOwnProperty('publisher') && doc.publisher.length && doc.publisher[0]}
                </p>
                <p>Language: ${doc.hasOwnProperty('language') && doc.language.length && doc.language[0]} </p>
                <p>ISBN: ${doc.hasOwnProperty('isbn') && doc.isbn.length && doc.isbn[0]} </p>
                
                
            </div>
        </div>
    `;
        searchResult.appendChild(div);
    });

    // <span></span>

    toggleSpinner('none');
    toggleSearchResult('');

}


// new quotes function async-  await
// const getQuote = async () => {
//     const quote = await fetch('https://api.kanye.rest/');
//     console.log("quote", quote);    
// }
// getQuote();


// new quotes function
fetch('https://api.kanye.rest/')
    .then(res => res.json())
    .then(data => document.getElementById('show-Quote').innerHTML = `
        <h5>
        <i class="fas fa-quote-left"></i>   
                ${data.hasOwnProperty('quote') && data.quote.length && data.quote}
        <i class="fas fa-quote-right"></i> 
        </h5>
`)


// reloadPage function
const reloadPage = () => {
    window.location.reload();
}


// set current year automatically
document.getElementById("currentYear").innerHTML = new Date().getFullYear();


/* -----------------------------------------------------
             Book Archive JavaScript code end
-------------------------------------------------------*/