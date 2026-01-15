import { Link } from 'react-router-dom';

export default function Welcome() {
    return (
        <div className="relative min-h-screen overflow-hidden">
            
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
            
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            <div className="relative z-10 min-h-screen flex items-center justify-center">
                <div className="text-center space-y-8 px-6">
                    <div className="space-y-4">
                        <img src="/logo.svg" alt="Logo" className="w-24 h-24 mx-auto drop-shadow-lg" />
                        <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
                            Contact Manager
                        </h1>
                    </div>
                    
                    <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link 
                                to="/login"
                                className="bg-lime-400 hover:bg-lime-300 text-black font-bold text-xl px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl text-center"
                            >
                                Sign In
                            </Link>
                            
                            <Link 
                                to="/register"
                                className="bg-white hover:bg-gray-100 text-black font-bold text-xl px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl border-2 border-white text-center"
                            >
                                Register
                            </Link>
                        </div>
                        
                        <div className="text-center text-white">
                            <p className="text-sm text-gray-300">
                                Please sign in or register to access your contacts
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
