# Monolith - Project Management Platform

Monolith is a comprehensive project management platform designed for freelancers and clients to collaborate effectively, manage projects efficiently, and exceed expectations.

## Features

- **Project Management**: Easily organize and track all your projects in one place.
- **Client Management**: Keep track of client information and interactions seamlessly.
- **Task Management**: Create, assign, and monitor tasks directly through the platform.
- **Collaboration Tools**: Improve communication between freelancers and clients.
- **Project Timeline**: Visualize project progress with an intuitive timeline view.
- **Comments System**: Enable discussions and feedback on projects and tasks.
- **Online/Offline Toggle**: Control project visibility to clients.
- **Responsive Design**: Access the platform on various devices with a mobile-friendly interface.

## Technology Stack

### Frontend (Next.js)
- **Framework**: Next.js with TypeScript
- **Authentication**: Auth0
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Date Handling**: Moment.js
- **Icons**: Font Awesome

### Backend (Node.js)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Auth0
- **File Storage**: Supabase Storage
## Getting Started

### Prerequisites
- Node.js (v14 or later)
- MongoDB
- Auth0 account
- Supabase  account (for storage)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/IvanSmir/monolith-mern.git
   cd monolith
   ```

2. Install dependencies for both client and server
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```

3. Set up environment variables:
   - Copy `.env.local.example` to `.env.local` in the client directory
   - Copy `.env.example` to `.env` in the server directory
   - Fill in the required details in both files
     
4. Start the development servers:
   - For the client:
     ```bash
     cd client && npm run dev
     ```
   - For the server:
     ```bash
     cd server && npm run dev
     ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
