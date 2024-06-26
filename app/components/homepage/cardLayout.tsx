"use client";
import React, { useState, useEffect } from "react";
import ItemCard from "../card";
// import fetchApiData from "@/app/lib/fetchData";
import { fetchApiData } from "@/app/lib/fetchData";
import SkeletonCard from "../skeleton";

interface ProductInterface {
  id: string;
  name: string;
  price: string;
  description: string;
  productImageURL: string;
}

export default async function CardLayout() {
  const [products, setProduct] = useState<ProductInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // console.log(response);
      const data: ProductInterface[] = await fetchApiData("product");
      const latestData = data.slice(0, 8);
      // console.log(data);
      setProduct(latestData);
      setLoading(false);
    };
    fetchData();
  }, []);

  // console.log("list of products", products);

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <h1 className="text-2xl font-bold text-teal-900 sm:text-3xl py-2">
        Latest Products
      </h1>
      <div className="gap-3 grid grid-cols-2 sm:grid-cols-4">
        {loading
          ? // Display skeleton cards while loading
            Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : products.map((item, key) => (
              <ItemCard
                key={key}
                id={item.id}
                title={item.name}
                price={item.price}
                description={item.description}
                productImageURL={item.productImageURL}
              />
            ))}
      </div>
    </div>
  );
}
