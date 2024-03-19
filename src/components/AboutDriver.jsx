import { Button } from "@/components/ui/button";
import MainSection from "./MainSection";

const AboutDriver = () => {
  return (
    <>
      <div className="relative py-32 lg:py-36 bg-white">
        <div className="mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 flex flex-col lg:flex-row gap-10 lg:gap-12">
          <div className="absolute w-full lg:w-1/2 inset-y-0 lg:right-0 hidden lg:block">
            <span className="absolute -left-6 md:left-4 top-24 lg:top-28 w-24 h-24 rotate-90 skew-x-12 rounded-3xl bg-fuchsia-400 blur-xl opacity-60 lg:opacity-95 lg:block hidden"></span>
            <span className="absolute right-4 bottom-12 w-24 h-24 rounded-3xl bg-rose-600 blur-xl opacity-80"></span>
          </div>
          <span className="w-4/12 lg:w-2/12 aspect-square bg-gradient-to-tr from-pink-500 to-fuchsia-600 absolute -top-5 lg:left-0 rounded-full skew-y-12 blur-2xl opacity-40 skew-x-12 rotate-90"></span>
          <div
            className="relative flex flex-col items-center text-center lg:text-left lg:py-7 xl:py-8 
            lg:items-start lg:max-w-none max-w-3xl mx-auto lg:mx-0 lg:flex-1 lg:w-1/2"
          >
            <h1
              className="text-3xl leading-tight sm:text-4xl md:text-5xl xl:text-6xl
            font-bold text-gray-900 mt-4"
            >
              Wanna Be a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-pink-400 from-20% via-fuchsia-600 via-30% to-orange-600 block mt-4">
                Driver ?
              </span>
            </h1>
            <span
              className=" text-3xl leading-tight sm:text-4xl md:text-5xl xl:text-6xl
            font-bold text-gray-900"
            >
              Aji t3raf kifach.
            </span>
          </div>
          <div className="flex flex-1 lg:w-1/2 lg:h-auto relative lg:max-w-none lg:mx-0 mx-auto max-w-3xl">
            <img
              src="https://www.intelligenttransport.com/wp-content/uploads/uber-women-750x450.jpg"
              alt="Hero image"
              className="lg:absolute lg:w-[90%] lg:h-80 rounded-3xl object-cover lg:max-h-none max-h-96"
            />
          </div>
        </div>
      </div>

      <div className=" flex">
        <div className="flex">
          <span className="text-[21rem] font-bold  p-0">1</span>
          <h1 className="text-6xl font-semibold">Create An account</h1>
        </div>
        <div></div>
      </div>

      <div className=" flex flex-row-reverse">
        <div className="flex flex-row-reverse">
          <span className="text-[21rem] font-bold  p-0">2</span>
          <h1 className="text-6xl font-semibold">Verify you identity</h1>
        </div>
        <div></div>
      </div>

      <div className=" flex">
        <div className="flex">
          <span className="text-[21rem] font-bold  p-0">3</span>
          <h1 className="text-6xl font-semibold">Start Driving</h1>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default AboutDriver;
