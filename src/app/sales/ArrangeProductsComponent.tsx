import Image from "next/image";
import { IMAGE_OPTIONS } from "@/constants/products";
import Photo1 from "../../../public/sales/1.webp";
import Photo2 from "../../../public/sales/2.webp";
import Photo3 from "../../../public/sales/3.webp";
import Photo4 from "../../../public/sales/4.webp";
import Photo5 from "../../../public/sales/5.webp";
import Photo6 from "../../../public/sales/6.webp";
import Photo7 from "../../../public/sales/7.webp";
import Photo8 from "../../../public/sales/8.webp";
import Photo9 from "../../../public/sales/9.webp";
import Photo10 from "../../../public/sales/10.webp";
import Photo11 from "../../../public/sales/11.webp";
import Photo12 from "../../../public/sales/12.webp";
import Photo13 from "../../../public/sales/13.webp";
import Photo14 from "../../../public/sales/14.webp";
import Photo15 from "../../../public/sales/15.webp";
import Photo16 from "../../../public/sales/16.webp";
import Photo17 from "../../../public/sales/17.webp";
import Photo18 from "../../../public/sales/18.webp";
import Photo19 from "../../../public/sales/19.webp";
import Photo20 from "../../../public/sales/20.webp";
import Photo21 from "../../../public/sales/21.webp";
import Photo22 from "../../../public/sales/22.webp";
import Photo23 from "../../../public/sales/23.webp";
import Photo24 from "../../../public/sales/24.webp";
import Photo25 from "../../../public/sales/25.webp";
import Photo26 from "../../../public/sales/26.webp";
import Photo27 from "../../../public/sales/27.webp";
import Photo28 from "../../../public/sales/28.webp";
import Photo29 from "../../../public/sales/29.webp";
import Photo30 from "../../../public/sales/30.webp";
import Photo31 from "../../../public/sales/31.webp";
import Photo32 from "../../../public/sales/32.webp";
import Photo33 from "../../../public/sales/33.webp";
import Photo34 from "../../../public/sales/34.webp";
import Photo35 from "../../../public/sales/35.webp";
import Photo36 from "../../../public/sales/36.webp";
import Photo37 from "../../../public/sales/37.webp";
import Photo38 from "../../../public/sales/38.webp";
import Photo39 from "../../../public/sales/39.webp";
import Photo40 from "../../../public/sales/40.webp";
import Photo41 from "../../../public/sales/41.webp";
import Photo42 from "../../../public/sales/42.webp";
import Photo43 from "../../../public/sales/43.webp";
import Photo44 from "../../../public/sales/44.webp";
import Photo45 from "../../../public/sales/45.webp";
import Photo46 from "../../../public/sales/46.webp";
import Photo47 from "../../../public/sales/47.webp";
import Photo48 from "../../../public/sales/48.webp";
import Photo49 from "../../../public/sales/49.webp";
import Photo50 from "../../../public/sales/50.webp";
import Photo51 from "../../../public/sales/51.webp";
import Photo52 from "../../../public/sales/52.webp";
import Photo53 from "../../../public/sales/53.webp";
import Photo54 from "../../../public/sales/54.webp";
import Photo55 from "../../../public/sales/55.webp";
import Photo56 from "../../../public/sales/56.webp";
import Photo57 from "../../../public/sales/57.webp";
import Photo58 from "../../../public/sales/58.webp";
import Photo59 from "../../../public/sales/59.webp";
import Photo60 from "../../../public/sales/60.webp";
import Photo61 from "../../../public/sales/61.webp";
import Photo62 from "../../../public/sales/62.webp";
import Photo63 from "../../../public/sales/63.webp";
import Photo64 from "../../../public/sales/64.webp";
import Photo65 from "../../../public/sales/65.webp";
import Photo66 from "../../../public/sales/66.webp";
import Photo67 from "../../../public/sales/67.webp";
import Photo68 from "../../../public/sales/68.webp";
import Photo69 from "../../../public/sales/69.webp";
import Photo70 from "../../../public/sales/70.webp";
import Photo71 from "../../../public/sales/71.webp";
import Photo72 from "../../../public/sales/72.webp";
import Photo73 from "../../../public/sales/73.webp";
import Photo74 from "../../../public/sales/74.webp";
import Photo75 from "../../../public/sales/75.webp";
import Photo76 from "../../../public/sales/76.webp";
import Photo77 from "../../../public/sales/77.webp";
import Photo78 from "../../../public/sales/78.webp";

import { LuMapPin } from "react-icons/lu";
import { ca } from "zod/v4/locales";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  imageId: number;
  isHirooPayEnabled: number;
  detail: string | null;
  teamId: string;
}

interface Team {
  id: string;
  name: string;
}

