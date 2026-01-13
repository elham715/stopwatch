# Joke Generator - Aesthetic Website

A beautiful and functional joke generator built with Next.js featuring stunning aesthetics and smooth animations.

## Features

- **Joke Generation**: Generate random jokes from a curated collection
- **Favorites System**: Save your favorite jokes for later viewing
- **Aesthetic Design**: Beautiful gradient backgrounds, animated blobs, and modern UI components
- **Responsive Layout**: Works seamlessly on mobile and desktop devices
- **API Integration**: Backend API routes for fetching and adding jokes
- **Smooth Animations**: Interactive elements with hover effects and transitions

## Tech Stack

- Next.js 16.1.1
- React 19.2.3
- TypeScript
- Tailwind CSS
- Next.js App Router

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── jokes/
│   │       └── route.ts        # API endpoints for jokes
│   ├── globals.css             # Global styles
│   └── page.tsx                # Main homepage
```

## API Endpoints

- `GET /api/jokes` - Fetch random jokes
  - Optional query params:
    - `category` - Filter by category
    - `count` - Number of jokes to return (default: 1)

- `POST /api/jokes` - Add a new joke
  - Request body: `{ text: string, category?: string }`

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Customization

You can customize the aesthetic elements by modifying:
- The gradient colors in `globals.css`
- The blob animations in the `page.tsx` style tag
- The color schemes in the JSX components

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.