import { getHotelById } from '@/actions/getHotelById'
import AddHotelForm from '@/components/hotel/AddHotelForm'
import { auth } from '@clerk/nextjs'

interface HotelPageProps {
  params: {
    hotelId: string
  }
}

const HotelCreatePage = async ({ params }: HotelPageProps) => {
  const hotel = await getHotelById(params.hotelId)

  const { userId } = auth()
  if (!userId) return <div>Not authenticated!</div>

  if (hotel && hotel.userId !== userId) return <div>Access Denied</div>

  return (
    <div className="px-2">
      <AddHotelForm hotel={hotel} />
    </div>
  )
}

export default HotelCreatePage
