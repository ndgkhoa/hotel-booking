import AllHotels from '../components/AllHotels'
import Cities from '@/components/Cities'

const Home = () => {
    return (
        <div className="">
            <p className="explore-text">EXPLORE</p>
            <p className="text-4xl font-semibold relative">
                Popular Destination
                <span className="text-blue-500 text-5xl absolute bottom-1">
                    .
                </span>
            </p>
            <Cities />
            <p className="explore-text pt-6">EXPLORE</p>
            <p className="text-4xl font-semibold relative">
                Popular Hotels
                <span className="text-blue-500 text-5xl absolute bottom-1">
                    .
                </span>
            </p>
            <AllHotels />
        </div>
    )
}

export default Home
