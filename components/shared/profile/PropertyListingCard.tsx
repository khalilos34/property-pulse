"use client";
import { deleteProperty } from "@/lib/actions/properties.actions";
import { IProperty } from "@/lib/models/property";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";

const PropertyListingCard = ({ property }: { property: IProperty }) => {
  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this property ?"
    );
    if (!confirmed) return;
    await deleteProperty(id);
    toast.success("property deleted successfully");
  };
  return (
    <div className="mb-10">
      <Link href={`/properties/${property._id}`}>
        <Image
          className="h-32 w-full rounded-md object-cover"
          src={property.images[0]}
          alt="Property 1"
          height={0}
          width={0}
          sizes="100vw"
        />
      </Link>
      <div className="mt-2">
        <p className="text-lg font-semibold">{property.name}</p>
        <p className="text-gray-600">Address: {property.location.street}</p>
      </div>
      <div className="mt-2 flex items-center justify-start">
        <Link
          href={`/properties/${property._id}/edit`}
          className="bg-blue-500 text-white px-3 py-2 rounded-md mr-2 hover:bg-blue-600"
        >
          Edit
        </Link>
        <button
          className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
          type="button"
          onClick={() => handleDelete(property._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PropertyListingCard;
