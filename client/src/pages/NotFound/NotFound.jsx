import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <main className="relative w-full min-h-screen bg-gray-100 flex flex-col lg:flex-row">
            <div className="hidden lg:flex w-16 bg-white border-r-2 border-gray-300 items-center justify-center">
                <div className="transform -rotate-90 whitespace-nowrap">
                    <span className="text-xs font-semibold tracking-widest text-gray-400">Error 404</span>
                </div>
            </div>

            <div className="flex-1 bg-white flex items-center justify-center p-6 sm:p-8 lg:p-12">
                <div className="text-center max-w-4xl">
                    <div className="relative inline-block">
                        <h1 className="text-[120px] sm:text-[180px] lg:text-[250px] font-bold text-black leading-none">
                            404
                        </h1>
                        <div className="absolute top-12 left-0">
                            <img src="/circle.png" alt="Stars background" />
                        </div>
                        <div className="absolute top-2 right-1">
                            <img src="/not.png" alt="Stars background" />
                        </div>
                    </div>
                    
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mt-6 mb-4">
                        Page Not Found
                    </h2>
                    
                    <p className="text-sm sm:text-base text-gray-600 mb-8 max-w-2xl mx-auto">
                        We're sorry, the page you requested could not be found.<br/>
                        Please go back to the home page.
                    </p>

                    <Link 
                        to="/" 
                        className="inline-block bg-lime-400 text-black px-10 sm:px-16 py-3 sm:py-4 rounded-full font-bold uppercase tracking-wide hover:bg-lime-500 transition-colors text-sm sm:text-base"
                    >
                        Go Home
                    </Link>
                </div>
            </div>

            <div className="hidden lg:flex w-16 bg-white border-l-2 border-gray-300 items-center justify-center">
                <div className="transform rotate-90 whitespace-nowrap">
                    <span className="text-xs font-semibold tracking-widest text-gray-400">Not Found</span>
                </div>
            </div>
        </main>
    );
}
