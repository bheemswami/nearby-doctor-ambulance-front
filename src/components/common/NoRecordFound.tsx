import { InboxIcon } from "@heroicons/react/24/solid";

type NoRecordFoundProps = {
  text?: string;
};

const NoRecordFound = ({ text = "No records found." }: NoRecordFoundProps) => {
  return (
     <div className="py-10 text-center flex flex-col items-center">
      <div className="bg-gray-100 p-4 rounded-full shadow-sm">
        <InboxIcon className="w-12 h-12 text-gray-500" />
      </div>

      <p className="text-red-500 text-md font-medium mt-4">{text}</p>
    </div>
  );
};

export default NoRecordFound;
