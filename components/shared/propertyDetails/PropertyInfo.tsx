import { IProperty } from "@/lib/models/property";
import React from "react";
import {
  FaBath,
  FaBed,
  FaCheck,
  FaMapMarkerAlt,
  FaRulerCombined,
} from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

const PropertyInfo = ({ property }: { property: IProperty }) => {
  return (
    <main>
      <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
        <div className="text-gray-500 mb-4">{property.type}</div>
        <h1 className="text-3xl font-bold mb-4">{property.name}</h1>
        <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
          <i className="fa-solid fa-location-dot text-lg text-orange-700 mr-2"></i>
          <p className="text-orange-700 flex items-center justify-center gap-1">
            {" "}
            <FaMapMarkerAlt size={20} />
            {property.location.street} {property.location.city}{" "}
            {property.location.state},{property.location?.zipcode}
          </p>
        </div>

        <h3 className="text-lg font-bold my-6 bg-gray-800 text-white p-2">
          Rates & Options
        </h3>
        <div className="flex flex-col md:flex-row justify-around">
          <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
            <div className="text-gray-500 mr-2 font-bold">Nightly</div>
            <div className="text-2xl font-bold">
              {property.rates.nightly ? (
                <div className="text-2xl font-bold text-blue-500">
                  ${property.rates.nightly.toLocaleString()}
                </div>
              ) : (
                <FaXmark className="text-red-700" size={24} />
              )}
            </div>
          </div>
          <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
            <div className="text-gray-500 mr-2 font-bold">Weekly</div>
            {property.rates.weekly ? (
              <div className="text-2xl font-bold text-blue-500">
                ${property.rates.weekly.toLocaleString()}
              </div>
            ) : (
              <FaXmark className="text-red-700" size={24} />
            )}
          </div>
          <div className="flex items-center justify-center mb-4 pb-4 md:pb-0">
            <div className="text-gray-500 mr-2 font-bold">Monthly</div>
            {property.rates.monthly ? (
              <div className="text-2xl font-bold text-blue-500">
                ${property.rates.monthly.toLocaleString()}
              </div>
            ) : (
              <FaXmark className="text-red-700" size={24} />
            )}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-bold mb-6">Description & Details</h3>
        <div className="flex justify-center gap-4 text-blue-500 mb-4 text-xl space-x-9">
          <p className="flex items-center justify-center gap-x-2">
            <FaBed size={24} /> {property.beds}
            <span className="hidden sm:inline">Beds</span>
          </p>
          <p className="flex items-center justify-center gap-x-2">
            <FaBath size={24} /> {property.baths}
            <span className="hidden sm:inline">Baths</span>
          </p>
          <p className="flex items-center justify-center gap-x-2">
            <FaRulerCombined size={24} /> {property.surface}
            <span className="hidden sm:inline">sqft</span>
          </p>
        </div>

        <p className="text-gray-500 mb-4 text-center">
          {property?.description}
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-bold mb-6">Amenities</h3>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none">
          {property.amenities.map((amenity) => (
            <li key={amenity} className="gap-2 flex items-center">
              <FaCheck className="text-green-600" /> {amenity}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <div id="map"></div>
      </div>
    </main>
  );
};

export default PropertyInfo;
