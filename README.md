# IPHive Backend

This is the backend service for IPHive, built with Express and TypeScript.

## Tech Stack

- Node.js
- Express
- TypeScript
- Nodemon (development only)
- Dotenv

## Setup Instructions

### Clone the repo

```bash
git clone https://github.com/Maistrade-OMobile/IPHiveBackend.git
cd IPHiveBackend
```

### Install dependencies

```bash
npm install
```

### Environment variables

Copy the `.env.example` file to `.env` and update values as needed:

```bash
cp .env.example .env
```

## Running the Project

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## Folder Structure

```
src/
├── config/         # environment configs, database
├── routes/         # route definitions
├── middlewares/    # middlewares (auth, error handling, etc.)
├── controllers/    # request handlers
├── services/       # business logic
├── utils/          # helpers
├── app.ts          # express app setup
└── server.ts       # entry point
```

## Base Route

```
GET http://localhost:5000/
```

Response:
```json
{
  "status": "success",
  "message": "Backend is up and running"
}
```
