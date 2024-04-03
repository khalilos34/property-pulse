"use client";
import { IProperty } from "@/lib/models/property";
import { FaShare } from "react-icons/fa";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

const ShareButton = ({ property }: { property: IProperty }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;
  return (
    <div>
      <h3 className="text-xl font-bold text-center pt-2">
        Share This Property
      </h3>
      <div className="flex items-center justify-center py-2 gap-3">
        <TwitterShareButton
          url={shareUrl}
          title={property.name}
          hashtags={[`${property.type} for rent`]}
        >
          <TwitterIcon size={40} round={true} />
        </TwitterShareButton>
        <FacebookShareButton
          url={shareUrl}
          hashtag={`${property.type} for rent`}
        >
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>
        <WhatsappShareButton url={shareUrl} title={`${property.type} for rent`}>
          <WhatsappIcon size={40} round={true} />
        </WhatsappShareButton>
      </div>
    </div>
  );
};

export default ShareButton;
