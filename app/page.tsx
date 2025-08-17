import React from "react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center px-8">
      <div className="max-w-xl w-full mt-30 mb-20">
        <div className="flex justify-start mb-8">
          <img
            src="./icon.png"
            alt="fizzify"
            className="w-10 h-10 rounded-full"
          />
        </div>
        <div className="space-y-8">
          <div className="space-y-6 text-[#7a7a7a] text-[18px] font-medium leading-relaxed lowercase">
            <div className="flex flex-col gap-1">
              <span>by: shrit.</span>
              <span> published: aug 17, 2025.</span>
            </div>
            <p>I guess you're here to buy a cold drink.</p>

            <p>but from today onwards we're stopping delivering cold drinks</p>

            <p>
              I think we made too much of our name ourselves in the campus. We
              could've sold more bottles if we didn't make it this big
            </p>

            <p>
              It’s still crazy to me that so many people know me just because of
              cold drinks.
            </p>

            <p>
              we knew we will not be selling cold drink for this long. but we
              never thought that it can be this big
            </p>

            <p>
              thanks a lot, for trusting this dumb guy who came to banglore
              litreally a month ago, you're gonna see him more in future trying
              dumb shit
            </p>

            <p>
              but shrit is not going anywhere. i'm going to continue to make
              something crazy for you. muha
            </p>

            <img src="./bye.png" alt="fizzify" />
            <p>- Rishi - Yash - Tharun - Adarsh - Shreyas-</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
