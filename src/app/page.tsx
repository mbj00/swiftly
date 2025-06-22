import { redirect } from 'next/navigation';
import LeftSidebar from './components/LeftSidebar'
import MainComponent from './components/MainComponent'
import RightSection from './components/RightSection'
import { getSessionUser } from './lib/getSessionUser';

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
        {/* Pass user profile as props if needed */}
        <MainComponent user={user} />
        <RightSection user={user} />
      </div>
    </div> 
  )
}
