import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'

export default function Home() {

  const now = format(Date.now(), 'dd/MM/yyyy');

  return (
    <div className='bg-yellow-300 h-full'>
      <section className='py-4 flex justify-center font-semibold'>
        <form>
          <label htmlFor='origin'>Origin</label>
          <input id='origin' type='text' className='mx-4' />

          <label htmlFor='destination'>Destination</label>
          <input id='destination' type='text' className='mx-4' />

          <label htmlFor='date'>Date</label>
          <input id='date' type='text' className='mx-4 px-2' size={10} value={now} />

          <button className='rounded-sm text-white bg-black border-black border-2 p-0 font-medium px-2'>Search</button>
        </form>
      </section>
    </div>

  )
}
