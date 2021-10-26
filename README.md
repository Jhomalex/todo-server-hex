# todo server hex

This is a graphql server api for a simple todo application. The purpose of this project is test the ports and adapters architecture with TypeScript. It has the next features:
- Ports and adapters architecture.
- Graphql API with Apollo Server 3 and TypeGraphql.
- Graphql complexity manager.
- Authentication with JWT.
- Prisma ORM.


## Installation

1. Download the repository `git clone https://github.com/Jhomalex/todo-server-hex`
2. Install Node dependencies `npm install`
3. Rename the .example.env file with .env.test and set the variables with your data
4. Create a database with the name set in the .env.test file
5. Execute migrations `npm run prisma:migrate-test`
6. Generate Prisma types `npm run prisma:generate-test`
7. Run the project `npm run test`
