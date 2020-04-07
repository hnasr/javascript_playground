-- Table: public.auth_method1

-- DROP TABLE public.auth_method1;

CREATE TABLE public.auth_method1
(
    username text COLLATE pg_catalog."default",
    password text COLLATE pg_catalog."default"
)

TABLESPACE pg_default;

ALTER TABLE public.auth_method1
    OWNER to postgres;


-- Table: public.auth_method2

-- DROP TABLE public.auth_method2;

CREATE TABLE public.auth_method2
(
    username text COLLATE pg_catalog."default",
    password text COLLATE pg_catalog."default"
)

TABLESPACE pg_default;

ALTER TABLE public.auth_method2
    OWNER to postgres;


-- Table: public.auth_method3

-- DROP TABLE public.auth_method3;

CREATE TABLE public.auth_method3
(
    username text COLLATE pg_catalog."default",
    password text COLLATE pg_catalog."default",
    salt text COLLATE pg_catalog."default"
)

TABLESPACE pg_default;

ALTER TABLE public.auth_method3
    OWNER to postgres;



-- Table: public.auth_method4

-- DROP TABLE public.auth_method4;

CREATE TABLE public.auth_method4
(
    username text COLLATE pg_catalog."default",
    password text COLLATE pg_catalog."default"
)

TABLESPACE pg_default;

ALTER TABLE public.auth_method4
    OWNER to postgres;



-- Table: public.auth_method5

-- DROP TABLE public.auth_method5;

CREATE TABLE public.auth_method5
(
    username text COLLATE pg_catalog."default",
    userdata text COLLATE pg_catalog."default"
)

TABLESPACE pg_default;

ALTER TABLE public.auth_method5
    OWNER to postgres;

    