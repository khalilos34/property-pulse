import Image from "next/image";

const PropertyImages = ({ images }: { images: string[] }) => {
  return (
    <div className="bg-blue-50 p-4">
      <div className="container mx-auto">
        {images.length === 1 ? (
          <Image
            src={images[0]}
            alt="images"
            width={1800}
            height={400}
            priority
            className="object-cover h-[400px] mx-auto rounded-xl"
          />
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
                <Image
                  src={image}
                  alt="image"
                  width={0}
                  height={0}
                  sizes="100vw"
                  priority
                  className="object-cover h-[400px] w-full rounded-xl"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyImages;
