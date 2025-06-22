import { redirect } from 'next/navigation';
import LeftSidebar from '../components/LeftSidebar'
import MainComponent from '../components/MainComponent'
import RightSection from '../components/RightSection'
import { getSessionUser } from '../lib/getSessionUser';
import { BsEnvelopeArrowDown, BsSearch } from 'react-icons/bs';
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

                <main className="w-[32%] mx-2 flex max-w-[600px] h-full min-h-screen flex-col border-l-[0.5px] border-r-[0.5px] border-gray-600">
                    <div className="sticky top-0 bg-black flex items-center justify-between">
                        <div className='text-xl font-bold p-3'>
                            Messages
                        </div>
                        <div className='text-xl px-2 ml-3 mr-1 font-bold hover:bg-gray-600'>
                            <RiSettings3Line />
                        </div>
                    </div>

                    <div className="flex items-center space-x-3 hover:bg-white/5 p-4 last:rounded-b-xl transition duration-200">
                        <div className="border-[1px] border-gray-600 rounded-full p-3 text-xl">
                            <BsEnvelopeArrowDown />
                        </div>
                        <div className="">
                            <div>Message Requests</div>
                            <div className='text-sm text-gray-600'>1 pending request</div>
                        </div>
                    </div>

                    <div className='flex flex-col ml-8 space-y-2 mt-4'>
                        <div className='font-bold text-4xl'>
                            Welcome to your inbox!
                        </div>
                        <div className='text-gray-600'>
                            Drop a line, share posts and more with private conversations between you and others on Swiftly.
                        </div>
                        <div>
                            <button className="mt-3 text-lg bg-blue-500 rounded-full text-white font-bold py-3 px-8 text-center hover:bg-blue-600 transition duration-200">
                                Write a message
                            </button>
                        </div>
                    </div>

                </main>


                <section className="w-[45%] sticky top-0 lg:flex flex-col items-stretch h-screen px-6 hidden">
                    <div className='flex items-center justify-center h-full flex-col ml-8 space-y-2 mt-4'>
                        <div className='flex flex-col justify-items-start space-y-3'>
                            <div className='font-bold text-4xl'>
                            Select a message
                        </div>
                        <div className='text-gray-600'>
                            Choose from your existing conversations, start a <br /> new one, or just keep swimming.
                        </div>
                        <div>
                            <button className="mt-3 text-lg bg-blue-500 rounded-full text-white font-bold py-3 px-8 text-center hover:bg-blue-600 transition duration-200">
                                New message
                            </button>
                        </div>
                        </div>
                    </div>

                </section>



                <div>

                </div>


            </div>
        </div>
    )
}
