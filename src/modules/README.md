# src/modules

## Code Organization

Code should be organized into directories representing modules. Each module (as a guide) should replicate the root `src` directories structure.

Modules should be encapsulated from each other by leveraging [Fastify's Encapsulation](https://fastify.dev/docs/latest/Reference/Encapsulation/) model through the use of plugins. In other words, modules should not share services nor data. Allowing modules to read and/or modify each others data can lead to inconsistencies in the data as well as incorrect assumptions about their schemas.

In the event that there is code common to multiple modules, create a plugin with [fastify-plugin](https://github.com/fastify/fastify-plugin) in `src/common/plugins` so that [fastify-autoload](https://github.com/fastify/fastify-autoload) can automatically register it. Once the plugin has been created, don't forget to update env.d.ts with type information for any decorated functions or objects utilized by your new plugin. The plugin should now be accessible across your project.

## Additional Information

In addition to the benefits provided by keeping code encapsulated, there is an additional architectural benefit that comes with this flexibility. By using this modular organizational structure, it allows for straightforward extraction of modules/services into their own individual microservices, if needed.

As a reference, a video link is provided to Matteo Collina (the creator of Fastify) talking about the modularity and flexibility that fastify grants: [Building a modular monolith with Fastify - Matteo Collina, Node Congress 2023](https://www.youtube.com/watch?v=e1jkA-ee_aY)
