# Lockshot Application

Lockshot is a comprehensive application designed for shooting sports enthusiasts. It provides tools for tracking training progress, engaging with a community of like-minded individuals, and leveraging AI-driven insights to improve shooting skills.

## Features

### Core Functionality
- **Shooting Training Tracker**: Log your shooting hits and analyze training data.
- **Community Interaction**: Real-time chat and discussions with other athletes.
- **Educational Resources**: Articles and videos on shooting techniques.
- **AI Assistant**: Personalized training tips based on user performance.

### Platforms
- Web Application: Built with React.js.
- Mobile Application: Developed using React Native (planned).

### Backend Architecture
- **API**: Developed with .NET Core.
- **Database**: PostgreSQL.
- **Real-Time Communication**: SignalR for chat and updates.
- **Caching**: Redis integration.
- **Microservices**:
  - `Lockshot.User.API`
  - `Lockshot.Channels.API`
  - `Lockshot.Client.Web.API`
  - `Lockshot.Bot.API`

## Tech Stack

### Frontend
- **React.js**: For the web interface.
- **Material-UI**: Component library for consistent design.
- **Redux**: State management.

### Backend
- **.NET Core**: For scalable and robust server-side logic.
- **PostgreSQL**: For storing user data and statistics.
- **Redis**: For caching frequently accessed data.
- **SignalR**: Real-time communication.

### Deployment
- Docker for containerization and orchestration.
- Vite for fast frontend builds.

## Installation

### Prerequisites
- Node.js (v16+)
- npm (v7+)
- .NET SDK (v6.0+)
- Docker

### Backend Setup
1. Clone the repositories:
   ```bash
   git clone https://github.com/KovganAV/Lockshot.User.API
   git clone https://github.com/KovganAV/Lockshot.Bot.API
   git clone https://github.com/KovganAV/Lockshot.Channels.API
   git clone https://github.com/KovganAV/Lockshot.Client.Web.API
   ```
2. Navigate to each service directory and build the projects:
   ```bash
   dotnet build
   ```
3. Run the services using Docker Compose:
   ```bash
   docker-compose up
   ```

### Frontend Setup
1. Clone the frontend repository:
   ```bash
   git clone https://github.com/KovganAV/lockshot-frontend
   ```
2. Navigate to the frontend directory:
   ```bash
   cd lockshot-frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

### Pages
1. **Intro Page**: Overview of the app.
2. **Login and Registration Pages**: User authentication.
3. **Profile Page**: User statistics and AI-generated advice.
4. **Statistics Page**: Visualize training progress with interactive charts.
5. **Content Page**: Access articles and videos about shooting techniques.
6. **Users Page**: Explore profiles of other users.

### Mock Data
The frontend uses mock data for testing pages. Real data will be integrated with the backend API.

## Contribution
Contributions are welcome! Please fork the repository, create a feature branch, and submit a pull request.

## License
This project is licensed under the MIT License.

## Future Enhancements
- Expand AI insights for training.
- Develop group forums and discussion boards.
- Add support for iOS in the mobile app.

Enjoy using Lockshot and take your shooting skills to the next level! 🎯

