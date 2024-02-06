import { z } from 'zod'

export const createHotelSchema = z.object({
  title: z.string().min(3, {
    message: 'Title must be at least 3 characters long',
  }),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters long',
  }),
  image: z.string().min(1, {
    message: 'Image is required',
  }),
  country: z.string().min(1, {
    message: 'Country is required',
  }),
  state: z.string().optional(),
  city: z.string().optional(),
  locationDescription: z.string().min(10, {
    message: 'Location description must be at least 10 characters long',
  }),
  gym: z.coerce.boolean().optional(),
  spa: z.coerce.boolean().optional(),
  bar: z.coerce.boolean().optional(),
  laundry: z.coerce.boolean().optional(),
  restaurant: z.coerce.boolean().optional(),
  shopping: z.coerce.boolean().optional(),
  freeParking: z.coerce.boolean().optional(),
  bikeRental: z.coerce.boolean().optional(),
  freeWifi: z.coerce.boolean().optional(),
  movieNights: z.coerce.boolean().optional(),
  swimmingPool: z.coerce.boolean().optional(),
  coffeeShop: z.coerce.boolean().optional(),
})

export type CreateHotelValues = z.infer<typeof createHotelSchema>
