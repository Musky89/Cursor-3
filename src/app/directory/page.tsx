import { FragranceCard } from "@/components/fragrance-card";
import { oudBrands, oudFragrances } from "@/lib/fragrances";

type Props = {
  searchParams: Promise<{
    q?: string;
    brand?: string;
  }>;
};

export default async function DirectoryPage({ searchParams }: Props) {
  const params = await searchParams;
  const q = (params.q ?? "").trim().toLowerCase();
  const brand = (params.brand ?? "").trim();

  const filtered = oudFragrances.filter((item) => {
    const matchesQuery =
      q.length === 0 ||
      item.name.toLowerCase().includes(q) ||
      item.brand.toLowerCase().includes(q) ||
      item.notes.join(" ").toLowerCase().includes(q);
    const matchesBrand = brand.length === 0 || item.brand === brand;
    return matchesQuery && matchesBrand;
  });

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-amber-300">Fragrance Directory</p>
          <h1 className="mt-1 text-2xl font-semibold text-zinc-100 sm:text-3xl">
            Oud catalog ({filtered.length})
          </h1>
        </div>
      </div>

      <form className="mb-8 grid gap-3 rounded-xl border border-zinc-800 bg-zinc-900/70 p-4 sm:grid-cols-[2fr_1fr_auto]">
        <input
          type="text"
          name="q"
          defaultValue={params.q ?? ""}
          placeholder="Search by name, brand, note..."
          className="rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none ring-amber-300 transition focus:ring-2"
        />
        <select
          name="brand"
          defaultValue={brand}
          className="rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none ring-amber-300 transition focus:ring-2"
        >
          <option value="">All brands</option>
          {oudBrands.map((entry) => (
            <option key={entry} value={entry}>
              {entry}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-md bg-amber-300 px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-amber-200"
        >
          Filter
        </button>
      </form>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((fragrance) => (
          <FragranceCard key={fragrance.slug} fragrance={fragrance} />
        ))}
      </div>
    </main>
  );
}
