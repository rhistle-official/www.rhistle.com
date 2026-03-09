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
      <div className="mx-auto flex max-w-7xl justify-between px-8 py-20 text-2xl">
        <p>성공적인 DX 전환, 리슬이 함께하겠습니다.</p>
        <div className="space-x-2">
          <a
            href={href}
            download={download}
            className="rounded-3xl bg-rhistle px-6 py-2 text-white hover:bg-rhistle/90"
          >
            {title}
          </a>
          <Link
            href={"/contact"}
            className="rounded-3xl bg-rhistle px-6 py-2 text-white hover:bg-rhistle/90"
          >
            문의하기
          </Link>
        </div>
      </div>
    </section>
  );
};
export default CallToAction;
