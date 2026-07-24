export type ParentService = "laser" | "offset";

export type Category = {
  name: string;
  slug: string;
  parentService: ParentService;
};

export type Product = {
  categorySlug: string;
  categoryName: string;
  name: string;
  slug: string;
  shortDescription: string;
  specSheet: Record<string, string> | null;
  images: string[];
};

export const categories: Category[] = [
  { name: "Personalized Gifts & Decor", slug: "personalized-gifts-decor", parentService: "laser" },
  { name: "Corporate & Office Items", slug: "corporate-office-items", parentService: "laser" },
  { name: "Everyday & Accessories", slug: "everyday-accessories", parentService: "laser" },
  { name: "Occasion-Based", slug: "occasion-based", parentService: "laser" },
  { name: "Offset Printing", slug: "offset-printing", parentService: "offset" }
];

const img = (index: number) => [`/uploads/studio-${String(index).padStart(2, "0")}.jpeg`];

const rows: Array<[string, string, string, number, Record<string, string>?]> = [
  ["personalized-gifts-decor", "Engraved wooden photo frames/plaques", "Custom photo and text engraving on premium wood plaques and frames.", 1],
  ["personalized-gifts-decor", "Wooden wall art with engraved quotes/verses", "Warm wood wall pieces with crisp engraved lettering.", 2],
  ["personalized-gifts-decor", "Engraved Islamic calligraphy panels", "Quranic verses and duas engraved with careful line detail.", 3],
  ["personalized-gifts-decor", "Wooden clocks with engraved designs/text", "Functional wood clocks customized with names, dates, and artwork.", 4],
  ["personalized-gifts-decor", "Wooden coasters", "Single coasters and sets with logos, monograms, and patterns.", 5],
  ["personalized-gifts-decor", "Wooden jewelry/keepsake boxes", "Keepsake boxes finished with engraved lids and personal messages.", 6],
  ["corporate-office-items", "Engraved wooden name plates / desk nameplates", "Executive desk nameplates with sharp engraved typography.", 7],
  ["corporate-office-items", "Wooden trophies & recognition awards", "Custom awards for teams, partners, milestones, and events.", 8],
  ["corporate-office-items", "Wooden pen holders / desk organizers", "Branded desk organizers made for daily office use.", 9],
  ["corporate-office-items", "Wooden business card holders", "Compact card holders engraved with names or company marks.", 10],
  ["corporate-office-items", "Engraved wooden trays", "Presentation trays for hospitality, gifting, and office service.", 11],
  ["everyday-accessories", "Wooden keychains", "Custom names, logos, and shapes for daily-use wood keychains.", 12],
  ["everyday-accessories", "Wooden phone stands", "Engraved phone stands for desks, events, and giveaways.", 13],
  ["everyday-accessories", "Wooden bookmarks", "Slim engraved bookmarks with names, quotes, or brand marks.", 14],
  ["everyday-accessories", "Engraved cutting boards", "Food-safe boards customized for gifts and home kitchens.", 15],
  ["everyday-accessories", "Wooden calendars/desk calendars", "Desk calendars with branded or personalized engraving.", 16],
  ["occasion-based", "Wedding and anniversary keepsake plaques", "Commemorative plaques for weddings, anniversaries, and families.", 17],
  ["occasion-based", "Custom gift sets", "Bundled engraved wooden items curated for occasions and clients.", 18],
  ["offset-printing", "Business Card", "Premium business cards with multiple finish options and custom die-cut possibilities.", 19, { stock: "300-400gsm art card", finishes: "Matte, gloss, soft-touch, spot UV option", sizes: "Standard 90x54mm or custom die-cut", minimumQuantity: "From 100 pcs" }],
  ["offset-printing", "Envelope", "Branded envelopes from single-color runs to full-color corporate stationery.", 1, { stock: "100-120gsm offset paper", finishes: "1-color to full color", sizes: "DL, C5, C4, or custom", minimumQuantity: "From 250 pcs" }],
  ["offset-printing", "Letterhead", "Premium bond letterheads with full-color header and footer branding.", 2, { stock: "100-120gsm premium bond", finishes: "Full-color header/footer branding", sizes: "A4 plus A5 note sheets on request", minimumQuantity: "From 250 sheets" }]
];

export const products: Product[] = rows.map(([categorySlug, name, shortDescription, imageIndex, specSheet]) => {
  const category = categories.find((item) => item.slug === categorySlug);

  return {
    categorySlug,
    categoryName: category?.name ?? categorySlug,
    name,
    slug: name.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    shortDescription,
    specSheet: specSheet ?? null,
    images: img(imageIndex)
  };
});

export const serviceOptions = categories.map((category) => category.name);

export function productsByService(service: ParentService) {
  const serviceCategorySlugs = categories.filter((category) => category.parentService === service).map((category) => category.slug);
  return products.filter((product) => serviceCategorySlugs.includes(product.categorySlug));
}

export function productBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
