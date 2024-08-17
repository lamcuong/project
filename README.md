# ExpenseManagement

### Tech stack

- TypeScript
- ExpressJS
- Mongoose
- NextJS
- Tailwind CSS
- Zustand
- Shadcn/ui

## Project structure
```
├── apps
│   ├── backend
│   │   ├── project.json
│   │   └── tsconfig.json
│   └── frontend
│       ├── project.json
│       └── tsconfig.json
├── libs
│   └── shared
│       ├── project.json
│       └── tsconfig.json
├── docker-compose.yml
├── nx.json
├── package-lock.json
└── package.json
```
## Local setup

### Docker compose

If you want to run database in your local machine you can use Docker.

1. Install Docker [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)

2. In the root folder run this command

```sh
docker compose up
```

## Scripts:
```bash
npm i

# Run build both backend and frontend to bundles
npm run build

# Run both backend and frontend at local
npm run dev

# Run lint on both backend and frontend
npm run lint

# Run start on a project
npx nx dev frontend
npx nx dev backend

# See graph of project
npm run nx:graph
