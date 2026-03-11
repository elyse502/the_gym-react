function ProductItem({ product }) {
  return (
    <li>
      <p>{product.title}</p>
      <p>{product.price}</p>
    </li>
  );
}

export default ProductItem;
