import { FormEvent, useState } from 'react'
import { useSearchContext } from '../contexts/SearchContext'
import { MdTravelExplore } from 'react-icons/md'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
    const search = useSearchContext()
    const navigate = useNavigate()
    const [destination, setDestination] = useState<string>(search.destination)
    const [checkIn, setCheckIn] = useState<Date>(search.checkIn)
    const [checkOut, setCheckOut] = useState<Date>(search.checkOut)
    const [adultCount, setAdultCount] = useState<number>(search.adultCount)
    const [childCount, setChildCount] = useState<number>(search.childCount)

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        search.saveSearchValues(
            destination,
            checkIn,
            checkOut,
            adultCount,
            childCount,
        )
        navigate('/search')
    }

    const minDate = new Date()
    const maxDate = new Date()
    maxDate.setFullYear(maxDate.getFullYear() + 1)

    return (
        <div className="flex flex-col items-center justify-center">
            <style>
                {`
                .custom-border {
                    border: 1px solid #ccc;
                    padding: 0.5rem;
                    transition: border-color 0.3s ease-in-out;
                }

                .custom-border:hover {
                    border-color: #3182ce;
                }
                `}
            </style>
            <div className="mt-6 p-6 bg-gray-100 rounded-lg shadow-lg">
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 lg:grid-cols-3 items-center gap-6"
                >
                    <div className="flex flex-col items-start flex-1 p-4 rounded-lg shadow-sm custom-border">
                        <label className="text-lg font-bold mb-1">
                            Destination:
                        </label>
                        <div className="flex flex-row items-center w-full">
                            <MdTravelExplore size={30} className="mr-3" />
                            <input
                                placeholder="Where are you going?"
                                className="text-lg w-full focus:outline-none h-12"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col items-start bg-white p-4 rounded-lg shadow-sm custom-border">
                        <label className="text-lg font-bold mb-1">
                            Guests:
                        </label>
                        <div className="flex flex-row items-center w-full">
                            <div className="flex flex-row items-center w-full">
                                <span className="text-base mr-2">Adults:</span>
                                <input
                                    className="w-full p-3 focus:outline-none font-bold h-12"
                                    type="number"
                                    min={1}
                                    max={20}
                                    value={adultCount}
                                    onChange={(e) =>
                                        setAdultCount(parseInt(e.target.value))
                                    }
                                />
                            </div>
                            <div className="flex flex-row items-center w-full ml-4">
                                <span className="text-base mr-2">
                                    Children:
                                </span>
                                <input
                                    className="w-full p-3 focus:outline-none font-bold h-12"
                                    type="number"
                                    min={0}
                                    max={20}
                                    value={childCount}
                                    onChange={(e) =>
                                        setChildCount(parseInt(e.target.value))
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-start rounded-lg custom-border">
                        <label className="text-lg font-bold mb-1">Dates:</label>
                        <div className="flex flex-row w-full gap-4">
                            <DatePicker
                                selected={checkIn}
                                onChange={(date) => setCheckIn(date as Date)}
                                selectsStart
                                startDate={checkIn}
                                endDate={checkOut}
                                minDate={minDate}
                                maxDate={maxDate}
                                placeholderText="Check-in Date"
                                className="w-full cursor-pointer bg-white p-3 rounded-lg shadow-sm h-12 focus:outline-none"
                            />
                            <DatePicker
                                selected={checkOut}
                                onChange={(date) => setCheckOut(date as Date)}
                                selectsStart
                                startDate={checkIn}
                                endDate={checkOut}
                                minDate={checkIn || minDate}
                                maxDate={maxDate}
                                placeholderText="Check-out Date"
                                className="w-full cursor-pointer bg-white p-4 rounded-lg shadow-sm h-12 focus:outline-none"
                            />
                        </div>
                    </div>
                </form>
            </div>

            <button
                type="submit"
                onClick={handleSubmit}
                className="w-full bg-blue-700 text-white mt-6 py-4 rounded-full font-bold text-lg text-center cursor-pointer hover:bg-blue-600"
                style={{ maxWidth: '250px' }}
            >
                Search
            </button>
        </div>
    )
}

export default SearchBar
