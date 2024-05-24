import React, { useState } from "react";
import { BookCompType } from "../../src/types/types";

const BookSearch: React.FC<BookCompType> = ({ bookList, setBookList }) => {
    // Search Text will contained the user's inputted string.
    // Searching will be true if the user is currently searching for a book, for rendering purposes.
    // Error will contain the error message if there is one.
    // isbnList will contain a list of all the ISBN numbers in the book list.  This is referenced for checking if a book has already been added to the list.
    const [searchText, setSearchText] = useState("");
    const [searching, setSearching] = useState(false);
    const [error, setError] = useState<string>("");
    const isbnList = bookList.map((book) => {
        return book.isbn;
    });

    function validateText() {
        // Ignore dashes, as they can be commonly left in ISBN numbers.
        let text = searchText.replace(/-/g, "");

        // Make sure the remaining text is a number.
        if (isNaN(parseInt(text))) {
            throw new Error("Please enter a valid ISBN number");
        }

        // Make sure the length is 10 or 13 characters, as ISBN numbers can only be that length.
        if (text.length != 10 && text.length != 13) {
            throw new Error("Invalid ISBN number length.  Please enter a number that is either 10 or 13 digits long.");
        }

        // Make sure the book is not already in the list of books
        if (isbnList.includes(text)) {
            throw new Error("This book is already in your inventory.");
        }
    }

    async function searchTextAPI(e: MouseEvent | React.FormEvent) {
        e.preventDefault();
        // Stops page from refreshing on form submit.
        setError("");
        setSearching(true);
        try {
            await validateText();
            fetch(`https://openlibrary.org/search.json?isbn=${searchText.replace(/-/g, "")}`)
                .then((res) => {
                    if (res?.ok) {
                        return res.json();
                    } else {
                        throw new Error(`HTTP Response Code: ${res?.status}`);
                    }
                })
                .then((data) => {
                    try {
                        if (data.numbFound == 0) {
                            throw new Error("Did not find book with matching ISBN");
                        }
                        let tempBookList = [...bookList];
                        let tempBook = {
                            title: data.docs[0].title ? data.docs[0].title : "N/A",
                            author: data.docs[0].author_name[0] ? data.docs[0].author_name[0] : "N/A",
                            isbn: searchText.replace(/-/g, ""),
                            rating: 0,
                        };
                        tempBookList.push(tempBook);
                        setBookList(tempBookList);
                        localStorage.setItem("bookList", JSON.stringify(tempBookList));
                        setSearching(false);
                    } catch (e: unknown) {
                        setError("Did not find book with matching ISBN");
                        setSearching(false);
                    }
                });
        } catch (e: unknown) {
            if (typeof e === "string") {
                setError(e);
            } else if (e instanceof Error) {
                e.message;
                setError(e.message);
            }
            setSearching(false);
        }
    }

    return (
        <form className="book-search" onSubmit={(e) => searchTextAPI(e)}>
            <div className="title">Book Inventory Manager</div>
            <input
                type="text"
                value={searchText}
                className="search-input"
                onChange={(e) => {
                    setSearchText(e.target.value);
                    setError("");
                    // Clear any error when user changes the search term.
                }}
                placeholder="ISBN Number"
            ></input>
            <button className="add-button" onClick={(e) => searchTextAPI(e)}>
                {searching ? "Searching..." : "Add Book"}
            </button>
            {error != "" ? <div className="error">{error}</div> : <></>}
        </form>
    );
};

export default BookSearch;
