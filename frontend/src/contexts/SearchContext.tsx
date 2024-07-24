import React, { useContext, useState } from 'react'
//import { format } from 'date-fns'

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
    //const formatDate = (date: Date) => format(date, 'dd/MM/yyyy')

    const getStoredDate = (key: string, defaultDate: Date) => {
        const storedDate = sessionStorage.getItem(key)
        if (storedDate) {
            const parsedDate = new Date(storedDate)
            // Kiểm tra nếu giá trị lưu trữ có phải là ngày hợp lệ
            return isNaN(parsedDate.getTime()) ? defaultDate : parsedDate
        }
        return defaultDate
    }

    const [destination, setDestination] = useState<string>(
        sessionStorage.getItem('destination') || '',
    )

    const [checkIn, setCheckIn] = useState<Date>(() =>
        getStoredDate('checkIn', new Date()),
    )

    const [checkOut, setCheckOut] = useState<Date>(() =>
        getStoredDate(
            'checkOut',
            new Date(new Date().setDate(new Date().getDate() + 1)),
        ),
    )

    const [adultCount, setAdultCount] = useState<number>(() =>
        parseInt(sessionStorage.getItem('adultCount') || '1'),
    )

    const [childCount, setChildCount] = useState<number>(() =>
        parseInt(sessionStorage.getItem('childCount') || '0'),
    )

    const [hotelId, setHotelId] = useState<string>(
        sessionStorage.getItem('hotelId') || '',
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

        // Lưu trữ giá trị vào sessionStorage
        sessionStorage.setItem('destination', destination)
        sessionStorage.setItem('checkIn', checkIn.toISOString()) // Lưu dưới dạng ISO string
        sessionStorage.setItem('checkOut', checkOut.toISOString()) // Lưu dưới dạng ISO string
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
