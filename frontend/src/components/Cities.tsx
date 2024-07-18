import { Card, CardContent } from '@/components/ui/card'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'

export const cities = [
    {
        name: 'Ho Chi Minh',
        img: 'https://www.new7wonders.com/app/uploads/sites/5/2016/10/ho-chi-minh-city-1348092-1920x1280.jpg',
    },
    {
        name: 'Nha Trang',
        img: 'https://statics.vinpearl.com/nha-trang-2_1691674644.jpg',
    },
    {
        name: 'Hoi An',
        img: 'https://s3-stag.esollabs.com/trigseg/img/d7439a42-9864-48a6-af34-1bc797b6d4b0.jpg',
    },
    {
        name: 'Ha Noi',
        img: 'https://s3-stag.esollabs.com/trigseg/img/fbebebc7-51aa-476a-9d92-be2ca5a7b408.jpg',
    },
    {
        name: 'Tuy Hoa',
        img: 'https://s3-stag.esollabs.com/trigseg/img/1fe87757-d76d-41c0-83eb-bc086ee61703.jpg',
    },
    {
        name: 'Da Lat',
        img: 'https://s3-stag.esollabs.com/trigseg/img/2489d596-7578-43ca-9c48-0712db945a20.jpg',
    },
    {
        name: 'Phan Thiet',
        img: 'https://s3-stag.esollabs.com/trigseg/img/5f0436ba-de34-44ba-8ed3-01fd99ffece7.jpg',
    },
    {
        name: 'Da Nang',
        img: 'https://s3-stag.esollabs.com/trigseg/img/2da7d968-87d4-41d6-aeef-9a7f28912c22.jpg',
    },
    {
        name: 'Phu Quoc',
        img: 'https://s3-stag.esollabs.com/trigseg/img/7538a518-c3a2-40ed-814a-5a858c677ff1.jpg',
    },
]

const Cities = () => {
    return (
        <Carousel
            opts={{
                align: 'start',
            }}
            className="w-full"
        >
            <CarouselContent>
                {cities.map((city, index) => (
                    <CarouselItem
                        key={index}
                        className="basis-1/4 flex-shrink-0"
                    >
                        <div className="p-2 h-full">
                            <Card className="h-full border-0">
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
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}

export default Cities
