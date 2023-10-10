import parse, { Element } from "html-react-parser";
import Image from "next/image";

interface Props {
  body: string;
}

const PostBody: React.FC<Props> = ({ body }) => {
  const options = {
    replace: (domNode: any) => {
      if (domNode instanceof Element && domNode.attribs) {
        if (domNode.name === "img") {
          const { src, alt } = domNode.attribs;
          return (
            <Image
              src={src}
              alt={alt}
              width={1200}
              height={620}
              className="object-cover object-center w-full my-3 rounded-md h-auto max-h-[300px] md:max-h-[500px]"
            />
          );
        }
      }
    },
  };

  const renderBody = (body: string) => {
    return parse(body, options);
  };

  return <div className="rich-text">{renderBody(body)}</div>;
};

export default PostBody;
