import BookmarkButton from "./BookmarkButton";
import { IProperty } from "@/lib/models/property";
import ShareButton from "./ShareButton";
import ContactForm from "./ContactForm";

const Sidebar = ({ property }: { property: IProperty }) => {
  return (
    <aside className="space-y-4">
      <BookmarkButton property={property} />
      <ShareButton property={property} />
      <ContactForm property={property} />
    </aside>
  );
};

export default Sidebar;
