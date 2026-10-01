// Replace emoji with real photos by adding an `image` URL and using it in App.jsx
export const categories = ["All", "Hygiene Soaps", "Authentic Achar", "Premium Sweets"];
const p = (id, name, category, price, unit, icon, tint, desc) => ({ id, name, category, price, unit, icon, tint, desc });
export const products = [
  p(1, "Neem Antibacterial Soap", "Hygiene Soaps", 60, "100 g", "🧼", "#dff1e6", "Neem-enriched bar that cleans gently and protects against everyday germs."),
  p(2, "Aloe Vera Moisturising Soap", "Hygiene Soaps", 70, "100 g", "🧼", "#e4f4dc", "Soothing aloe bar that keeps skin soft after every wash."),
  p(3, "Sandalwood Soap", "Hygiene Soaps", 85, "100 g", "🧼", "#f3e8d6", "Classic sandalwood fragrance with a rich, creamy lather."),
  p(4, "Lemon Fresh Soap", "Hygiene Soaps", 55, "100 g", "🧼", "#fbf3c8", "Bright citrus bar that leaves hands fresh and clean."),
  p(5, "Turmeric Glow Soap", "Hygiene Soaps", 90, "100 g", "🧼", "#fbe7b5", "Traditional turmeric blend for clear, healthy-looking skin."),
  p(6, "Family Pack Soap (4 bars)", "Hygiene Soaps", 220, "4 × 100 g", "📦", "#dbeaf4", "Value pack of our best-selling antibacterial soap."),
  p(7, "Mango Achar", "Authentic Achar", 220, "400 g", "🥭", "#fde4b8", "Sun-cured raw mango in mustard oil and house spice mix."),
  p(8, "Mixed Vegetable Achar", "Authentic Achar", 200, "400 g", "🥕", "#fbd9c4", "Seasonal vegetables pickled the traditional Mithila way."),
  p(9, "Lemon Achar", "Authentic Achar", 190, "400 g", "🍋", "#fbf0b5", "Tangy, slow-matured lemon pickle with a gentle heat."),
  p(10, "Garlic Achar", "Authentic Achar", 260, "300 g", "🧄", "#efe9df", "Whole garlic cloves in a robust, aromatic masala."),
  p(11, "Chilli Achar", "Authentic Achar", 210, "300 g", "🌶️", "#f8cfc9", "Bold and fiery. Made from fresh local chillies."),
  p(12, "Tomato Achar", "Authentic Achar", 230, "350 g", "🍅", "#f9d5cf", "Roasted tomato relish with sesame and fenugreek."),
  p(13, "Lalmohan", "Premium Sweets", 450, "500 g", "🍯", "#f6dcc0", "Soft, syrup-soaked sweet from Janakpur's mithai tradition."),
  p(14, "Peda", "Premium Sweets", 600, "500 g", "🍮", "#f3e5cf", "Milk peda with cardamom, made fresh in small batches."),
  p(15, "Barfi Assorted Box", "Premium Sweets", 750, "500 g", "🎁", "#f4dfe6", "A gift box of milk, coconut and pistachio barfi."),
  p(16, "Laddu", "Premium Sweets", 520, "500 g", "🟠", "#fbe0a8", "Motichoor laddu, finished with ghee and dry fruits."),
  p(17, "Kheer Mohan", "Premium Sweets", 480, "500 g", "🥛", "#f2ecdf", "Soft chhena sweet in a light, creamy syrup."),
  p(18, "Festive Sweet Hamper", "Premium Sweets", 1500, "1 kg", "🎀", "#e6dcf2", "A celebration hamper of our most loved sweets."),
];
