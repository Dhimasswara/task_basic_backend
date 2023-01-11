-- ----------------------------------------
-- -- TABLE CUSTOMER --
-- ----------------------------------------

create type jk as enum ('male','female');

Create table customer (
    id_customer int not null primary key,
    name varchar(255) not null,
    phone varchar(25) not null,
    password varchar(255) not null,
    email varchar(255) not null,
    gender jk not null,
    dob date
);

insert into customer (id_customer, name, phone, password, email, gender, dob) values (1, 'Dhimas', '085832095871','satusatu','dhimasswara08@gmail.com','male','2001-01-08');
insert into customer (id_customer, name, phone, password, email, gender, dob) values (2, 'Sterling', '085832095123','satudua','sterling@gmail.com','male','2010-10-18');


-- ----------------------------------------
-- -- TABLE SELLER --
-- ----------------------------------------

create table seller (
    id_seller int not null primary key,
    name varchar(255) not null,
    phone varchar(25) not null,
    password varchar(255) not null,
    email varchar(255) not null,
    gender jk not null,
    dob date
);

insert into seller (id_seller, name, phone, password, email, gender, dob) values (1, 'Jhony','08228899001', 'satudua','jhony@gmail.com','male','1995-01-08');
insert into seller (id_seller, name, phone, password, email, gender, dob) values (2, 'Hanson','08228822001', 'satusatu','handson@gmail.com','male','2005-02-18');

-- -----------------------------------------
-- -- TABLE CATEGORY -- 
-- -----------------------------------------

create table category (
    id_category int not null primary key,
    name_category varchar(255) not null
)

insert into category ( id_category, name_category ) values (1, 'Laptop');

-- -----------------------------------------
-- -- TABLE PRODUCT --
-- -----------------------------------------

create table product (
    id_product int not null primary key,
    name varchar(255) not null,
    price int not null,
    deskripsi varchar(255) not null,
    stock int not null,
    rating int,
    color varchar(255) not null,
    size int,
    id_category int,
    id_seller int,
    CONSTRAINT fk_category FOREIGN KEY (id_category) REFERENCES category(id_category),
    CONSTRAINT fk_seller FOREIGN KEY (id_seller) REFERENCES seller(id_seller)
);

insert into product (id_product, name, price, deskripsi, stock, rating, color, size, id_category, id_seller) values (2, 'Macbook Air 2022', 2000000, 'Dolar', 10, 5, 'Grey',1,(select id_category from category where id_category = 1),(select id_seller from seller where id_seller = 1));

