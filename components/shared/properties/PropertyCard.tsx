import Image from "next/image";
import Link from "next/link";
import {
  FaBath,
  FaBed,
  FaMapMarker,
  FaMapMarkerAlt,
  FaMoneyBill,
  FaRulerCombined,
} from "react-icons/fa";

const PropertyCard = ({ property }: any) => {
  const { rates } = property;
  const getRatesDisplay = () => {
    if (rates.monthly) {
      return `${rates.monthly.toLocaleString()}/mo`;
    } else if (rates.weekly) {
      return `${rates.weekly.toLocaleString()}/wk`;
    } else if (rates.nightly) {
      return `${rates.nightly.toLocaleString()}/night`;
    }
  };
  return (
    <div className="rounded-xl shadow-md relative">
      <Image
        src={`/properties/${property.images[0]}`}
        alt="property background"
        height={0}
        width={0}
        sizes="100vw"
        className="w-full h-auto rounded-t-xl"
      />
      <div className="p-4">
        <div className="text-left md:text-center lg:text-left mb-6">
          <div className="text-gray-600">{property.type}</div>
          <h3 className="text-xl font-bold">{property.name}</h3>
        </div>
        <h3 className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
          ${getRatesDisplay()}
        </h3>

        <div className="flex justify-center gap-4 text-gray-500 mb-4">
          <p className="flex items-center justify-center gap-x-2">
            <FaBed />
            <span className="md:hidden lg:inline">{property.beds}</span>
          </p>
          <p className="flex items-center justify-center gap-x-2">
            <FaBath />
            <span className="md:hidden lg:inline">{property.baths}</span>
          </p>
          <p className="flex items-center justify-center gap-x-2">
            <FaRulerCombined />
            {property.square_feet}
            <span className="md:hidden lg:inline">sqft</span>
          </p>
        </div>

        <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
          {rates.nightly && (
            <p className="flex items-center justify-center gap-x-2">
              {" "}
              <FaMoneyBill /> nightly
            </p>
          )}
          {rates.monthly && (
            <p className="flex items-center justify-center gap-x-2">
              {" "}
              <FaMoneyBill />
              monthly
            </p>
          )}
          {rates.weekly && (
            <p className="flex items-center justify-center gap-x-2">
              <FaMoneyBill />
              weekly
            </p>
          )}
        </div>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="flex align-middle gap-2 mb-4 lg:mb-0">
            <span className="text-orange-700 flex items-center justify-center gap-x-2">
              <FaMapMarkerAlt />
              {property.location.city} {property.location.state}
            </span>
          </div>
          <Link
            href={`/properties/${property._id}`}
            className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
