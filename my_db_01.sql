# 创建数据库 my_db_01
create database if not exists `my_db_01`;

# 创建 ev_users 表
create table `ev_users` (
    id int not null auto_increment primary key,
    username varchar(255) not null,
    `password` varchar(255) not null,
    nickname varchar(255) null,
    email varchar(255) null,
    user_pic text null
)engine=InnoDB;

# 添加数据
insert into `ev_users` (username,`password`) values ('admin', '666666')