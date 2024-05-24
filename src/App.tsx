import { useEffect, useState } from "react";
import "../src/styling/global.scss";
import BookInventoryManager from "./components/BookInventoryManager";
import { bookType } from "../src/types/types";

function App() {
    const [bookList, setBookList] = useState<Array<bookType>>([]);

    useEffect(() => {
        // Call only once to get the book list from local storage.  Use this value to set the State, otherwise, leave as an empty array to be populated later.
        let localBookList = localStorage.getItem("bookList");

        if (localBookList) {
            let localBookListParsed = JSON.parse(localBookList);
            setBookList(localBookListParsed);
        }
    }, []);

    return (
        <main>
            {/* Although Book Inventory Manager is the main functionality of the site, there may be additional functionality added later, so it's better to have one component managing Inventory.  However, a user's booklist may be used in other components, which is why it's managed at the App level. */}
            <BookInventoryManager bookList={bookList} setBookList={setBookList} />
        </main>
    );
}

export default App;
