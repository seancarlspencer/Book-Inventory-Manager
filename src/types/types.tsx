export type bookType = {
    title: string;
    author: string;
    isbn: string;
    rating: number;
};

export type BookCompType = {
    bookList: Array<bookType>;
    setBookList: Function;
};
