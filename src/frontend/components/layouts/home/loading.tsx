import { FaUserAlt } from 'react-icons/fa';

export default function ComponentLoadingHome(): JSX.Element {
    return (
        <div className="flex items-center justify-center min-h-screen dark:bg-dark-primary bg-primary">
            <div className="flex flex-col items-center space-y-1 sm:space-y-6 p-8 rounded-lg relative">
                <FaUserAlt className="dark:text-dark-secondary text-secondary text-9xl animate-pulse scale-90 sm:scale-125 bg-gradient-to-r from-blue-500 to-green-500 p-4 rounded-full transition-all duration-1000 ease-in-out" />
                <p className="text-lg text-center dark:text-dark-secondary text-secondary font-semibold tracking-wider opacity-80">
                    ¡Estamos preparando todo para ti!
                </p>
            </div>
        </div>
    )
}