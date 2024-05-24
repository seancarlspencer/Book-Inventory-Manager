import React from "react";
import { bookType } from "../../src/types/types";

type BookDisplayType = {
    book: bookType;
    index: number;
    removeBook: Function;
    updateRating: Function;
};

const BookDisplay: React.FC<BookDisplayType> = ({ book, index, removeBook, updateRating }) => {
    return (
        <div className="book-container">
            {/* Display divs for each variable in bookType, then render the innerHTML based on book */}
            <div className="title">{book.title}</div>
            <div className="author">Author: {book.author}</div>
            <div className="isbn">ISBN: {book.isbn}</div>
            <div className="star-container rating">
                <div className="star-container-hover"></div>
                {[1, 2, 3, 4, 5].map((rawRating, i) => {
                    // Only display up to 5 stars.  Apply styling if the rating value of the star is lower than or equal to the book's rating.  E.g. if the rating is 3, then stars 1, 2, and  3 will be highlighted.
                    // This behavior changes on hover, and is overridden by CSS hover rules.
                    return (
                        <div
                            key={`star-${i}`}
                            className={`star${rawRating <= book.rating ? " default" : ""}`}
                            onClick={() => {
                                updateRating(book, index, rawRating);
                            }}
                        ></div>
                    );
                })}
            </div>
            <div
                className="cover"
                style={{
                    backgroundImage: `url("https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg")`,
                }}
            ></div>
            <div className="delete">
                <button
                    onClick={() => {
                        removeBook(book, index);
                    }}
                >
                    Delete Book
                </button>
            </div>
        </div>
    );
};

export default BookDisplay;
