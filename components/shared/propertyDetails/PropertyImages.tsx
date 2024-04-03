"use client";
import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";

const PropertyImages = ({ images }: { images: string[] }) => {
  return (
    <Gallery>
      <div className="bg-blue-50 p-4">
        <div className="container mx-auto">
          {images.length === 1 ? (
            <Item
              original={images[0]}
              thumbnail={images[0]}
              width={1000}
              height={600}
            >
              {({ ref, open }) => (
                <Image
                  ref={ref}
                  onClick={open}
                  src={images[0]}
                  alt="image"
                  width={1800}
                  height={400}
                  priority
                  className="object-cover hover:cursor-pointer h-[400px] mx-auto rounded-xl"
                />
              )}
            </Item>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`${
                    images.length === 3 && index == 2
                      ? "col-span-2"
                      : "col-span-1"
                  }`}
                >
                  <Item
                    original={image}
                    thumbnail={image}
                    width={1000}
                    height={600}
                  >
                    {({ ref, open }) => (
                      <Image
                        ref={ref}
                        onClick={open}
                        src={image}
                        alt="image"
                        width={0}
                        height={0}
                        sizes="100vw"
                        priority
                        className="object-cover h-[400px] hover:cursor-pointer w-full rounded-xl"
                      />
                    )}
                  </Item>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Gallery>
  );
};

export default PropertyImages;
