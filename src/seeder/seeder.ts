import { db } from "../config/database";

db.query(
  "INSERT INTO books (book_id, title, author, stocks) VALUES ('JK-45','Harry Potter','J.K Rowling', 5), ('SHR-1','A Study in Scarlet','Arthur Conan Doyle', 1), ('TW-11','Twilight','Stephenie Meyer', 1), ('HOB-83','The Hobbit, or There and Back Again','J.R.R. Tolkien', 1), ('NRN-7','The Lion, the Witch and the Wardrobe','C.S. Lewis', 1)"
)
  .then((res) => console.log("Success INSERT Data"))
  .catch((err) => console.log(err));
