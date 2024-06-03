DDL

- Create Database

```raw
CREATE DATABASE db_technical_test_eigen
```

- Create Tables

```raw
CREATE TABLE members(
    member_id  SERIAL ,
    email VARCHAR (255) UNIQUE NOT NULL,
    password VARCHAR (255) NOT NULL,
    name VARCHAR (255) NOT NULL,
    datetime_blocked TIMESTAMP NULL,
    status BOOLEAN DEFAULT TRUE NOT NULL,
    PRIMARY KEY (member_id)
);

CREATE TABLE books(
    book_id VARCHAR (20),
    title VARCHAR (255) NOT NULL,
    author VARCHAR (100) NOT NULL,
    stocks INT  NOT NULL,
    PRIMARY KEY (book_id)
);

CREATE TABLE borrows(
    borrow_id SERIAL,
    member_id INT,
    book_id VARCHAR (20),
    datetime_borrow TIMESTAMP NOT NULL,
    datetime_return TIMESTAMP NOT NULL,
    PRIMARY KEY (borrow_id),
    CONSTRAINT fk_user
        FOREIGN KEY (member_id)
            REFERENCES members(member_id),
                ON DELETE CASCADE
    CONSTRAINT fk_book
        FOREIGN KEY (book_id)
            REFERENCES books(book_id)
);

```
