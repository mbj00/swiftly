import { BsSearch } from "react-icons/bs"

type Props = {
  user: {
    id: string;
    email: string;
    username: string;
    fullname: string;
  } | null;
};

const RightSection = ({ user }: Props) => {
  return (
    <section className="w-[30%] sticky top-0 overflow-y-scroll lg:flex flex-col items-stretch h-screen px-6 hidden">
          <div className="sticky top-0 bg-black">
            <div className="relative w-full h-full py-2 ">
              <label htmlFor="search" className="absolute top-0 pl-3 h-full flex items-center justify-center">
                <BsSearch className="text-sm text-gray-500 " />
              </label>
              <input type="text" name="" id="search" placeholder="Search" className="w-full h-full text-xs rounded-full py-3 px-8 outline-none border-[1px] border-gray-600 focus:border-blue-400 hover:bg-neutral-900/90 placeholder:text-white" />
            </div>
          </div>
          <div className="flex flex-col rounded-xl bg-transparent my-4 border-[1px] border-gray-600">
            <h3 className="font-bold text-xl my-2 px-4">What's Happening</h3>
            <div>
              {
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="hover:bg-white/5 p-4 last:rounded-b-xl transition duration-200">
                    <div className="font-bold text-md">
                      #Trending item {i + 1}
                    </div>
                    <div className="text-xs text-bg-neutral-400 text-gray-400">
                      13.2k Tweets
                    </div>
                  </div>
                ))
              }
            </div>
          </div>

          <div className="flex flex-col rounded-xl bg-transparent my-4 border-[1px] border-gray-600">
            <h3 className="font-bold text-xl my-2 px-4">Who to Follow</h3>
            <div>
              {
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="hover:bg-white/5 flex items-center justify-between text-sm p-4 last:rounded-b-xl transition duration-200">
                    <div className="flex">
                      <div className="w-10 h-10 rounded-full bg-gray-400"></div>
                      <div className="flex flex-col ms-1">
                        <div className="font-bold text-white">Other Usrname</div>
                        <div className="text-gray-500">@otherusername123</div>
                      </div>
                    </div>
                    <div>
                      <button className="bg-white text-black font-bold py-2 px-3 rounded-2xl">
                        Follow
                      </button>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>

        </section>
  )
}

export default RightSection
