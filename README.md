# Quer-Apostar-Quanto

Desafio técnico, onde deveria ser implementado o back-end de um sistema de apostas de uma casa de apostas.

## Technologies Used

<p>
<img src="https://img.shields.io/badge/Node.js-339933.svg?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
<img src="https://img.shields.io/badge/Nodemon-76D04B.svg?style=for-the-badge&logo=Nodemon&logoColor=white"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white"/>
<img src="https://img.shields.io/badge/.ENV-ECD53F.svg?style=for-the-badge&logo=dotenv&logoColor=black"/>
<img src="https://img.shields.io/badge/PostgreSQL-4169E1.svg?style=for-the-badge&logo=PostgreSQL&logoColor=white"/>
</p>
<img src="https://img.shields.io/badge/Prisma-2D3748.svg?style=for-the-badge&logo=Prisma&logoColor=white"/>
</p>

## How to run for development

1. Clone the Repository: Clone this repository to your local machine.

```
https://github.com/Eduardo-JP-Ferreira/-Quer-Apostar-Quanto-.git
```

2. Install Dependencies: Navigate to the project directory and install the required dependencies.

```
cd -Quer-Apostar-Quanto-
npm install
```

3. Populate `.env` file based on `.env.example`.

4. Run Prisma Migrations.

```
npm run migration:run
```

5. Run the Application: Start the development server to run the React application.

```
npm run dev
```

## How to run tests

1. Follow the steps in the last section
2. Populate `.env.test` file based on `.env.example`.
3. Run all migrations:

```bash
npm run test:migration:run
```

4. Run test:

```bash
npm run test
```
