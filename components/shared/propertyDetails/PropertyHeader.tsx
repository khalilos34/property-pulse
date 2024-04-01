const PropertyHeader = ({ src }: { src: string }) => {
  return (
    <section>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1">
          <img
            src={src}
            alt=""
            className="object-cover h-[400px] w-full"
            width={0}
            height={0}
            sizes="100vw"
          />
        </div>
      </div>
    </section>
  );
};

export default PropertyHeader;
