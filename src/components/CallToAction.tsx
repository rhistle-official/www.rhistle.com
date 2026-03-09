import { Link } from "@/i18n/navigation";

const CallToAction = ({
  href,
  download,
  title,
}: {
  href: string;
  download: string;
  title: string;
}) => {
  return (
    <section className="border-gray-200 border-t">
      <div className="mx-auto max-w-7xl items-center justify-between space-y-2 px-8 py-10 text-sm sm:flex md:py-15 md:text-base xl:py-20 xl:text-xl">
        <p>성공적인 DX 전환, 리슬이 함께하겠습니다.</p>
        <div className="space-x-2 space-y-2">
          <a
            href={href}
            download={download}
            className="inline-block rounded-3xl bg-rhistle px-6 py-2 text-white hover:bg-rhistle/90"
          >
            {title}
          </a>
          <Link
            href={"/contact"}
            className="inline-block rounded-3xl bg-rhistle px-6 py-2 text-white hover:bg-rhistle/90"
          >
            문의하기
          </Link>
        </div>
      </div>
    </section>
  );
};
export default CallToAction;
