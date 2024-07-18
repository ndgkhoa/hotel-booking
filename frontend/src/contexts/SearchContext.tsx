import React, { useContext, useState } from 'react'
import { format } from 'date-fns'

type SearchContext = {
    destination: string
    checkIn: Date
    checkOut: Date
    adultCount: number
    childCount: number
    hotelId: string
    saveSearchValues: (
        destination: string,
        checkIn: Date,
        checkOut: Date,
        adultCount: number,
        childCount: number,
    ) => void
}

const SearchContext = React.createContext<SearchContext | undefined>(undefined)

type SearchContextProviderProps = {
    children: React.ReactNode
}

export const SearchContextProvider = ({
    children,
}: SearchContextProviderProps) => {
    const formatDate = (date: Date) => format(date, 'dd/MM/yyyy')

    const [destination, setDestination] = useState<string>(
        () => sessionStorage.getItem('destination') || '',
    )
    const [checkIn, setCheckIn] = useState<Date>(() => {
        const storedCheckIn = sessionStorage.getItem('checkIn')
        return storedCheckIn ? new Date(storedCheckIn) : new Date()
    })
    const [checkOut, setCheckOut] = useState<Date>(() => {
        const storedCheckOut = sessionStorage.getItem('checkOut')
        const nextDay = new Date()
        nextDay.setDate(nextDay.getDate() + 1)
        return storedCheckOut ? new Date(storedCheckOut) : nextDay
    })
    const [adultCount, setAdultCount] = useState<number>(() =>
        parseInt(sessionStorage.getItem('adultCount') || '1'),
    )
    const [childCount, setChildCount] = useState<number>(() =>
        parseInt(sessionStorage.getItem('childCount') || '0'),
    )
    const [hotelId, setHotelId] = useState<string>(
        () => sessionStorage.getItem('hotelId') || '',
    )

    const saveSearchValues = (
        destination: string,
        checkIn: Date,
        checkOut: Date,
        adultCount: number,
        childCount: number,
        hotelId?: string,
    ) => {
        setDestination(destination)
        setCheckIn(checkIn)
        setCheckOut(checkOut)
        setAdultCount(adultCount)
        setChildCount(childCount)
        if (hotelId) {
            setHotelId(hotelId)
        }

        sessionStorage.setItem('destination', destination)
        sessionStorage.setItem('checkIn', formatDate(checkIn))
        sessionStorage.setItem('checkOut', formatDate(checkOut))
        sessionStorage.setItem('adultCount', adultCount.toString())
        sessionStorage.setItem('childCount', childCount.toString())
        if (hotelId) {
            sessionStorage.setItem('hotelId', hotelId)
        }
    }

    return (
        <SearchContext.Provider
            value={{
                destination,
                checkIn,
                checkOut,
                adultCount,
                childCount,
                hotelId,
                saveSearchValues,
            }}
        >
            {children}
        </SearchContext.Provider>
    )
}

export const useSearchContext = () => {
    const context = useContext(SearchContext)
    if (!context) {
        throw new Error(
            'useSearchContext must be used within a SearchContextProvider',
        )
    }
    return context
}
