# BrewApp RESTful API for Book CRUD Operations

This Node.js server, developed with TypeScript and Express, provides a robust set of CRUD operations to manage book data stored in a MongoDB database.

## Getting Started

Follow these instructions to set up the project on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following software installed on your system:

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/lohargaurav00/brewapp-api.git
    ```

2. Install the necessary packages:

    ```bash
    yarn install
    ```

3. Configure Environment Variables

   - Rename the `.env.example` file to `.env` and add your MongoDB connection URL to the `.env` file.

4. Start the Development Server:

    ```bash
    yarn dev
    ```

    Note: The development server will start on port `8000` or `5000`.

## Considerations

- This API is designed with Vercel deployment in mind, and it includes special folders (`api` and `public`) for Vercel deployment considerations.
- For local development, the server runs on port 8000 or 5000 as specified in `src/index.ts`.
- Make sure you've configured the correct environment variables in the `.env` file before starting the server.

## API Endpoints

The server offers the following RESTful endpoints:

| Method | Endpoint               | Description                                | Accepts                        |
|--------|------------------------|--------------------------------------------|--------------------------------|
| POST   | /api/add-book          | Add a new book                             | JSON (title, author, summary)  |
| GET    | /api/view-all-books    | Retrieve a list of all books               | -                              |
| GET    | /api/find-book         | Find books based on id, title, or author   | Query Parameters (id, title, author) |
| PATCH  | /api/update-book       | Update a book by id and return a response  | Param(:id), JSON (title, author, summary) |
| DELETE | /api/delete-book       | Delete a book by id and return a response  | Param(:id)                     |
          
## Scripts 

- Start development server: `yarn dev`
- Run dry server: `yarn start`
- For production build: `yarn build`
- Start build server: `yarn serve`

## Built With

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Mongoose](https://mongoosejs.com/)

## Live API

The API is hosted at [https://brewapp-api.vercel.app/](https://brewapp-api.vercel.app/)

## Authors

- Gaurav D. Lohar