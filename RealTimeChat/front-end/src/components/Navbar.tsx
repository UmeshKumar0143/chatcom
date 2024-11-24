export default function Navbar() {
    return (
        <div className="w-full">
            <div className="container mx-auto px-4 sm:px-6 lg:px-20 py-4 sm:py-6 lg:py-8 border-2">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 sm:gap-8">
                    <a 
                        className="text-blue-400 text-3xl sm:text-4xl font-bold tracking-tighter leading-3"
                        href="/"
                    >
                        Chat.com
                    </a>
                    <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-center tracking-wider">
                        A Real time Chat application
                    </p>
                </div>
            </div>
        </div>
    )
}