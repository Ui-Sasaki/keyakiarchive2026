import Image from "next/image";
import Link from "next/link";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="relative pt-8 pb-12 bg-[#CE2D2D] text-white touch-manipulation">
      {/* PC用 (md以上で表示) */}
      <div className="hidden p-5 my-5 mx-auto max-w-6xl md:flex justify-between gap-12">
        <div className="flex flex-start">
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.webp"
                alt="Logo"
                width={30}
                height={20}
                className="object-contain w-8 h-auto"
              />
              <span className="text-[16px] leading-none text-white text-left">
                2026広尾学園けやき祭ホームページ
              </span>
            </div>
            <div className="m-1 ml-9 flex flex-col items-start gap-3">
              <Link href="/" className="text-[13px] leading-none text-white">
                トップ
              </Link>
              <Link
                href="/group"
                className="text-[13px] leading-none text-white"
              >
                団体
              </Link>
              <Link
                href="/sales"
                className="text-[13px] leading-none text-white"
              >
                販売
              </Link>
              <Link
                href="/presentation"
                className="text-[13px] leading-none text-white"
              >
                プレゼン検索
              </Link>
              <Link
                href="/table"
                className="text-[13px] leading-none text-white"
              >
                タイムテーブル
              </Link>
              <Link
                href="/map"
                className="text-[13px] leading-none text-white"
              >
                校内マップ
              </Link>
              <Link
                href="/forVisiters"
                className="text-[13px] leading-none text-white"
              >
                ご来校の方へ
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-start ml-30 gap-3">
            <p className="text-[16px] text-white">Access</p>
            <div className="flex flex-col items-start gap-1">
              <div className="flex items-center gap-4">
                <Image
                  src="/home/Location.webp"
                  alt="Logo"
                  width={10}
                  height={20}
                  className="object-contain w-3 h-auto mb-3"
                />
                <span className="text-[13px] leading-none text-white text-start">
                  広尾学園中学校高等学校
                  <br />
                  〒106-0047 東京都港区南麻布5-1-14
                </span>
              </div>
              <span className="text-[13px] leading-5 text-white text-left">
                &nbsp;・電車をご利用の場合
                <br />
                &nbsp;&nbsp;東京メトロ日比谷線 広尾駅下車
                <br />
                &nbsp;&nbsp;4番出口すぐ
                <br />
                &nbsp;・バスをご利用の場合 都営バス
                <br />
                &nbsp;&nbsp;[品97] 品川駅前-新宿駅西口
                <br />
                &nbsp;&nbsp;[黒77] 目黒駅前-千駄ヶ谷駅前
                <br />
                &nbsp;&nbsp;日赤医療センター下・広尾学園前下車すぐ
                <br />
              </span>
            </div>
          </div>
        </div>
        <div>
          <p className="text-[16px] text-white text-left">SNS</p>
          <div className="flex items-center m-2 gap-4">
            <a
              href="https://x.com/hgkeyakifes"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-white"
            >
              <FaXTwitter className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/hg_keyakifes/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white"
            >
              <FaInstagram className="w-5 h-5" />
            </a>
            <div className="relative group">
              <a
                href="https://note.com/hirogakukeyaki"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Note"
                className="bg-white text-green-500 p-2 rounded-full shadow hover:bg-gray-100 transition duration-300 flex items-center justify-center w-[50px] h-[50px]"
              >
                <Image
                  src="/note.svg"
                  alt="note"
                  width={80}
                  height={80}
                  className="w-[48px] h-[48px] object-contain"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* スマホ用 (md未満で表示) */}
      <div className="flex flex-col gap-8 px-6 md:hidden">
        {/* ロゴ & サイトタイトル */}
        <div className="flex items-center gap-3 border-b border-white/20 pb-4">
          <Image
            src="/logo.webp"
            alt="Logo"
            width={30}
            height={20}
            className="object-contain w-8 h-auto"
          />
          <span className="text-[15px] font-medium text-white text-left leading-tight">
            2026広尾学園けやき祭ホームページ
          </span>
        </div>

        {/* ページリンク一覧 */}
        <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-left">
          <Link href="/" className="text-[13px] text-white hover:underline">
            トップ
          </Link>
          <Link href="/group" className="text-[13px] text-white hover:underline">
            団体
          </Link>
          <Link href="/sales" className="text-[13px] text-white hover:underline">
            販売
          </Link>
          <Link href="/presentation" className="text-[13px] text-white hover:underline">
            プレゼン検索
          </Link>
          <Link href="/table" className="text-[13px] text-white hover:underline">
            タイムテーブル
          </Link>
          <Link href="/map" className="text-[13px] text-white hover:underline">
            校内マップ
          </Link>
          <Link href="/forVisiters" className="text-[13px] text-white hover:underline">
            ご来校の方へ
          </Link>
        </div>

        {/* アクセス情報 */}
        <div className="text-left border-t border-white/20 pt-4 flex flex-col gap-2">
          <p className="text-[15px] font-bold text-white">Access</p>
          <div className="flex items-start gap-2">
            <Image
              src="/home/Location.webp"
              alt="Location"
              width={12}
              height={16}
              className="object-contain w-3 h-auto mt-1"
            />
            <div className="text-[12px] leading-relaxed text-white">
              <p className="font-medium">広尾学園中学校高等学校</p>
              <p>〒106-0047 東京都港区南麻布5-1-14</p>
            </div>
          </div>
          <div className="text-[12px] leading-relaxed text-white/90 pl-5 mt-1">
            <p className="font-semibold text-white">【電車】</p>
            <p className="mb-2">東京メトロ日比谷線 広尾駅 4番出口すぐ</p>
            <p className="font-semibold text-white">【バス】</p>
            <p>都営バス [品97] / [黒77]</p>
            <p>日赤医療センター下・広尾学園前下車すぐ</p>
          </div>
        </div>

        {/* SNSリンク */}
        <div className="text-left border-t border-white/20 pt-4">
          <p className="text-[15px] font-bold text-white mb-3">SNS</p>
          <div className="flex items-center gap-5">
            <a
              href="https://x.com/hgkeyakifes"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-white hover:opacity-80"
            >
              <FaXTwitter className="w-6 h-6" />
            </a>
            <a
              href="https://www.instagram.com/hg_keyakifes/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white hover:opacity-80"
            >
              <FaInstagram className="w-6 h-6" />
            </a>
            <a
              href="https://note.com/hirogakukeyaki"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Note"
              className="bg-white text-green-500 p-2 rounded-full shadow hover:bg-gray-100 transition duration-300 flex items-center justify-center w-[40px] h-[40px]"
            >
              <Image
                src="/note.svg"
                alt="note"
                width={40}
                height={40}
                className="w-[32px] h-[32px] object-contain"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;