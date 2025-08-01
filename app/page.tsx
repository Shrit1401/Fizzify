"use client";

import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useCart } from "@/lib/cart-context";
import { Toast } from "@/components/ui/toast";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
  });
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const { addItem, state } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        imageUrl: formData.imageUrl || "",
      };

      await addDoc(collection(db, "products"), productData);
      setFormData({ name: "", description: "", price: "", imageUrl: "" });
      setShowAddForm(false);
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      const productRef = doc(db, "products", editingProduct.id);
      await updateDoc(productRef, {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        imageUrl: formData.imageUrl || "",
      });

      setFormData({ name: "", description: "", price: "", imageUrl: "" });
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteDoc(doc(db, "products", productId));
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const startEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      imageUrl: product.imageUrl || "",
    });
  };

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });
    setToastMessage(
      `${product.name} added to cart! Click "Go to Checkout" to complete your order.`
    );
    setShowToast(true);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-lg">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-16">
        {state.items.length > 0 && (
          <div className="mb-6 flex justify-center">
            <Link href="/checkout">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
                Go to Checkout ({state.totalItems} items - ₹
                {state.totalPrice.toFixed(2)})
              </Button>
            </Link>
          </div>
        )}

        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Chilled Cold Drinks In Your Room
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We Are Delivering Cold Drink To Your Hostel Rooms (Only For Manipal
            Blr )
          </p>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Sealed Drinks are allowed. We Bring Sealed Drinks.
          </p>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            For Now Boys Hostel only.
          </p>
        </div>

        <div className="mb-12">
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search drinks..."
                className="pl-10 border-gray-200 focus:border-gray-900 focus:ring-gray-900"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button className="bg-black hover:bg-gray-800 text-white px-6">
              Search
            </Button>
          </div>
        </div>

        {(showAddForm || editingProduct) && (
          <div className="mb-8 max-w-md mx-auto">
            <Card className="border-2 border-gray-200">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">
                  {editingProduct ? "Edit Product" : "Add New Product"}
                </h3>
                <form
                  onSubmit={
                    editingProduct ? handleUpdateProduct : handleAddProduct
                  }
                  className="space-y-4"
                >
                  <Input
                    placeholder="Product name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                  <Input
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                  />
                  <Input
                    placeholder="Price"
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    required
                  />
                  <Input
                    placeholder="Image URL (optional)"
                    value={formData.imageUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, imageUrl: e.target.value })
                    }
                  />
                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {editingProduct ? "Update" : "Add"} Product
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingProduct(null);
                        setFormData({
                          name: "",
                          description: "",
                          price: "",
                          imageUrl: "",
                        });
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="border-0 shadow-sm hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="w-full h-48 bg-gray-50 rounded-lg mb-4 flex items-center justify-center">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="text-gray-400 text-sm">Product Image</div>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-medium text-gray-900">
                    {product.name}
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-medium text-gray-900">
                        ₹{product.price}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      className="border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No drinks found matching "{searchQuery}"
            </p>
          </div>
        )}

        {filteredProducts.length === 0 && !searchQuery && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No products available. Add your first product!
            </p>
          </div>
        )}
      </main>

      {state.items.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          <Link href="/checkout">
            <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 shadow-lg rounded-full">
              Checkout ({state.totalItems})
            </Button>
          </Link>
        </div>
      )}

      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}
