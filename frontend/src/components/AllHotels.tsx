import Slider from 'react-slick'
import { Card, CardContent } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import * as apiClient from '../api/hotel'
import { FaMapMarkerAlt } from 'react-icons/fa'

const AllHotels = () => {
    const { data: hotels } = useQuery('fetchHotels', () =>
        apiClient.fetchHotels(),
    )

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    }

    return (
        <div className="pt-3">
            <div className="bg-white p-3">
                <Slider {...settings} className="w-full">
                    {hotels?.map((hotel, index) => (
                        <div key={index} className="p-2">
                            <Link to={`/detail/${hotel._id}`}>
                                <Card className="h-full border-0 cursor-pointer">
                                    <CardContent className="flex flex-col items-start justify-center h-full p-0 border-none">
                                        <div className="relative w-full overflow-hidden">
                                            <img
                                                src={hotel.imageUrls[0]}
                                                alt={hotel.name}
                                                className="object-cover w-full h-[380px] border-0"
                                            />
                                        </div>
                                        <div className="mt-2 w-full">
                                            <div className="flex items-center text-[#0094FE] font-medium text-base">
                                                <FaMapMarkerAlt className="mr-1" />
                                                <span>{hotel.city}</span>
                                            </div>
                                            <h2 className="text-2xl font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
                                                {hotel.name}
                                            </h2>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    )
}

export default AllHotels
