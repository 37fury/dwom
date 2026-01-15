import ProductForm from './ProductForm';

export default function NewProductPage() {
    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>Create New Product</h1>
            <ProductForm />
        </div>
    );
}
