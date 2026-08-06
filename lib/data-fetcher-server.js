import { adminDb } from "./firebase-admin";
import { cache } from "react";

// Global server memory cache
let cachedCatalog = null;
let cachedCatalogTimestamp = 0;

const CACHE_TTL = 3600 * 1000; // 1 hour

const makeSlug = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

async function fetchFullCatalogRaw() {
  const allProducts = [];

  // Categories
  const categorySnap = await adminDb
    .collection("websites")
    .doc("globalbiomedicalorg")
    .collection("pages")
    .doc("categoryproducts")
    .collection("categories")
    .get();

  for (const categoryDoc of categorySnap.docs) {
    const data = categoryDoc.data();
    const categoryName = data.category || categoryDoc.id;

    // Subcategories
    const subSnap = await categoryDoc.ref
      .collection("subcategories")
      .get();

    subSnap.forEach((subDoc) => {
      const subData = subDoc.data();
      const subCategoryName = subData.subCategory || subDoc.id;

      (subData.products || [])
        .filter((p) => p.isPublished !== false)
        .forEach((item, index) => {
          allProducts.push({
            ...item,
            uid: `${categoryDoc.id}-${subDoc.id}-${index}`,
            category: categoryName,
            subCategory: subCategoryName,
            slug: item.slug || makeSlug(item.title),
          });
        });
    });

    // Direct category products
    if (data.products?.length) {
      data.products
        .filter((p) => p.isPublished !== false)
        .forEach((item, index) => {
          allProducts.push({
            ...item,
            uid: `${categoryDoc.id}-direct-${index}`,
            category: categoryName,
            subCategory: item.subCategory || categoryName,
            slug: item.slug || makeSlug(item.title),
          });
        });
    }
  }

  // Legacy Products
  const oldDoc = await adminDb
    .collection("websites")
    .doc("globalbiomedicalorg")
    .collection("pages")
    .doc("products")
    .get();

  if (oldDoc.exists) {
    const oldProducts = oldDoc.data().products || [];

    oldProducts
      .filter((p) => p.isPublished !== false)
      .forEach((item, index) => {
        allProducts.push({
          ...item,
          uid: `legacy-${index}`,
          category: "Other Products",
          subCategory: item.subCategory || "Other Products",
          slug: item.slug || makeSlug(item.title),
        });
      });
  }

  return allProducts;
}

async function getCachedCatalog() {
  const now = Date.now();

  if (
    cachedCatalog &&
    now - cachedCatalogTimestamp < CACHE_TTL
  ) {
    console.log(
      `[data-fetcher-server] Serving catalog from server memory cache (${(
        (now - cachedCatalogTimestamp) /
        1000
      ).toFixed(1)}s old)`
    );

    return cachedCatalog;
  }

  console.log(
    "[data-fetcher-server] Server memory cache miss. Fetching catalog from Firestore..."
  );

  cachedCatalog = await fetchFullCatalogRaw();
  cachedCatalogTimestamp = now;

  return cachedCatalog;
}

export const fetchFullCatalog = cache(async () => {
  const start = Date.now();

  const products = await getCachedCatalog();

  console.log(
    `[data-fetcher-server] fetchFullCatalog took ${Date.now() - start}ms`
  );

  return products;
});