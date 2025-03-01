import { FaUserAlt } from 'react-icons/fa';
import { Component } from '@/frontend/types/component';

import useAppTranslation from '@/shared/hooks/translation';

export default function ComponentLoadingHome(): Component {
    const { translate } = useAppTranslation();

    return (
        <div className="flex items-center justify-center mt-[-50px] sm:mt-0 min-h-screen">
            <div className="flex flex-col items-center space-y-1 sm:space-y-6 p-8 rounded-lg relative">
                <FaUserAlt className="dark:text-dark-secondary text-secondary text-9xl animate-pulse scale-90 sm:scale-125 bg-custom-gradient p-4 rounded-full transition-all duration-1000 ease-in-out" />
                <p className="mt-1 text-lg text-center text-gradient font-semibold tracking-wider opacity-80">
                    {translate('home.loading.message')}
                </p>
            </div>
        </div>
    )
}