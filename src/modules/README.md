# src/features

[Building a modular monolith with Fastify - Matteo Collina, Node Congress 2023](https://www.youtube.com/watch?v=e1jkA-ee_aY)

Code should be organized by features. Each feature should be encapsulated from the others. In other words, features should not share services nor data.
Allowing features to read and modify eachothers data can lead to inconsistencies in data and incorrect assumptions about those schemas.
