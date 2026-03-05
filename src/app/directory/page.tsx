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
    <main className="lux-container py-10">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="lux-kicker">Fragrance Directory</p>
          <h1 className="mt-1 font-serif text-3xl text-zinc-100 sm:text-4xl">
            Oud catalog ({filtered.length})
          </h1>
        </div>
      </div>

      <form className="lux-panel mb-8 grid gap-3 p-4 sm:grid-cols-[2fr_1fr_auto]">
        <input
          type="text"
          name="q"
          defaultValue={params.q ?? ""}
          placeholder="Search by name, brand, note..."
          className="rounded-xl border border-[color:var(--line)] bg-black/40 px-4 py-2.5 text-sm text-zinc-100 outline-none ring-[color:var(--gold)] transition focus:ring-2"
        />
        <select
          name="brand"
          defaultValue={brand}
          className="rounded-xl border border-[color:var(--line)] bg-black/40 px-4 py-2.5 text-sm text-zinc-100 outline-none ring-[color:var(--gold)] transition focus:ring-2"
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
          className="rounded-xl bg-[color:var(--gold)] px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-[color:var(--gold-soft)]"
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
