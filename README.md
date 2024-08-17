# SportStock - Sports Inventory Management System

![SportStock Logo](https://raw.githubusercontent.com/yourusername/SportStock/main/SportStock_client/public/baseball.svg)

## Overview

SportStock is a comprehensive inventory management system designed specifically for sports retailers. It helps businesses track inventory, manage sales, and streamline operations across multiple branches. The application features role-based access control, real-time inventory updates, and advanced reporting capabilities.


🔗 **Live Demo:** [https://sport-stock.netlify.app](https://sport-stock.netlify.app)



## Features

- **User Authentication & Authorization**
  - Role-based access (Super Admin, Admin, Branch Manager, Seller)
  - Secure login with JWT
  - Password recovery system

- **Inventory Management**
  - Real-time stock tracking
  - Low stock alerts
  - Product categorization
  - Multi-branch inventory management

- **Sales & Reporting**
  - Sales tracking
  - Performance analytics
  - Customizable reporting
  - Data visualization

- **Responsive Design**
  - Optimized for desktop and mobile devices
  - Dark mode support

## Tech Stack

### Frontend
- React with TypeScript
- Redux Toolkit for state management
- React Router for navigation
- Tailwind CSS for styling
- React Hook Form for form validation

### Backend
- Node.js with Express
- MongoDB for database
- JWT for authentication
- RESTful API architecture

## Getting Started

### Prerequisites
- Node.js (v14.x or higher)
- MongoDB (v4.x or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/SportStock.git
cd SportStock
```

2. Install dependencies for both client and server
```bash
# Install server dependencies
cd SportStock_server
npm install

# Install client dependencies
cd ../SportStock_client
npm install
```

3. Set up environment variables:
   - Create `.env` files in both client and server directories using the provided `.env.example` templates

4. Start the development servers
```bash
# Start the server (from SportStock_server directory)
npm run dev

# Start the client (from SportStock_client directory)
npm run dev
```

## Project Structure

```
SportStock/
├── SportStock_client/         # Frontend React application
│   ├── public/
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Page components
│   │   ├── layouts/           # Layout components
│   │   ├── redux/             # Redux store and slices
│   │   ├── routes/            # Application routes
│   │   ├── utils/             # Utility functions
│   │   └── types/             # TypeScript type definitions
│   └── package.json
│
└── SportStock_server/         # Backend Node.js application
    ├── src/
    │   ├── app/
    │   │   ├── modules/       # Feature modules
    │   │   ├── middlewares/   # Express middlewares
    │   │   ├── utils/         # Utility functions
    │   │   └── errors/        # Error handling
    │   ├── config/            # Configuration files
    │   └── server.js          # Server entry point
    └── package.json
```

## API Documentation

API documentation is available at `/api-docs` when running the development server.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Special thanks to all contributors and mentors
- Inspiration from leading inventory management systems
