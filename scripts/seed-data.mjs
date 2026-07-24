export const categories = [
  { name: "Personalized Gifts & Decor", slug: "personalized-gifts-decor", parentService: "laser" },
  { name: "Corporate & Office Items", slug: "corporate-office-items", parentService: "laser" },
  { name: "Everyday & Accessories", slug: "everyday-accessories", parentService: "laser" },
  { name: "Occasion-Based", slug: "occasion-based", parentService: "laser" },
  { name: "Offset Printing", slug: "offset-printing", parentService: "offset" }
];

const img = (index) => [`/uploads/studio-${String(index).padStart(2, "0")}.jpeg`];

export const products = [
  ["personalized-gifts-decor", "Engraved wooden photo frames/plaques", "Custom photo and text engraving on premium wood plaques and frames.", 9],
  ["personalized-gifts-decor", "Wooden wall art with engraved quotes/verses", "Warm wood wall pieces with crisp engraved lettering.", 5],
  ["personalized-gifts-decor", "Engraved Islamic calligraphy panels", "Quranic verses and duas engraved with careful line detail.", 6],
  ["personalized-gifts-decor", "Wooden clocks with engraved designs/text", "Functional wood clocks customized with names, dates, and artwork.", 5],
  ["personalized-gifts-decor", "Wooden coasters", "Single coasters and sets with logos, monograms, and patterns.", 13],
  ["personalized-gifts-decor", "Wooden jewelry/keepsake boxes", "Keepsake boxes finished with engraved lids and personal messages.", 3],
  ["corporate-office-items", "Engraved wooden name plates / desk nameplates", "Executive desk nameplates with sharp engraved typography.", 8],
  ["corporate-office-items", "Wooden trophies & recognition awards", "Custom awards for teams, partners, milestones, and events.", 6],
  ["corporate-office-items", "Wooden pen holders / desk organizers", "Branded desk organizers made for daily office use.", 19],
  ["corporate-office-items", "Wooden business card holders", "Compact card holders engraved with names or company marks.", 16],
  ["corporate-office-items", "Engraved wooden trays", "Presentation trays for hospitality, gifting, and office service.", 14],
  ["everyday-accessories", "Wooden keychains", "Custom names, logos, and shapes for daily-use wood keychains.", 3],
  ["everyday-accessories", "Wooden phone stands", "Engraved phone stands for desks, events, and giveaways.", 2],
  ["everyday-accessories", "Wooden bookmarks", "Slim engraved bookmarks with names, quotes, or brand marks.", 18],
  ["everyday-accessories", "Engraved cutting boards", "Food-safe boards customized for gifts and home kitchens.", 15],
  ["everyday-accessories", "Wooden calendars/desk calendars with engraving", "Desk calendars with branded or personalized engraving.", 11],
  ["occasion-based", "Wedding and anniversary keepsake plaques", "Commemorative plaques for weddings, anniversaries, and families.", 9],
  ["occasion-based", "Custom gift sets", "Bundled engraved wooden items curated for occasions and clients.", 3],
  ["offset-printing", "Business Card", "Premium business cards with multiple finish options and custom die-cut possibilities.", 17, { stock: "300-400gsm art card", finishes: "Matte, gloss, soft-touch finish, spot UV option", sizes: "Standard 90x54mm or custom die-cut", minimumQuantity: "From 100 pcs" }],
  ["offset-printing", "Envelope", "Branded envelopes from single-color runs to full-color corporate stationery.", 1, { stock: "100-120gsm offset paper", finishes: "1-color to full color", sizes: "DL, C5, C4, or custom", minimumQuantity: "From 250 pcs" }],
  ["offset-printing", "Letterhead", "Premium bond letterheads with full-color header/footer branding.", 17, { stock: "100-120gsm premium bond", finishes: "Full-color header/footer branding", sizes: "A4 plus A5 note sheets on request", minimumQuantity: "From 250 sheets" }]
].map(([categorySlug, name, shortDescription, imageIndex, specSheet]) => ({
  categorySlug,
  name,
  slug: String(name).toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
  shortDescription,
  specSheet: specSheet ?? null,
  images: img(imageIndex)
}));
