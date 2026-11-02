import SalesComponent from "./SalesComponent";
import productsData from "./products.json";
import teamsData from "./teams.json";


interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  isHirooPayEnabled: number;
  imageId: number;
  type: number;
  detail: string | null;
  teamId: string;
}

interface Team {
  id: string;
  name: string;
}

// 商品データを固定
// 全商品を在庫あり（緑色）に設定
const products: Product[] = (productsData as Product[]).map(
  (product) => ({
    ...product,
    stock: 2,
  })
);

// 団体データを固定
const teams: Team[] = teamsData;

export default function Page() {
  const food = products.filter(
    (product) => product.type === 1
  );

  const goods = products.filter(
    (product) => product.type === 2
  );

  const other = products.filter(
    (product) => product.type === 0
  );

  return (
    <SalesComponent
      food={food}
      goods={goods}
      other={other}
      teams={teams}
    />
  );
}