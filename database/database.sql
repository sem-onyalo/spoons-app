create table usr (
    id serial primary key,
    age integer not null,
    name varchar(127) not null
);

create table label (
    id serial primary key,
    value varchar(63) not null
);

create table points (
    id serial primary key,
    user_id int references usr(id) on delete cascade,
    value real not null
);

create table question (
    id serial primary key,
    value varchar(255) not null,
    ordr smallint not null
);

create table answer (
    id serial primary key,
    create_timestamp timestamp default current_timestamp not null,
    question_id int references question(id) on delete cascade,
    user_id int references usr(id),
    rating real not null
);

create table answer_label (
    id serial primary key,
    create_timestamp timestamp default current_timestamp not null,
    answer_id int references answer(id) on delete cascade,
    label_id int references label(id),
    rating real not null
);
