import { cn } from "@/lib/utils";

interface TagProps {
    text: string;
    classname:string;
  }
  
  const Tag: React.FC<TagProps> = ({ text, classname}) => {
    return (
      <h3
        className={cn("text-xs border p-1 rounded-sm", classname)}
      >
        {text}
      </h3>
    );
  };
  
  export default Tag;
  