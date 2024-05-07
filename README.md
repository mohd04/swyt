# swyt

This repository contains the source code for the SWYT application, which is split into a backend service using NestJS and a frontend service using Vue.js. The backend is connected to a PostgreSQL database, and both services are containerized using Docker.

## Prerequisites

Before you begin, ensure you have installed:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Project Structure

- `swyt-backend`: Contains the NestJS API service.
- `swyt-frontend`: Contains the Vue.js frontend application.
- `docker-compose.yml`: Docker Compose file to orchestrate the services.

## Quick Start

To get the application running locally:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/mohd04/swyt.git
   cd swyt

2. **Build and Run with Docker Compose

From the root directory, run:

```bash
docker-compose up --build

## Access the Application

- **Frontend**: Accessible at [http://localhost:8080](http://localhost:8080)
- **Backend API**: Accessible at [http://localhost:3000](http://localhost:3000)

## Services

### Nest-API

- **Port**: 3000
- Functionality:
  - Builds and serves the NestJS application.
  - Connects to the PostgreSQL database.

### Vue-App

- **Port**: 8080
- Functionality:
  - Serves the Vue.js frontend application.

### PostgreSQL

- **Port**: 5432
- Functionality:
  - Stores all application data.

## Docker Configuration

### Backend Dockerfile

- Features:
  - Uses a multi-stage build to compile TypeScript and minimize the production image size.
  - Runs migrations and seeds the database upon startup.

### Frontend Dockerfile

- Features:
  - Builds the Vue.js application and serves it using Nginx.