interface FilterState {
  showAvailable: boolean;
  showHirooPay: boolean;
}

export default function ArrangeProducts({
  products,
  teams,
  filters,
}: {
  products: Product[];
  teams: Team[];
  filters: FilterState;
}) {
  function filterAndSortProducts(products: Product[], filters: FilterState) {
    let filteredProducts = products;

    // 販売中のみ表示がチェックされている場合
    if (filters.showAvailable) {
      filteredProducts = filteredProducts.filter(
        (product) => product.stock > 0,
      );
    }

    // HirooPay使用可のみ表示がチェックされている場合
    if (filters.showHirooPay) {
      filteredProducts = filteredProducts.filter(
        (product) => product.isHirooPayEnabled === 1,
      );
    }

    return filteredProducts.sort((a, b) => {
      // まず価格で比較
      const priceDiff = a.price - b.price;
      if (priceDiff !== 0) {
        return priceDiff;
      }

      // 価格が同じ場合はチームIDで比較して同じチームを隣接させる
      return a.teamId.localeCompare(b.teamId);
    });
  }
  const returnImage = (imageId: number) => {
    const imageProps = {
      fill: true,
      className: "object-contain",
    };

    switch (imageId) {
      case 0:
        return (
          <div className="aspect-[4/3] bg-gray-300 flex items-center justify-center">
            <p className="text-gray-500 text-xl">No Image</p>
          </div>
        );
      case 1:
        return (
          <Image src={Photo1} alt={IMAGE_OPTIONS[1].label} {...imageProps} />
        );
      case 2:
        return (
          <Image src={Photo2} alt={IMAGE_OPTIONS[2].label} {...imageProps} />
        );
      case 3:
        return (
          <Image src={Photo3} alt={IMAGE_OPTIONS[3].label} {...imageProps} />
        );
      case 4:
        return (
          <Image src={Photo4} alt={IMAGE_OPTIONS[4].label} {...imageProps} />
        );
      case 5:
        return (
          <Image src={Photo5} alt={IMAGE_OPTIONS[5].label} {...imageProps} />
        );
      case 6:
        return (
          <Image src={Photo6} alt={IMAGE_OPTIONS[6].label} {...imageProps} />
        );
      case 7:
        return (
          <Image src={Photo7} alt={IMAGE_OPTIONS[7].label} {...imageProps} />
        );
      case 8:
        return (
          <Image src={Photo8} alt={IMAGE_OPTIONS[8].label} {...imageProps} />
        );
      case 9:
        return (
          <Image src={Photo9} alt={IMAGE_OPTIONS[9].label} {...imageProps} />
        );
      case 10:
        return (
          <Image src={Photo10} alt={IMAGE_OPTIONS[10].label} {...imageProps} />
        );
      case 11:
        return (
          <Image src={Photo11} alt={IMAGE_OPTIONS[11].label} {...imageProps} />
        );
      case 12:
        return (
          <Image src={Photo12} alt={IMAGE_OPTIONS[12].label} {...imageProps} />
        );
      case 13:
        return (
          <Image src={Photo13} alt={IMAGE_OPTIONS[13].label} {...imageProps} />
        );
      case 14:
        return (
          <Image src={Photo14} alt={IMAGE_OPTIONS[14].label} {...imageProps} />
        );
      case 15:
        return (
          <Image src={Photo15} alt={IMAGE_OPTIONS[15].label} {...imageProps} />
        );
      case 16:
        return (
          <Image src={Photo16} alt={IMAGE_OPTIONS[16].label} {...imageProps} />
        );
      case 17:
        return (
          <Image src={Photo17} alt={IMAGE_OPTIONS[17].label} {...imageProps} />
        );
      case 18:
        return (
          <Image src={Photo18} alt={IMAGE_OPTIONS[18].label} {...imageProps} />
        );
      case 19:
        return (
          <Image src={Photo19} alt={IMAGE_OPTIONS[19].label} {...imageProps} />
        );
      case 20:
        return (
          <Image src={Photo20} alt={IMAGE_OPTIONS[20].label} {...imageProps} />
        );
      case 21:
        return (
          <Image src={Photo21} alt={IMAGE_OPTIONS[21].label} {...imageProps} />
        );
      case 22:
        return (
          <Image src={Photo22} alt={IMAGE_OPTIONS[22].label} {...imageProps} />
        );
      case 23:
        return (
          <Image src={Photo23} alt={IMAGE_OPTIONS[23].label} {...imageProps} />
        );
      case 24:
        return (
          <Image src={Photo24} alt={IMAGE_OPTIONS[24].label} {...imageProps} />
        );
      case 25:
        return (
          <Image src={Photo25} alt={IMAGE_OPTIONS[25].label} {...imageProps} />
        );
      case 26:
        return (
          <Image src={Photo26} alt={IMAGE_OPTIONS[26].label} {...imageProps} />
        );
      case 27:
        return (
          <Image src={Photo27} alt={IMAGE_OPTIONS[27].label} {...imageProps} />
        );
      case 28:
        return (
          <Image src={Photo28} alt={IMAGE_OPTIONS[28].label} {...imageProps} />
        );
      case 29:
        return (
          <Image src={Photo29} alt={IMAGE_OPTIONS[29].label} {...imageProps} />
        );
      case 30:
        return (
          <Image src={Photo30} alt={IMAGE_OPTIONS[30].label} {...imageProps} />
        );
      case 31:
        return (
          <Image src={Photo31} alt={IMAGE_OPTIONS[31].label} {...imageProps} />
        );
      case 32:
        return (
          <Image src={Photo32} alt={IMAGE_OPTIONS[32].label} {...imageProps} />
        );
      case 33:
        return (
          <Image src={Photo33} alt={IMAGE_OPTIONS[33].label} {...imageProps} />
        );
      case 34:
        return (
          <Image src={Photo34} alt={IMAGE_OPTIONS[34].label} {...imageProps} />
        );
      case 35:
        return (
          <Image src={Photo35} alt={IMAGE_OPTIONS[35].label} {...imageProps} />
        );
      case 36:
        return (
          <Image src={Photo36} alt={IMAGE_OPTIONS[36].label} {...imageProps} />
        );
      case 37:
        return (
          <Image src={Photo37} alt={IMAGE_OPTIONS[37].label} {...imageProps} />
        );
      case 38:
        return (
          <Image src={Photo38} alt={IMAGE_OPTIONS[38].label} {...imageProps} />
        );
      case 39:
        return (
          <Image src={Photo39} alt={IMAGE_OPTIONS[39].label} {...imageProps} />
        );
      case 40:
        return (
          <Image src={Photo40} alt={IMAGE_OPTIONS[40].label} {...imageProps} />
        );
      case 41:
        return (
          <Image src={Photo41} alt={IMAGE_OPTIONS[41].label} {...imageProps} />
        );
      case 42:
        return (
          <Image src={Photo42} alt={IMAGE_OPTIONS[42].label} {...imageProps} />
        );
      case 43:
        return (
          <Image src={Photo43} alt={IMAGE_OPTIONS[43].label} {...imageProps} />
        );
      case 44:
        return (
          <Image src={Photo44} alt={IMAGE_OPTIONS[44].label} {...imageProps} />
        );
      case 45:
        return (
          <Image src={Photo45} alt={IMAGE_OPTIONS[45].label} {...imageProps} />
        );
      case 46:
        return (
          <Image src={Photo46} alt={IMAGE_OPTIONS[46].label} {...imageProps} />
        );
      case 47:
        return (
          <Image src={Photo47} alt={IMAGE_OPTIONS[47].label} {...imageProps} />
        );
      case 48:
        return (
          <Image src={Photo48} alt={IMAGE_OPTIONS[48].label} {...imageProps} />
        );
      case 49:
        return (
          <Image src={Photo49} alt={IMAGE_OPTIONS[49].label} {...imageProps} />
        );
      case 50:
        return (
          <Image src={Photo50} alt={IMAGE_OPTIONS[50].label} {...imageProps} />
        );
        case 51:
        return (
          <Image src={Photo51} alt={IMAGE_OPTIONS[51].label} {...imageProps} />
        );
        case 52:
        return (
          <Image src={Photo52} alt={IMAGE_OPTIONS[52].label} {...imageProps} />
        );  
        case 53:
        return (
          <Image src={Photo53} alt={IMAGE_OPTIONS[53].label} {...imageProps} />
        );
        case 54:
        return (
          <Image src={Photo54} alt={IMAGE_OPTIONS[54].label} {...imageProps} />
        );
        case 55:
        return (
          <Image src={Photo55} alt={IMAGE_OPTIONS[55].label} {...imageProps} />
        );
        case 56:
        return (
          <Image src={Photo56} alt={IMAGE_OPTIONS[56].label} {...imageProps} />
        );
        case 57:
        return (
          <Image src={Photo57} alt={IMAGE_OPTIONS[57].label} {...imageProps} />
        );
        case 58:
        return (
          <Image src={Photo58} alt={IMAGE_OPTIONS[58].label} {...imageProps} />
        );
        case 59:
        return (
          <Image src={Photo59} alt={IMAGE_OPTIONS[59].label} {...imageProps} />
        ); 
        case 60:
        return (
          <Image src={Photo60} alt={IMAGE_OPTIONS[60].label} {...imageProps} />
        );
        case 61:
        return (
          <Image src={Photo61} alt={IMAGE_OPTIONS[61].label} {...imageProps} />
        );
        case 62:
        return (
          <Image src={Photo62} alt={IMAGE_OPTIONS[62].label} {...imageProps} />
        );
        case 63:
        return (
          <Image src={Photo63} alt={IMAGE_OPTIONS[63].label} {...imageProps} />
        );  
        case 64:
        return (
          <Image src={Photo64} alt={IMAGE_OPTIONS[64].label} {...imageProps} />
        );
        case 65:
        return (
          <Image src={Photo65} alt={IMAGE_OPTIONS[65].label} {...imageProps} />
        );
        case 66:
        return (
          <Image src={Photo66} alt={IMAGE_OPTIONS[66].label} {...imageProps} />
        );
        case 67:
        return (
          <Image src={Photo67} alt={IMAGE_OPTIONS[67].label} {...imageProps} />
        );
        case 68:
        return (
          <Image src={Photo68} alt={IMAGE_OPTIONS[68].label} {...imageProps} />
        );
        case 69:
        return (
          <Image src={Photo69} alt={IMAGE_OPTIONS[69].label} {...imageProps} />
        );
        case 70:
        return (
          <Image src={Photo70} alt={IMAGE_OPTIONS[70].label} {...imageProps} />
        );
        case 71:
        return (
          <Image src={Photo71} alt={IMAGE_OPTIONS[71].label} {...imageProps} />
        );
        case 72:
        return (
          <Image src={Photo72} alt={IMAGE_OPTIONS[72].label} {...imageProps} />
        );
        case 73:
        return (
          <Image src={Photo73} alt={IMAGE_OPTIONS[73].label} {...imageProps} />
        );
        case 74:
        return (
          <Image src={Photo74} alt={IMAGE_OPTIONS[74].label} {...imageProps} />
        );
        case 75:
        return (
          <Image src={Photo75} alt={IMAGE_OPTIONS[75].label} {...imageProps} />
        );
        case 76:
        return (
          <Image src={Photo76} alt={IMAGE_OPTIONS[76].label} {...imageProps} />
        );
        case 77:
        return (
          <Image src={Photo77} alt={IMAGE_OPTIONS[77].label} {...imageProps} />
        );
        case 78:
        return (
          <Image src={Photo78} alt={IMAGE_OPTIONS[78].label} {...imageProps} />
        );

      default:
        return (
          <div className="w-40 h-40 bg-gray-300 flex items-center justify-center">
            <p className="text-gray-500 text-2xl">No Image</p>
          </div>
        );
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:px-6">
      {filterAndSortProducts(products, filters).map((product: Product) => (
        <div
          key={product.id}
          className={`bg-white border-3 border-gray-100 rounded-lg overflow-hidden shadow-xl hover:shadow-lg transition-all duration-300 select-none ${
            product.stock === 0
              ? "border-red-600 hover:border-red-500"
              : product.stock === 1
                ? "border-yellow-500 hover:border-yellow-400"
                : product.isHirooPayEnabled === 1
                  ? "border-green-600 hover:border-green-500"
                  : "border-green-600 hover:border-green-500"
          }`}
        >
          <div className="aspect-[4/3] bg-gray-200 relative overflow-hidden">
            {returnImage(Number(product.imageId))}
            {product.stock === 0 && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-white font-bold text-4xl md:text-5xl lg:text-6xl transform -rotate-12 opacity-80 select-none">
                  SOLD OUT
                </div>
              </div>
            )}
          </div>

          <div className="p-4 select-none">
            <div className="mb-2 flex flex-wrap gap-2">
              <span
                className={`inline-block px-2 py-1 rounded text-xs transition-colors duration-200 ${
                  product.isHirooPayEnabled === 1
                    ? "bg-sky-700 text-white"
                    : product.stock === 0
                      ? "bg-pink-600 text-white"
                      : "bg-gray-700 text-white"
                }`}
              >
                {product.isHirooPayEnabled === 1
                  ? "HirooPay利用可"
                  : product.stock === 0
                    ? "HirooPay利用不可（売り切れ）"
                    : "HirooPay利用不可"}
              </span>
            </div>

            <h3 className="font-bold text-lg mb-3 select-none">
              {product.name.split("/").map((part, index) => (
                <span key={index}>
                  {part}
                  {index < product.name.split("/").length - 1 && <br />}
                </span>
              ))}
            </h3>

            <div className="text-sm text-gray-600 space-y-1 select-none">
              <p>価格: ¥{product.price.toLocaleString()}</p>
              <p className="flex items-center gap-1">
                <LuMapPin className="inline-block" size={14} />
                {teams.find((team) => team.id === product.teamId)?.name}
              </p>
              {product.detail && (
                <p className="text-xs mt-2 max-h-16 overflow-auto break-words whitespace-pre-wrap">
                  {product.detail}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
