import React from "react";
import CartComponent from "@/components/cart";
import Navbar from "@/components/navbar";

const MasterHeadPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Team</h2>
          <p className="text-xl text-gray-600">
            Meet the amazing people behind Fizzify
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="text-center">
              <img
                src="/head/shrit.png"
                alt="Shrit"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Shrit
              </h3>
              <p className="text-blue-600 font-medium mb-2">
                Chief Executive Officer (CEO)
              </p>
              <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Active
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="text-center">
              <img
                src="/head/akshit.png"
                alt="Akshit"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Akshit
              </h3>
              <p className="text-blue-600 font-medium mb-2">CTO</p>
              <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Active
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="text-center">
              <img
                src="/head/tharun.png"
                alt="Tharun"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Tharun
              </h3>
              <p className="text-blue-600 font-medium mb-2">
                Chief Design Officer (CDO)
              </p>
              <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Active
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="text-center">
              <img
                src="/head/ritu.png"
                alt="Ritu"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Ritu</h3>
              <p className="text-blue-600 font-medium mb-2">
                Chief Financial Officer (CFO)
              </p>
              <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Active
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="text-center">
              <img
                src="/icon.png"
                alt="Adarsh"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Adarsh
              </h3>
              <p className="text-blue-600 font-medium mb-2">CCO</p>
              <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Active
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="text-center">
              <img
                src="/head/yash.png"
                alt="Yash"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Yash</h3>
              <p className="text-blue-600 font-medium mb-2">
                Chief Random Officer (CRO)
              </p>
              <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Active
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="text-center">
              <img
                src="/head/raj.png"
                alt="Raj"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Raj</h3>
              <p className="text-blue-600 font-medium mb-2">
                Chief Random Officer (CRO)
              </p>
              <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Active
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="text-center">
              <img
                src="/head/rishi.png"
                alt="Rishi"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Rishi
              </h3>
              <p className="text-blue-600 font-medium mb-2">
                Chief Cool Content Officer (CCCO)
              </p>
              <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Active
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="text-center">
              <img
                src="/head/shreyas.png"
                alt="Shreyad"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Shreyas
              </h3>
              <p className="text-blue-600 font-medium mb-2">
                Chief Strategic Officer (CSO)
              </p>
              <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Active
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MasterHeadPage;
