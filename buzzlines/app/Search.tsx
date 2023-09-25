'use client'

import { Select, SelectItem } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import format from 'date-fns/format'
import { error } from 'console'

interface City {
    id: string
    name: string
}

const Search = () => {
    const [origins, setOrigins] = useState<City[]>([])
    const [originId, setOriginId] = useState('')

    const [destinations, setDestinations] = useState<City[]>([])
    const [destinationId, setDestinationId] = useState('')


    useEffect(() => {
        fetch('http://localhost:3001/origins')
            .then((res) => res.json())
            .then((data) => {
                setOrigins(data)
                console.log('ORIGS', data)
            })
    }, [])

    useEffect(() => {

        fetch('http://localhost:3001/destinations?origin=' + originId)
            .then(res => res.json())
            .then(data => {
                setDestinations(data)
                data.
                    console.log('DESTS', data)
            })
            .catch(error => {

            })
    }, [originId])

    const now = format(Date.now(), 'dd/MM/yyyy')
    return (
        <div className='bg-yellow-300 h-full'>
            <section className='py-4 flex justify-center font-semibold'>
                <form>
                    <label htmlFor='origin' className='mx-4'>Origin</label>

                    <select
                        id='origin'
                        onChange={(e) => setOriginId(e.target.value)}
                        className='w-48 bg-white border border-black text-black text-md rounded-sm focus:ring-blue-500 focus:border-blue-500  p-1'
                    >
                        <option key={0} value=''></option>
                        {origins.map((origin) => (
                            <option key={origin.id} value={origin.id}>{origin.name}</option>
                        ))}
                    </select>

                    <label htmlFor='destination' className='mx-2'>Destination</label>
                    <select
                        id='destination'
                        onChange={(e) => setDestinationId(e.target.value)}
                        className='w-48 bg-white border border-black text-black text-md rounded-sm focus:ring-blue-500 focus:border-blue-500  p-1'
                    >
                        {destinations.map((destination) => (
                            <option key={destination.id} value={destination.id}>{destination.name}</option>
                        ))}
                    </select>

                    <label htmlFor='date' className='mx-4'>Date</label>
                    <input id='date' type='text' className='px-2' size={10} />

                    <button className='rounded-sm text-white bg-black border-black border-2 ont-medium px-2 mx-2'>Search</button>
                </form>
            </section>
        </div >
    );
}

export default Search;