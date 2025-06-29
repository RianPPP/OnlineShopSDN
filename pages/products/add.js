import Head from 'next/head';
import ProductForm from '../../components/ProductForm';
import Link from 'next/link';

export default function AddProductPage() {
  return (
    <div>
      <Head>
        <title>Add Product</title>
      </Head>

      <ProductForm />
    </div>
  );
}
