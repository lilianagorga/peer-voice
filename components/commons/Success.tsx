import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

interface SuccessProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageUrl?: string;
  imageAlt?: string;
}

const Success = ({
  title,
  description,
  buttonText,
  buttonLink,
  imageUrl = "/assets/gifs/success.gif",
  imageAlt = "success",
}: SuccessProps) => {
  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <section className="flex flex-col items-center">
          <Image
            src={imageUrl}
            height={300}
            width={280}
            alt={imageAlt}
            unoptimized
            priority
          />
          <h2 className="header mb-6 max-w-[600px] text-center">{title}</h2>
          <p>{description}</p>
        </section>

        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={buttonLink}>{buttonText}</Link>
        </Button>
      </div>
    </div>
  );
};

export default Success;