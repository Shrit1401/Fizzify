import React from "react";
import { ProductForm } from "@/components/product-form";

const AdminPages = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your products and store</p>
        </div>

        <div className="grid gap-8">
          <ProductForm />
        </div>
      </div>
    </div>
  );
};

export default AdminPages;
