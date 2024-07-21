import Slider from 'react-slick'
import { Card, CardContent } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { cities } from '../config/FakeData'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Cities = () => {
    const slidesToShow = 4

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow,
        slidesToScroll: 1,
        arrows: false,
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
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    }

    return (
        <div className="relative pt-3 pb-6">
            <Slider {...settings} className="w-full">
                {cities.map((city, index) => (
                    <div key={index} className="p-2 h-full">
                        <Link to={`/search?destination=${city.name}`}>
                            <Card className="h-full border-0 cursor-pointer rounded-2xl">
                                <CardContent className="flex items-center justify-center relative h-full p-0 aspect-square">
                                    <img
                                        src={city.img}
                                        alt={city.name}
                                        className="object-cover w-full h-full rounded-2xl"
                                    />
                                    <span className="absolute bottom-4 left-4 text-white text-2xl font-bold">
                                        {city.name}
                                    </span>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>
                ))}
            </Slider>

            <style>{`
                .slick-slide {
                    display: flex;
                    justify-content: center;
                }

                .slick-dots {
                    bottom: -30px;
                }

                .slick-dots li {
                    margin: 0 3px; 
                }

                .slick-dots li button {
                    width: 6px; 
                    height: 6px; 
                    border-radius: 50%; 
                    background-color: #ccc;
                    border: none;
                    transition: background-color 0.3s, width 0.3s, height 0.3s, border-radius 0.3s;
                }

                .slick-dots li button:before {
                    content: ''; 
                }

                .slick-dots li button:hover,
                .slick-dots li.slick-active button {
                    background-color: #0094FE; 
                    width: 20px; 
                    height: 8px; 
                    border-radius: 4px; 
                    margin: 0; 
                }
            `}</style>
        </div>
    )
}

export default Cities
