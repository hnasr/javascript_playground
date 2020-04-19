CREATE TABLE public.session_auth
(
    username text COLLATE pg_catalog."default",
    password text COLLATE pg_catalog."default",
    role text COLLATE pg_catalog."default",
    sessionid text COLLATE pg_catalog."default"
)

TABLESPACE pg_default;

ALTER TABLE public.session_auth
    OWNER to postgres;

 



 CREATE TABLE public.jwt_auth
(
    username text COLLATE pg_catalog."default",
    password text COLLATE pg_catalog."default",
    role text COLLATE pg_catalog."default",
    token text COLLATE pg_catalog."default")

TABLESPACE pg_default;

ALTER TABLE public.jwt_auth
    OWNER to postgres;

 