"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Link from "next/link";
import ProductCard from "@/components/Productcard/Productcard";
import { useMemo, useCallback, useLayoutEffect } from "react";
import { useProducts } from "@/Hooks/useProducts";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Loading from "../Loading/Loading";

export default function ProductSlider({ category }) {
  const { data, isLoading } = useProducts(category, "", "", 1);

  const [sliderRef, instanceRef] = useKeenSlider(
    useMemo(
      () => ({
        loop: true,
        slides: { perView: 1 },
        breakpoints: {
          "(min-width: 480px)": { slides: { perView: 1.8, spacing: 10 } },
          "(min-width: 640px)": { slides: { perView: 2.4, spacing: 10 } },
          "(min-width: 768px)": { slides: { perView: 3, spacing: 15 } },
          "(min-width: 1024px)": { slides: { perView: 4, spacing: 20 } },
          "(min-width: 1280px)": { slides: { perView: 5, spacing: 20 } },
        },
        renderMode: "performance",
      }),
      []
    )
  );

  const filteredProducts = useMemo(
    () =>
      data?.products?.filter((product) => product.category === category) || [],
    [data?.products, category]
  );

  const handlePrev = useCallback(() => {
    instanceRef.current?.prev();
  }, []);

  const handleNext = useCallback(() => {
    instanceRef.current?.next();
  }, []);

  useLayoutEffect(() => {
    instanceRef.current?.update();
  }, [filteredProducts]);

  if (isLoading) return <Loading />;

  return filteredProducts.length > 0 ? (
    <div className="relative w-full mx-auto px-4 my-24">
      <div className="overflow-hidden rounded-3xl bg-gradient-to-l from-transparent via-custom-yellow-4/10 to-custom-yellow-4/80 flex my-4 items-center justify-between px-4 py-4">
        <p className="text-3xl text-white font-bolder">{category}</p>
        <Link href="/shop">
          <button className="bg-gradient-to-r from-custom-yellow-4 to-custom-yellow-4/40 rounded-l-2xl text-white py-2 px-12 hover:opacity-80">
            Shop All
          </button>
        </Link>
      </div>

      <div ref={sliderRef} className="keen-slider">
        {filteredProducts.slice(0, 20).map((product) => (
          <div
            key={product._id}
            className="keen-slider__slide gap-12 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-2"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <button
        className="cat-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-gray-600/60 rounded-full transition-all hover:bg-gray-600 hover:scale-110"
        onClick={handlePrev}
      >
        <ChevronLeft size={32} color="#d4b257" />
      </button>

      <button
        className="cat-next absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-gray-600/60 rounded-full transition-all hover:bg-gray-600 hover:scale-110"
        onClick={handleNext}
      >
        <ChevronRight size={32} color="#d4b257" />
      </button>
    </div>
  ) : null;
}
