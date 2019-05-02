# Dockerfile Template for Ruby on Rails
This program is a Dockerfile template optimized for developing Rails using docker.

## How to use

0. Prepare environmental variables.
  
```bash
cp .env.example .env
```

### Create new project

1. If you want to create a new project, please execute the following command.

```bash
$ docker-compose run web bundle exec rails new . --force --skip-bundle --database=mysql
```

2. Then execute the following command to create a container.

```bash
$ docker-compose build
```

3. And you should change `database.yml`.

```yml
default: &default
  adapter: mysql2
  encoding: utf8
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
  username: <%= ENV.fetch('MYSQL_USER') { 'root' } %>
  password: <%= ENV.fetch('MYSQL_PASSWORD') { 'root' } %>
  host: <%= ENV.fetch('MYSQL_HOST') { 'localhost' } %>

development:
  <<: *default
  database: <%= ENV.fetch('MYSQL_DATABASE') { 'test' } %>

test:
  <<: *default
  database: <%= ENV.fetch('MYSQL_DATABASE') { 'test' } %>

production:
  <<: *default
  database: <%= ENV.fetch('MYSQL_DATABASE') { 'test' } %>
  username: <%= ENV.fetch('MYSQL_USER') { 'test' } %>
  password: <%= ENV.fetch('MYSQL_PASSWORD') { 'test' } %>

```

4. Create a database
```bash
$ docker-compose run web bundle exec rails db:create
```

### Run an existing project
If you want to run a project that already exists, please execute the following command.

```bash
$ docker-compose build
```