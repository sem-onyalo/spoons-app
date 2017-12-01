create table usr (
    id serial primary key,
    first_name varchar(127) not null,
    last_name varchar(127) not null
);

create table question (
    id serial primary key,
    text varchar(255) not null
);

create table question_series (
    id uuid primary key,
    user_id int references usr(id),
    series_timestamp timestamp default current_timestamp not null
);

create table answer (
    id serial primary key,
    rating real not null,
    text varchar(127) not null,
    image_url varchar(255)
);

create table answer_for_question (
    id serial primary key,
    question_id int references question(id) on delete cascade,
    answer_id int references answer(id)
);

create table answer_next_question (
    id serial primary key,
    answer_id int references answer(id) on delete cascade,
    question_id int references question(id)
);

create table user_answer (
    id serial primary key,
    series_id uuid references question_series(id),
    answer_id int references answer(id) on delete cascade,
    answer_timestamp timestamp default current_timestamp not null
);

create table bootstrap (
    id serial primary key,
    user_id int references usr(id) unique,
    question_id int references question(id) on delete cascade
);