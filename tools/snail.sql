create table book
(
  id int not null auto_increment primary key,
  isbn varchar(20) not null, 
  openid varchar(50) not null,
  title varchar(100) not null,
  pic varchar(100) not null,
  summary varchar(1000) not null,
  author varchar(100) not null,
  price float not null
);