import { redirect } from 'next/navigation';
import LeftSidebar from '../components/LeftSidebar'
import MainComponent from '../components/MainComponent'
import RightSection from '../components/RightSection'
import { getSessionUser } from '../lib/getSessionUser';
import { BsSearch } from 'react-icons/bs';
import { CiSettings } from 'react-icons/ci';
import { RiSettings3Line } from 'react-icons/ri';

export default async function HomePage() {
    const user = await getSessionUser();
    // console.log(user);
    if (!user) {
        redirect('/userauth');
    }
    return (
        <div className='w-full h-full flex justify-center text-white items-center relative bg-black'>
            <div className='max-w-screen w-full h-full flex relative'>
                <LeftSidebar user={user} />

                <main className="w-[45%] mx-2 flex max-w-[600px] h-full min-h-screen flex-col border-l-[0.5px] border-r-[0.5px] border-gray-600">
                    <div className="sticky top-0 bg-black flex items-center justify-between">
                        <div className='text-xl font-bold p-3'>
                            Notifications
                        </div>
                        <div className='text-xl px-2 ml-3 mr-1 font-bold hover:bg-gray-600'>
                            <RiSettings3Line />
                        </div>
                    </div>

                    <div className='flex items-center justify-evenly mt-1 py-3 font-bold border-b-[1px] border-gray-600'>
                        <div className='text-gray-600'>All</div>
                        <div className='text-gray-600'>Verified</div>
                        <div className='text-gray-600'>Mentions</div>
                    </div>
                    
                </main>

                <RightSection user={user} />
            </div>
        </div>
    )
}
