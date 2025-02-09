document.addEventListener("DOMContentLoaded", () => {
    // Global variables and elements
    const quotes = [
        { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
        { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
        { text: "Your time is limited, so don't waste it living someone else's life.", category: "Inspiration" },
        { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Success" },
        { text: "Do what you can, with what you have, where you are.", category: "Motivation" }
    ];
    const quoteDisplay = document.getElementById("quoteDisplay");
    const categoryFilter = document.getElementById("categoryFilter");
    let lastViewedIndex = parseInt(sessionStorage.getItem('lastQuoteIndex')) || 0;

    // Function to display a random quote
    function showRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];
        quoteDisplay.innerHTML = `
            <p>"${randomQuote.text}"</p>
            <small>- ${randomQuote.category}</small>
        `;
    }

    function filterQuotes() {
        const selectedCategory = categoryFilter.value;
        localStorage.setItem("lastSelectedCategory", selectedCategory);
        
        if (selectedCategory === "all") {
          showRandomQuote();
        } else {
          // Filter quotes that match the selected category
          const filteredQuotes = quotes.filter(q => q.category === selectedCategory);
          if (filteredQuotes.length > 0) {
            // Display a random quote from the filtered set
            const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
            const quote = filteredQuotes[randomIndex];
            quoteDisplay.innerHTML = `
              <p>"${quote.text}"</p>
              <small>- ${quote.category}</small>
            `;
          } else {
            quoteDisplay.innerHTML = "<p>No quotes available for this category.</p>";
          }
        }
      }
    
      // Function to populate the category filter dropdown dynamically
      function populateCategories() {
        // Clear current options and add default "all"
        categoryFilter.innerHTML = `<option value="all">All Categories</option>`;
        // Extract unique categories from quotes
        const uniqueCategories = new Set(quotes.map(q => q.category));
        uniqueCategories.forEach(category => {
          const option = document.createElement("option");
          option.value = category;
          option.textContent = category;
          categoryFilter.appendChild(option);
        });
        // Restore last selected category (if any)
        const lastSelected = localStorage.getItem("lastSelectedCategory");
        if (lastSelected) {
          categoryFilter.value = lastSelected;
        }
      }
    
    // Function to show the next quote (cycling)
    function showNextQuote() {
        lastViewedIndex = (lastViewedIndex + 1) % quotes.length;
        const nextQuote = quotes[lastViewedIndex];
        quoteDisplay.innerHTML = `
            <p>"${nextQuote.text}"</p>
            <small>- ${nextQuote.category}</small>
        `;
        sessionStorage.setItem('lastQuoteIndex', lastViewedIndex);
    }

    // Function to save quotes to localStorage
    function saveQuotes() {
        localStorage.setItem('quotes', JSON.stringify(quotes));
    }

    // Function to load quotes from localStorage (if any)
    function loadQuotes() {
        const storedQuotes = JSON.parse(localStorage.getItem('quotes') || '[]');
        if (storedQuotes.length > 0) {
            // Replace our default quotes with stored quotes
            quotes.splice(0, quotes.length, ...storedQuotes);
        }
    }

    // Function to add a new quote
    function addQuote(quoteText, quoteCategory) {
        if (quoteText.trim() === '' || quoteCategory.trim() === '') {
            alert('Please enter both a quote and a category');
            return;
        }
        quotes.push({ text: quoteText, category: quoteCategory });
        saveQuotes();
        alert("Quote added successfully!");
    }

    // Function to export quotes as a JSON file
    function exportQuotes() {
        const quotesJSON = JSON.stringify(quotes, null, 2);
        const blob = new Blob([quotesJSON], { type: "application/json" });
        const url = URL.createObjectURL(blob);
       
        const a = document.createElement("a");
        a.href = url;
        a.download = "quotes.json";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Function to import quotes from a JSON file
    function importFromJsonFile(event) {
        const fileReader = new FileReader();
        fileReader.onload = function(e) {
            const importedQuotes = JSON.parse(e.target.result);
            quotes.push(...importedQuotes);
            saveQuotes();
            alert('Quotes imported successfully!');
        };
        fileReader.readAsText(event.target.files[0]);
    }

    // Create Export Button
    const exportButton = document.createElement("button");
    exportButton.textContent = "Export Quotes";
    document.body.appendChild(exportButton);
    exportButton.addEventListener('click', exportQuotes);

    // Set up the file import input (should be in HTML)
    document.getElementById("importFile").addEventListener("change", importFromJsonFile);
    populateCategories(); // Populate the filter dropdown based on current quotes
    categoryFilter.addEventListener("change", filterQuotes);
   
    // Create Add Quote Form
    function createAddQuoteForm() {
        const formContainer = document.createElement('div');
        formContainer.innerHTML = `
            <h2>Add a New Quote</h2>
            <input type="text" id="quoteText" placeholder="Enter quote text" required />
            <input type="text" id="quoteCategory" placeholder="Enter category" required />
            <button id="addQuoteButton">Add Quote</button>
        `;
        document.body.appendChild(formContainer);

        document.getElementById('addQuoteButton').addEventListener('click', () => {
            const text = document.getElementById('quoteText').value;
            const category = document.getElementById('quoteCategory').value;
            addQuote(text, category);
            // Clear fields after adding
            document.getElementById('quoteText').value = "";
            document.getElementById('quoteCategory').value = "";
        });
    }

    // Event listener for the "Show New Quote" button
    document.getElementById("newQuote").addEventListener("click", showRandomQuote);

    // Initialization on DOMContentLoaded
    loadQuotes();
    populateCategories();
    showRandomQuote();
    createAddQuoteForm();
});
