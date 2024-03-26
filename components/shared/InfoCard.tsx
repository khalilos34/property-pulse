import Link from "next/link";

const InfoCard = ({
  heading,
  children,
  backgroundColor = "bg-gray-100",
  textColor = "text-gray-800",
  buttonInfo,
}: {
  heading: string;
  children: string;
  backgroundColor?: string;
  textColor?: string;
  buttonInfo: { text: string; path: string };
}) => {
  return (
    <div className={`${backgroundColor} p-6 rounded-lg shadow-md`}>
      <h2 className={` ${textColor} text-2xl font-bold `}>{heading}</h2>
      <p className="mt-2 mb-4">{children}</p>
      <Link
        href={buttonInfo.path}
        className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
      >
        {buttonInfo.text}
      </Link>
    </div>
  );
};

export default InfoCard;
