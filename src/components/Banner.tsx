import Image, { type StaticImageData } from "next/image";

const Banner = ({
  bannerImg,
  title,
}: {
  bannerImg: StaticImageData;
  title: string;
}) => {
  return (
    <section className="relative h-100">
      <Image
        src={bannerImg}
        alt="company-banner"
        fill
        sizes="100vw"
        className="object-cover brightness-70"
        priority
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <p className="font-bold text-2xl text-white md:text-3xl lg:text-5xl">
          {title}
        </p>
      </div>
    </section>
  );
};
export default Banner;
