import React from "react";
import { BookCompType, bookType } from "../../src/types/types";
import BookDisplay from "./BookDisplay";
import BookSearch from "./BookSearch";
import "../styling/book.scss";

const BookInventoryManager: React.FC<BookCompType> = ({ bookList, setBookList }) => {
    function removeBook(book: bookType, index: number) {
        // Confirm we are removing the correct book by checking the ISBN, then update the list, setting it as local storage as well.
        let tempBookList = [...bookList];
        tempBookList = tempBookList.filter((b, i) => {
            // Keeps every book aside from the index that was requested for removal.
            if (i !== index) {
                return true;
            } else {
                if (book.isbn == b.isbn) {
                    return false;
                }
            }
        });
        setBookList(tempBookList);
        localStorage.setItem("bookList", JSON.stringify(tempBookList));
    }

    function updateRating(book: bookType, index: number, newRating: number) {
        // Confirm we are updating the rating of the correct book by checking the ISBN, then update the list, setting it as local storage as well.
        let tempBookList = [...bookList];
        if (tempBookList[index].isbn == book.isbn) {
            tempBookList[index].rating = newRating;
            setBookList(tempBookList);
        }
        setBookList(tempBookList);
        localStorage.setItem("bookList", JSON.stringify(tempBookList));
    }

    return (
        <div className="inventory-manager">
            <BookSearch bookList={bookList} setBookList={setBookList} />
            <div className="book-list-area">
                <div className="book-list-container">
                    {/* Iterate through the booklist and render each book in the Book Display component */}
                    {bookList.map((book, index) => {
                        return (
                            <BookDisplay
                                key={`${book.isbn}-${index}`}
                                book={book}
                                index={index}
                                removeBook={removeBook}
                                updateRating={updateRating}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default BookInventoryManager;
