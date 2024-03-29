'use client'

import {
  CreateHotelValues,
  createHotelSchema,
} from '@/actions/createHotel/schema'
import { Hotel, Room } from '@prisma/client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '../ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { SingleImageDropzone } from '@/components/hotel/SingleImageDropzone'
import { useEdgeStore } from '@/lib/edgestore'

import { ChangeEvent, useEffect, useState } from 'react'
import { useToast } from '../ui/use-toast'
import Image from 'next/image'
import { Button } from '../ui/button'
import { Loader2, Pencil, PencilLine, XCircle } from 'lucide-react'
import useLocation from '@/app/hooks/useLocation'
import { ICity, IState } from 'country-state-city'
import { Label } from '../ui/label'

interface AddHotelFormProps {
  hotel: HotelWithRooms | null
}

export type HotelWithRooms = Hotel & {
  rooms: Room[]
}

const AddHotelForm = ({ hotel }: AddHotelFormProps) => {
  const form = useForm<CreateHotelValues>({
    resolver: zodResolver(createHotelSchema),
    defaultValues: hotel || {
      title: '',
      description: '',
      image: '',
      country: '',
      state: '',
      city: '',
      locationDescription: '',
      gym: false,
      spa: false,
      bar: false,
      laundry: false,
      restaurant: false,
      shopping: false,
      freeParking: false,
      bikeRental: false,
      freeWifi: false,
      movieNights: false,
      swimmingPool: false,
      coffeeShop: false,
    },
  })

  const {
    handleSubmit,
    watch,
    trigger,
    control,
    setValue,
    setFocus,
    formState: { isSubmitting },
  } = form

  const [file, setFile] = useState<File>()
  const [progress, setProgress] = useState(0)
  const [image, setImage] = useState<string | undefined>(hotel?.image)
  const [imageIsDeleting, setImageIsDeleting] = useState(false)
  const [states, setStates] = useState<IState[]>([])
  const [cities, setCities] = useState<ICity[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const { edgestore } = useEdgeStore()

  const { toast } = useToast()

  const { getAllCountries, getCountryStates, getStateCities } = useLocation()

  const countries = getAllCountries()

  useEffect(() => {
    if (typeof image === 'string') {
      form.setValue('image', image, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image])

  useEffect(() => {
    const selectedCountry = form.watch('country')
    const countryStates = getCountryStates(selectedCountry)
    if (countryStates) {
      setStates(countryStates)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch('country')])

  useEffect(() => {
    const selectedCountry = form.watch('country')
    const selectedState = form.watch('state')
    const stateCities = getStateCities(selectedCountry, selectedState)
    if (stateCities) {
      setCities(stateCities)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch('country'), form.watch('state')])

  async function onSubmit(values: CreateHotelValues) {
    // alert(JSON.stringify(values, null, 2))
    console.log(values)
  }

  const handleImageDelete = async (image: string) => {
    setImageIsDeleting(true)
    await edgestore.publicFiles.delete({
      url: image,
    })

    setImage('')
    toast({
      variant: 'success',
      description: 'Image removed',
    })
    setImageIsDeleting(false)
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <h3 className="text-xl font-semibold text-primary">
            {hotel ? 'Update your hotel' : 'Describe your hotel'}
          </h3>
          <div className="flex flex-col gap-6 md:flex-row">
            <div className="flex flex-1 flex-col gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-primary">
                      Hotel Title *
                    </FormLabel>
                    <FormDescription>Provide your hotel name.</FormDescription>
                    <FormControl>
                      <Input placeholder="Beach Hotel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-primary">
                      Hotel Description *
                    </FormLabel>
                    <FormDescription>
                      Provide a detailed description of your hotel.
                    </FormDescription>
                    <FormControl>
                      <Textarea
                        placeholder="Beach Hotel packed with many awesome amentities"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="">
                <h3 className=" mb-2 font-semibold text-primary">
                  Choose Amenities
                </h3>

                <FormDescription>
                  Choose amenities popular in your hotel.
                </FormDescription>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="gym"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            name="gym"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Gym</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="spa"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            name="spa"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Spa</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bar"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            name="bar"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Bar</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="laundry"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            name="laundry"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Laundry Facilities</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="restaurant"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            name="restaurant"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Restaurant</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="shopping"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            name="shopping"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Shopping</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="freeParking"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            name="freeParking"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Free Parking</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bikeRental"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            name="bikeRental"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Bike Rental</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="freeWifi"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            name="freeWifi"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Free Wifi</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="movieNights"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            name="movieNights"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Movie Nights</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="swimmingPool"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            name="swimmingPool"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Swimming Pool</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="coffeeShop"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            name="coffeeShop"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Coffee Shop</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-3">
                    <h3 className="text-primary">Upload an Image *</h3>
                    <FormDescription>
                      Select an image to showcase your hotel
                    </FormDescription>
                    <FormControl>
                      {image ? (
                        <>
                          <div className="relative mt-4 max-h-[400px] min-h-[200px] min-w-[200px] max-w-[400px]">
                            <Image
                              fill
                              src={image}
                              alt="Hotel Image"
                              className="object-contain"
                            />
                            <Button
                              onClick={() => handleImageDelete(image)}
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-[-12px] top-0"
                            >
                              {imageIsDeleting ? <Loader2 /> : <XCircle />}
                            </Button>
                          </div>
                        </>
                      ) : (
                        <>
                          <section className="mx-auto my-8 w-full max-w-4xl rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800 sm:p-6 md:p-8">
                            <div className=" flex flex-col">
                              <div className="mx-auto">
                                <SingleImageDropzone
                                  width={200}
                                  height={200}
                                  value={file}
                                  onChange={(file) => {
                                    setFile(file)
                                  }}
                                />
                                {progress < 100 && (
                                  <div className="w-full rounded-full bg-gray-200 dark:bg-gray-700">
                                    <div
                                      className="rounded-full bg-blue-600 p-0.5 text-center text-xs font-medium leading-none text-blue-100"
                                      style={{ width: '85' }}
                                    >
                                      {' '}
                                    </div>
                                  </div>
                                )}

                                <div className="flex justify-center">
                                  <button
                                    className="mt-1 rounded-lg bg-blue-500 px-2 py-1 text-gray-50"
                                    onClick={async () => {
                                      if (file) {
                                        const res =
                                          await edgestore.publicFiles.upload({
                                            file,
                                            onProgressChange: (progress) => {
                                              console.log(progress)
                                              setProgress(progress)
                                            },
                                          })
                                        // you can run some server action or api here
                                        // to add the necessary data to your database
                                        console.log(res)
                                        setImage(res?.url)
                                        toast({
                                          variant: 'success',
                                          description: '🚀 Upload complete',
                                        })
                                      }
                                    }}
                                  >
                                    Upload
                                  </button>
                                </div>
                              </div>
                            </div>
                          </section>
                        </>
                      )}
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <h2 className=" font-semibold text-primary">
                Select the Location of your property
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 ">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Select Country *</FormLabel> */}
                      <FormDescription>
                        In which country is your property located?
                      </FormDescription>
                      <Select
                        disabled={isLoading}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="bg-background">
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Select a Country"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => {
                            return (
                              <SelectItem
                                key={country.isoCode}
                                value={country.isoCode}
                              >
                                {country.name}
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Select Country *</FormLabel> */}
                      <FormDescription>
                        In which state is your property located?
                      </FormDescription>
                      <Select
                        disabled={isLoading || states.length < 1}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className=" bg-background">
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Select a State"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {states.map((state) => {
                            return (
                              <SelectItem
                                key={state.isoCode}
                                value={state.isoCode}
                              >
                                {state.name}
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-12 grid  grid-cols-1 gap-14">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormDescription>
                        In which town/city is your property located?
                      </FormDescription>
                      <Select
                        disabled={isLoading || cities.length < 1}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className=" bg-background">
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Select a Town or City"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {cities.map((city) => {
                            return (
                              <SelectItem key={city.name} value={city.name}>
                                {city.name}
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <div className="mt-2">
                  <FormField
                    control={form.control}
                    name="locationDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-primary">
                          Location Description *
                        </FormLabel>
                        <FormDescription>
                          Provide a detailed description of your location.
                        </FormDescription>
                        <FormControl>
                          <Textarea
                            placeholder="Located next to beach"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="pap-2 flex flex-wrap justify-between">
                  {hotel ? (
                    <Button
                      type="submit"
                      className="max-w-[150px]"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4" /> Updating
                        </>
                      ) : (
                        <>
                          <PencilLine className="mr-2 h-4 w-4" /> Update
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="max-w-[150px]"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4" /> Creating
                        </>
                      ) : (
                        <>
                          <Pencil className="mr-2 h-4 w-4" /> Create Hotel
                        </>
                      )}{' '}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default AddHotelForm
