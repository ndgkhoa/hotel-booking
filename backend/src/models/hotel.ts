import mongoose from 'mongoose'

export type HotelType = {
    _id: string
    userId: string
    name: string
    city: string
    country: string
    description: string
    type: string
    adultCount: number
    childCount: number
    facilities: string[]
    pricePerNight: number
    starRating: number
    imageUrls: string[]
    lastUpdate: Date
}

const hotelSchema = new mongoose.Schema<HotelType>({
    userId: { type: String, require: true },
    name: { type: String, require: true },
    city: { type: String, require: true },
    country: { type: String, require: true },
    description: { type: String, require: true },
    adultCount: { type: Number, require: true },
    childCount: { type: Number, require: true },
    facilities: [{ type: String, require: true }],
    pricePerNight: { type: Number, require: true },
    starRating: { type: Number, require: true, min: 1, max: 5 },
    imageUrls: [{ type: String, require: true }],
    lastUpdate: { type: Date, require: true },
})

const Hotel = mongoose.model<HotelType>('Hotel', hotelSchema)
export default Hotel
