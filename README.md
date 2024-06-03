# API Borrows Book

## Specefication

```
 - Node Js
 - Express Js
 - Postgre SQL
```

## Installation

```raw
 - git clone https://github.com/komporbakar/technical-test-eigen.git
 - cd technical-test-eigen
 - npm install
 - npm run dev
```

## Endpoint

```raw
    - Register
    endpoint : '/api/v1/register',
    - Login
    endpoint : '/api/v1/login',
    - Borrows Book
    endpoint : '/api/v1/borrows',
    - Return Book
    endpoint : '/api/v1/return'
    - List Book
    endpoint : '/api/v1/book'
    - List Members
    endpoint : 'api/v1/members'
    - Vies Documentation Swagger
    endpoint: '/api-docs'
```

## DDL

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

## Unit Test

```raw
    npm run test
```

OR

```raw
    tested manually with unit testing per file
```
