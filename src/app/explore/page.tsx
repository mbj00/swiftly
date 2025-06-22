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
                    <div className="sticky top-0 bg-black flex items-center">
                        <div className="text-sm relative w-full h-full py-2 px-4">
                            <label htmlFor="search" className="absolute top-0 pl-3 h-full flex items-center justify-center">
                                <BsSearch className=" text-gray-500 " />
                            </label>
                            <input type="text" name="" id="search" placeholder="Search" className="w-full h-full rounded-full py-3 px-8 outline-none border-[1px] border-gray-600 focus:border-blue-400 hover:bg-neutral-900/90 placeholder:text-white" />
                        </div>
                        <div className='text-xl px-2 ml-3 mr-1 font-bold hover:bg-gray-600'>
                            <RiSettings3Line />
                        </div>
                    </div>

                    <div className='flex items-center justify-evenly mt-3 font-bold'>
                        <div className='text-gray-600'>For You</div>
                        <div className='text-gray-600'>Trending</div>
                        <div className='text-gray-600'>News</div>
                        <div className='text-gray-600'>Sports</div>
                        <div className='text-gray-600'>Entertainment</div>
                    </div>

                    <div className="flex flex-col bg-transparent my-4  border-t-[1px] border-gray-600">
                        <h3 className="font-bold text-xl my-2 px-4">Today's News</h3>
                        <div>
                            {
                                Array.from({ length: 3 }).map((_, i) => (
                                    <div key={i} className="py-4 hover:bg-white/5 p-4 last:rounded-b-xl transition duration-200">
                                        <div className="font-bold text-xl">
                                            Lorem ipsum dolor sit amet consectetur adipisicing
                                        </div>
                                        <div className="text-xs text-bg-neutral-400 text-gray-400">
                                            Trending now · Sports · 427 posts
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="flex flex-col bg-transparent my-4  border-t-[1px] border-gray-600">
                        <h3 className="font-bold text-xl my-2 px-4">Trending Today</h3>
                        <div>
                            {
                                Array.from({ length: 6 }).map((_, i) => (
                                    <div key={i} className="hover:bg-white/5 p-4 last:rounded-b-xl transition duration-200">
                                        <div className="font-bold text-md">
                                            #Trending item {i + 1}
                                        </div>
                                        <div className="text-xs text-bg-neutral-400 text-gray-400">
                                            7.2k Tweets
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </main>

                <RightSection user={user} />
            </div>
        </div>
    )
}
