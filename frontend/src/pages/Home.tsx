import { useQuery } from 'react-query'
import * as apiClient from '../api/hotel'
import LastDestinationCard from '../components/LastDestinationCard'
import Cities from '@/components/Cities'

const Home = () => {
    const { data: hotels } = useQuery('fetchHotels', () =>
        apiClient.fetchHotels(),
    )
    const topRowHotels = hotels?.slice(0, 2) || []
    const bottomRowHotels = hotels?.slice(2) || []
    return (
        <div className="space-y-3">
            <h2 className="text-xl font-bold">Popular location</h2>
            <Cities />
            <h2 className="text-xl font-bold">Last Destinations</h2>
            <p>Most recent destinations added by our hosts</p>
            <div className="grid gap-4">
                <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                    {topRowHotels.map((hotel) => (
                        <LastDestinationCard key={hotel._id} hotel={hotel} />
                    ))}
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                    {bottomRowHotels.map((hotel) => (
                        <LastDestinationCard key={hotel._id} hotel={hotel} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home
