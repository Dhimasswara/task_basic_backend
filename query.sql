-- ----------------------------------------
-- -- TABLE CUSTOMER --
-- ----------------------------------------

create type jk as enum ('male','female');

Create table customer (
    id_customer varchar(255) not null primary key,
    fullname varchar(255) not null,
    gender jk not null,
    phone varchar(25) not null,
    email varchar(255) not null,
    password varchar(255) not null,
    dob date,
    role varchar not null
);


-- ----------------------------------------
-- -- TABLE SELLER --
-- ----------------------------------------

create table seller (
    id_seller varchar(255) not null primary key,
    fullname varchar(255) not null,
    gender jk not null,
    phone varchar(25) not null,
    email varchar(255) not null,
    password varchar(255) not null,
    dob date,
    role varchar not null
);


-- -----------------------------------------
-- -- TABLE CATEGORY -- 
-- -----------------------------------------

create table category (
    id_category int not null primary key,
    name_category varchar(255) not null
)

-- -----------------------------------------
-- -- TABLE PRODUCT --
-- -----------------------------------------

create table product (
    id_products varchar primary key,
    name varchar(255) not null,
    stock int not null,
    price int not null,
    photo varchar(255) not null,
    description varchar(255) not null,
    id_category int,
    CONSTRAINT fk_category FOREIGN KEY (id_category) REFERENCES category(id_category)
);


select product.* , category.name from product inner join category ON product.name=category.name;
select products.*, category.names_category, seller.names_seller from ((products inner join category using (id_category)) inner join seller using (id_seller)) WHERE product.name LIKE '%${searchParam}%' ORDER BY ${sortBY} ${sort} LIMIT ${limit} OFFSET ${offset}