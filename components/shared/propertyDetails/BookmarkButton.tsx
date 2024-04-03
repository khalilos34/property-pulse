"use client";
import { IProperty } from "@/lib/models/property";
import { useEffect, useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";

const BookmarkButton = ({ property }: { property: IProperty }) => {
  const [isPropertyBookmarked, setIsPropertyBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkBookmark = async () => {
      try {
        const res = await fetch("/api/bookmarks/check", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            propertyId: property._id,
          }),
        });
        if (res.status === 200) {
          const data = await res.json();

          setIsPropertyBookmarked(data.isPropertyBookmarked);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    checkBookmark();
  }, [property._id]);
  const handleClick = async () => {
    try {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          propertyId: property._id,
        }),
      });
      if (res.status === 200) {
        const data = await res.json();
        toast.success(data.message);
        setIsPropertyBookmarked(data.isPropertyBookmarked);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  if (loading) return <p className="text-center">loading...</p>;
  return isPropertyBookmarked ? (
    <button
      onClick={handleClick}
      className="bg-red-500 hover:bg-blue-600 gap-x-2 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark /> remove Bookmark
    </button>
  ) : (
    <button
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-600 gap-x-2 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark /> Bookmark Property
    </button>
  );
};

export default BookmarkButton;
