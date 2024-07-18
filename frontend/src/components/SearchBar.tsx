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
                    background-color: #f5f5f5;
                    padding: 0.5rem;
                    border: 2px solid transparent;
                    transition: background-color 0.3s ease-in-out, border-color 0.3s ease-in-out;
                }

                .custom-border:hover {
                    border-color: #0094FE;
                    background-color: #e6f7ff;
                }

                .no-border {
                    border: none;
                }
                `}
            </style>
            <div className="p-6 bg-white rounded-3xl shadow-lg">
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 lg:grid-cols-3 items-center gap-6"
                >
                    <div className="flex flex-col items-start flex-1 p-4 rounded-2xl shadow-sm custom-border">
                        <label className="text-lg font-bold mb-1">
                            Destination:
                        </label>
                        <div className="flex flex-row items-center w-full">
                            <MdTravelExplore size={30} className="mr-3" />
                            <input
                                placeholder="Where are you going?"
                                className="text-lg w-full focus:outline-none h-12 bg-transparent"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col items-start p-4 rounded-2xl shadow-sm custom-border w-full">
                        <label className="text-lg font-bold mb-1">
                            Guests:
                        </label>
                        <div className="flex flex-row items-center w-full">
                            <div className="flex flex-row items-center flex-1 mr-2">
                                <span className="text-base mr-2">Adults:</span>
                                <input
                                    className="w-full p-3 focus:outline-none font-bold h-12 bg-transparent"
                                    type="number"
                                    min={1}
                                    max={20}
                                    value={adultCount}
                                    onChange={(e) =>
                                        setAdultCount(parseInt(e.target.value))
                                    }
                                />
                            </div>
                            <div className="flex flex-row items-center flex-1 ml-2">
                                <span className="text-base mr-2">
                                    Children:
                                </span>
                                <input
                                    className="w-full p-3 focus:outline-none font-bold h-12 bg-transparent"
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

                    <div className="flex flex-col items-start rounded-2xl custom-border">
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
                                className="w-full cursor-pointer bg-transparent p-3 rounded-lg shadow-sm h-12 focus:outline-none"
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
                                className="w-full cursor-pointer bg-transparent p-4 rounded-lg shadow-sm h-12 focus:outline-none"
                            />
                        </div>
                    </div>
                </form>
            </div>

            <button
                type="submit"
                onClick={handleSubmit}
                className="w-full bg-[#0094FE] text-white mt-6 py-4 rounded-full font-bold text-lg text-center cursor-pointer hover:bg-blue-500"
                style={{ maxWidth: '150px' }}
            >
                Search
            </button>
        </div>
    )
}

export default SearchBar
