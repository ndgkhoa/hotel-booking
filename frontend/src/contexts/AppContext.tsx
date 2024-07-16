import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as apiClient from '../api/auth'
import { loadStripe, Stripe } from '@stripe/stripe-js'

const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || ''

type AppContextType = {
    isLoggedIn: boolean
    stripePromise: Promise<Stripe | null>
}

const AppContext = createContext<AppContextType | undefined>(undefined)

const stripePromise = loadStripe(STRIPE_PUB_KEY)

export const useAppContext = () => {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error('useAppContext must be used within an AppContextProvider')
    }
    return context
}

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const { isSuccess, isError } = useQuery('checkToken', apiClient.checkToken, {
        retry: false,
    });
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (isSuccess) {
            setIsLoggedIn(true);
        }
        if (isError) {
            setIsLoggedIn(false);
        }
    }, [isSuccess, isError]);
    
    return (
        <AppContext.Provider value={{ isLoggedIn, stripePromise}}>
            {children}
            <ToastContainer />
        </AppContext.Provider>
    )
}
