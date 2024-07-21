import { useEffect, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import * as apiClient from '../api/hotel'
import { FaMapMarkerAlt } from 'react-icons/fa'

const AllHotels = () => {
    const carouselRef = useRef<HTMLDivElement | null>(null)
    const { data: hotels } = useQuery('fetchHotels', () =>
        apiClient.fetchHotels(),
    )

    useEffect(() => {
        const interval = setInterval(() => {
            if (carouselRef.current) {
                const nextButton = carouselRef.current.querySelector(
                    '.carousel-next-button',
                )
                if (nextButton) {
                    ;(nextButton as HTMLElement).click()
                }
            }
        }, 3000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="pt-3">
            <div className="bg-white p-3">
                <Carousel
                    ref={carouselRef}
                    opts={{
                        align: 'start',
                    }}
                    className="w-full"
                >
                    <CarouselContent>
                        {hotels?.map((hotel, index) => (
                            <CarouselItem
                                key={index}
                                className="basis-1/3 flex-shrink-0"
                            >
                                <div className="h-full bg-transparent">
                                    <Link to={`/detail/${hotel._id}`}>
                                        <Card className="h-full border-0 cursor-pointer">
                                            <CardContent className="flex flex-col items-start justify-center h-full p-0 border-none">
                                                <div className="relative w-full overflow-hidden">
                                                    <img
                                                        src={hotel.imageUrls[0]}
                                                        alt={hotel.name}
                                                        className="object-cover w-full h-full border-0 "
                                                    />
                                                </div>
                                                <div className="mt-2 w-full">
                                                    <div className="flex items-center text-[#0094FE] font-medium text-base">
                                                        <FaMapMarkerAlt className="mr-1" />
                                                        <span>
                                                            {hotel.city}
                                                        </span>
                                                    </div>
                                                    <h2 className="text-2xl font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
                                                        {hotel.name}
                                                    </h2>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </div>
    )
}

export default AllHotels