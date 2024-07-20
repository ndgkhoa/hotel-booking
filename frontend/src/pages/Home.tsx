import AllHotels from '../components/AllHotels'
import Cities from '@/components/Cities'

const Home = () => {
    return (
        <div className="space-y-2">
            <h2 className="text-2xl font-bold">Popular Destination</h2>
            <Cities />
            <h2 className="text-2xl font-bold">Popular Hotels</h2>
            <p className="">Most recent hotels added by our hosts</p>
            <AllHotels />
        </div>
    )
}

export default Home
