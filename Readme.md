# BrewApp RestAPI BOOK CRUD

This is a Node.js server built with TypeScript and Express. CRUD operation or set of endpoint to manage books data with mongodb 


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- Yarn

### Installing

1. Clone the repository
    ```bash
    git clone https://github.com/lohargaurav00/brewapp-api.git
    ```

2. Install NPM packages
    ```bash
    yarn install
    ```

3. Set Environment variables
    - Rename `.env.example` to `.env` and add your `MONGO_DB_URL` to .env.

4. Start the development server
    ```bash
    yarn dev
    ```
    Note: The development server should start on port `8000` or `5000`.

## Considerations

- This API is designed to be deployed on Vercel. The `api` & `public` folder is specifically for Vercel deployment considerations.
- For local development, the server will start on port 8000 or 5000 from `src/index.ts`.
- Please ensure that you have set up the correct environment variables in the `.env` file before starting the server.

## API Endpoints

The server provides the following endpoints:
| Method | Endpoint                  | Description                                               | Accepts                          |
|--------|---------------------------|-----------------------------------------------------------|----------------------------------|
| POST   | /api/add-book             | Adds a new book                                           | JSON (title, author, summary)    |
| GET    | /api/view-all-books       | Returns a list of all books                               | -                                |
| GET    | /api/find-book            | Returns a list of books with a query id or title or author| Query Params (id, title, author) |
| PATCH  | /api/update-book          | Updates a book with a param id and return response message| Param(:id) , JSON (title, author, summary)|
| DELETE | /api/delete-book          | Deletes a book with a param id and return response message| Param(:id)                       |

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

## Authors

- Gaurav D. Lohar
