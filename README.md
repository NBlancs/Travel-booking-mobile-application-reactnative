# Travel Booking Mobile Application

A React Native mobile application for travel booking and trip management, built with Expo and modern React Native technologies.

## 📱 About

This travel booking mobile application provides users with a comprehensive platform to:

- **Authenticate**: Secure login and registration system
- **Browse & Book**: Discover and book travel experiences  
- **Manage Trips**: View and organize upcoming bookings and schedules
- **User Dashboard**: Personalized dashboard with user profile management

The app features a clean, intuitive interface optimized for mobile devices with cross-platform support for iOS, Android, and web.

## ✨ Features

- 🔐 **User Authentication** - Secure login/register with demo credentials
- 📱 **Responsive Design** - Optimized for mobile, tablet, and web
- 🗓️ **Schedule Management** - View upcoming trips and bookings
- ⚙️ **Settings** - User profile and app configuration
- 🔄 **Cross-Platform** - Runs on iOS, Android, and web browsers
- 🎨 **Modern UI** - Clean and intuitive user interface

## 🛠️ Technologies

- **React Native 0.79.6** - Cross-platform mobile development
- **Expo SDK 53** - Development platform and tools
- **TypeScript** - Type-safe JavaScript development  
- **Expo Router** - File-based navigation system
- **React Navigation** - Navigation components and tab navigation
- **React Context API** - State management for authentication
- **ESLint** - Code linting and quality assurance

## 📁 Project Structure

```
Travel-booking-mobile-application-reactnative/
└── mobile/                          # Main mobile application
    ├── app/                         # Application screens and routing
    │   ├── (auth)/                  # Authentication screens
    │   │   ├── login.tsx           # Login screen
    │   │   └── register.tsx        # Registration screen
    │   ├── (tabs)/                  # Main app tabs
    │   │   ├── index.tsx           # Dashboard/Home screen
    │   │   ├── schedule.tsx        # Schedule/Bookings screen
    │   │   └── settings.tsx        # Settings screen
    │   ├── _layout.tsx             # Root layout with auth provider
    │   └── index.tsx               # App entry point and routing
    ├── assets/                      # Images, icons, and static assets
    ├── context/                     # React Context providers
    │   └── AuthContext.tsx         # Authentication context
    ├── package.json                # Dependencies and scripts
    ├── app.json                    # Expo configuration
    └── README.md                   # Technical development guide
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- Expo CLI (optional but recommended)
- iOS Simulator (for iOS development) or Android Emulator (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/NBlancs/Travel-booking-mobile-application-reactnative.git
   cd Travel-booking-mobile-application-reactnative
   ```

2. **Navigate to the mobile directory**
   ```bash
   cd mobile
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm run start
   ```

### Running the App

After starting the development server, you can run the app on different platforms:

- **iOS Simulator**: Press `i` in the terminal or run `npm run ios`
- **Android Emulator**: Press `a` in the terminal or run `npm run android`  
- **Web Browser**: Press `w` in the terminal or run `npm run web`
- **Physical Device**: Scan the QR code with Expo Go app

### Demo Credentials

For testing the authentication system, use these demo credentials:

- **Email**: `user@example.com`
- **Password**: `password123`

## 🎯 Development

### Available Scripts

In the `mobile` directory, you can run:

- `npm run start` - Start the Expo development server
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device  
- `npm run web` - Run in web browser
- `npm run lint` - Run ESLint for code quality checks
- `npm run reset-project` - Reset to a fresh Expo project

### Code Quality

The project uses ESLint for maintaining code quality. Run linting before committing:

```bash
npm run lint
```

### Authentication System

The app currently uses a hardcoded authentication system for demonstration purposes. To integrate with a real backend:

1. Replace the hardcoded logic in `context/AuthContext.tsx`
2. Implement real API calls for login, register, and logout
3. Add proper token management and secure storage

## 📱 Screenshots

*Screenshots and demo videos will be added here to showcase the app's features and user interface.*

## 🤝 Contributing

We welcome contributions to improve the travel booking application! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes** and ensure they follow the project's coding standards
4. **Run tests and linting** (`npm run lint`)
5. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
6. **Push to the branch** (`git push origin feature/amazing-feature`)
7. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Maintain consistent code formatting with ESLint
- Write clear, descriptive commit messages
- Test your changes on multiple platforms when possible
- Update documentation for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For questions, issues, or contributions, please:

- Open an issue on GitHub
- Contact the maintainers
- Check the [mobile/README.md](mobile/README.md) for technical development details

## 🚀 Future Enhancements

- Integration with real travel booking APIs
- Push notifications for booking updates
- Offline support and data synchronization
- Advanced search and filtering capabilities
- Social features and trip sharing
- Payment integration
- Multi-language support

---

**Built with ❤️ using React Native and Expo**