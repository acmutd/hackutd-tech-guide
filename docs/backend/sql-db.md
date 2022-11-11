---
sidebar_position: 3
---

# SQL Databases

## Relational Databases

[Relational](https://cloud.google.com/learn/what-is-a-relational-database) Databases store data in a tabular way. Each column represents a property/attribute of the data that can be stored in the table. Each row is an actual entry/record that is currently stored in the table. 

| id | apartment    | address   | rent |sq ft | deadline |has gym|
| ---| -----------  | ----------|------|------|----------|-------|
| 0  | Lorem        | 1111 aaaa |$1500 |1234  | 2023-1-1 |false  |
| 1  | Ipsum        | 2222 bbb  |$2000 |1100  | 2022-12-1|true   |

## When to use Relational?

Relational is ideal when your data can be conveniently stored in the form of tables. You know ahead of time how many columns you need and the data type of each column.

*On the other hand, if you expect your data structure to change frequently, a [NoSQL Database](/backend/no-sql-db) may be a better fit.* NoSQL provides better flexibility in handling semi-structured and unstructured data.

## SQL

SQL – Structured Query Language – is a widely-used standard for storing, manipulating and retrieving data in a relational database.

## External Links

- [SQL Tutorial](https://www.tutorialspoint.com/sql/index.htm)
- [Next.js + PostgreSQL Login Example](https://vercel.com/guides/nextjs-prisma-postgres)