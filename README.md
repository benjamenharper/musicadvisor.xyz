# MusicAdvisor

A headless WordPress blog focused on music promotion and industry news. Built with Next.js 13+ and WordPress REST API.

## Features

- Modern, responsive design
- Headless WordPress integration
- Category-based content organization
- Featured posts section
- Newsletter subscription
- Dark mode support

## Tech Stack

- Next.js 13+ (App Router)
- TypeScript
- Tailwind CSS
- WordPress REST API
- date-fns for date formatting

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/yourusername/musicadvisor.xyz.git
cd musicadvisor.xyz
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
Create a `.env.local` file in the root directory and add your WordPress URL:
```env
NEXT_PUBLIC_WORDPRESS_URL=your-wordpress-url
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/app` - Next.js 13+ app directory containing routes and page components
- `/components` - Reusable React components
- `/lib` - Utility functions and API handlers
- `/public` - Static assets
- `/styles` - Global styles and Tailwind CSS configuration

## License

MIT License - feel free to use this project for your own purposes.
