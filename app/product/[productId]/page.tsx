import Container from "@/components/Container";
import ProductDetails from "@/components/ProductDetails";
import ListRating from "@/components/rating/ListRating";
import { product } from "@/utils/product";

type ProductParams = {
  productId: string;
};

const Product = ({ params }: { params: ProductParams }) => {
  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product} />
        <div className="flex flex-col mt-20 gap-4">
          <div>Add Rating</div>
          <ListRating product={product} />
        </div>
      </Container>
    </div>
  );
};

export default Product;
