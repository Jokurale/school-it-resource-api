<div align="center" ><img src="https://i.ibb.co/pRD9nNz/school-it-resource-server-logo.png"/></div>
<br />

# school-it-resource-api 🌀

◼ Integrated with [_school-it-auth-server_](https://github.com/Jokurale/school-it-auth-server)

## About project 🧧

School-like API written during free time. Wanted to find out what am I capable of as well. <br>
Lots of data models, many design patterns, lot's of overhead code in exchange for modularity

Soon, it will be dockerized and used as real-life example of school-it school-management web app. <br>

Tons of hours spent writting more and more lines of code thought me enormous amounts of things. <br>
From kinda 'production' way of using project's file structure, through utilizing knowledge to make
development easier (Service and Validator Factorise) and writing tests, ending with ability to spot the smallest possible mistakes, bug-prone sections - oh now I notice A LOT

## Backend implementation model 🗂

Graphical representation will be available at README.ME of this [repo](https://github.com/Jokurale/school-it)

## Installation process 🔨

- Clone or download and extract repo
- Make sure your npm is up to date
- Install all depenedencies via:
  ```bash
  npm install
  ```
- If everything's fine, launch your database CLI and create _school_management_ (will be changed soon) database
- Put DB connection URI inside .env file
- Now's time for Prisma, run:
  ```bash
  npx prisma db push
  ```
  > Disclaimer: Command above introspects the database to infer and executes the changes required to make your database schema reflect the state of your Prisma schema
- Now we should seed database with **default users** _(defined inside defaults.js)_ and all kind of mock data using:
  ```bash
  npx run seed
  ```
  > Database will be regenerated to make sure it's empty, then, if everything's fine, seeder will be lanuched.

* After seeding process have been completed, we should check our's mock data, time for Prisma Studio:
  ```bash
  npx run studio
  ```
  > Interactive Prisma Client should be launched under http://localhost:5555

<br>

- _DONE!_ 🎉
  <br>

## Potential further changes 🧭

- Permission system - Redis-based per-path ACL
- App cache
- Reduce amount of repetitive code sections (Keep it DRY) - oh lot's of em (controllers)

## Tests 📊

```bash
npm run test
```

> Mocha test runner will run all \*_/_.test.ts files from "./tests" directory

## Built With 📐

- node.js
- bcrypt
- cors
- dotenv
- express
- express-rate-limit
- helmet
- jsonwebtoken
- joi
- morgan
- mocha
- mysql2
- prisma 🙏
- chai
- chai-http
- chalk
- faker
- nodemon
