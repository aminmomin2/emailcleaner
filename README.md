# AI Personal Assistant – Full-Stack Architecture (Updated)

## GraphQL API

- The project now uses **GraphQL Mesh** as the unified GraphQL gateway.
- The API route `/api/graphql` proxies requests to the Mesh server (default: `http://localhost:4000/graphql`).
- Mesh is configured via `.meshrc.yaml` (see root directory).

## Running Mesh

1. Install dependencies:
   ```bash
   npm install @graphql-mesh/cli @graphql-mesh/runtime @graphql-mesh/config graphql-request
   ```
2. Start Mesh in development:
   ```bash
   npx mesh dev
   ```
   This will serve the GraphQL endpoint at `http://localhost:4000/graphql` and GraphiQL IDE at the same URL.

## Frontend

- Apollo Client has been removed.
- Use [`graphql-request`](https://github.com/jasonkuhrt/graphql-request) for all GraphQL queries/mutations.
- See `src/app/page.tsx` for an example of using `graphql-request`.

## Development Tools

- Use the [GraphiQL IDE](https://github.com/graphql/graphiql) at `http://localhost:4000/graphql` for query testing and schema exploration.

## Configuration

- See `.meshrc.yaml` for Mesh source configuration (currently set up for MySQL).
- Update credentials and sources as needed for your environment.

## Migration Notes

- All Apollo Client/Server code has been removed.
- The API route now acts as a proxy to Mesh.
- Update your environment variables as needed (e.g., `MESH_URL`).

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
