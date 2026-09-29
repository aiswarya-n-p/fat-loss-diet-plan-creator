/**
 * Kerala Authentic Meal Database for Fat Loss
 * Tailored for calorie density, macronutrient balance, and authentic Kerala taste.
 */

const KERALA_HERBAL_WATERS = [
  {
    name: "Jeeraka Vellam (Cumin Water)",
    desc: "Lightly boiled water with roasted cumin seeds. Excellent for speeding digestion, soothing bloating, and metabolism boost.",
    prep: "Boil 1 liter of water with 1 tsp cumin seeds for 3 mins. Drink warm throughout the day."
  },
  {
    name: "Pathimugham (Pink Herbal Water)",
    desc: "Traditional Kerala pink drinking water prepared with East Indian Rosewood bark. Cooling, blood-purifying, and helps kidney function.",
    prep: "Add a pinch of pathimugham wood shavings to boiling water. Strain and drink warm or at room temperature."
  },
  {
    name: "Chukku & Malli Vellam (Dry Ginger & Coriander Water)",
    desc: "A warm digestive infusion that curbs untimely hunger pangs and relieves fluid retention.",
    prep: "Lightly crush dry ginger (chukku) and coriander seeds; boil in 1L water for 5 minutes."
  },
  {
    name: "Sambharam (Kerala Spiced Buttermilk)",
    desc: "Churned low-fat curd diluted with water, infused with crushed shallots, ginger, green chillies, curry leaves, and rock salt. Natural probiotic.",
    prep: "Whisk 1/3 cup fresh curd with 1 cup cold water, crushed curry leaves, 1 sliced shallot, and ginger."
  }
];

const KERALA_COOKING_TIPS = [
  {
    title: "The Manchatti (Clay Pot) Technique",
    tip: "Cook fish and curry in traditional earthenware pots (manchatti) with Kudampuli (Malabar tamarind). It imparts deep flavor without requiring heavy oil or coconut milk."
  },
  {
    title: "Smart Coconut Control",
    tip: "Coconut is sacred in Kerala cooking, but 1 tbsp grated coconut has ~35 kcal. Limit coconut to 1-2 tablespoons per thoran for the entire family portion, or use coconut milk sparingly (prefer first thin extract or light curd for Aviyal)."
  },
  {
    title: "Kerala Matta Rice Serving Rule",
    tip: "Red Matta rice has a lower glycemic index and high fiber compared to white rice. Keep portion to 1 cup cooked (approx. 150g) and fill half the plate with vegetable Thoran."
  },
  {
    title: "Roast, Don't Deep Fry Pappadam",
    tip: "Deep-fried pappadam soaks 100-120 kcal of oil. Hold it with tongs and roast directly over a low flame for 10 seconds for crispiness with zero oil!"
  },
  {
    title: "Steaming is King",
    tip: "Puttu, Idli, Appam, and Idiyappam are oil-free steamed breakfasts. Pair them with protein-rich Kadala (black chickpeas) or Cherupayar (green gram) rather than sugary bananas."
  }
];

// Meal options categorized by meal type and dietary preferences:
// 'veg' (pure vegetarian), 'eggetarian' (veg + egg), 'pescatarian' (veg + fish + egg), 'nonveg' (chicken + fish + egg + veg)

const BREAKFAST_ITEMS = [
  {
    id: "b1",
    name: "Ragi Puttu with Cherupayar Curry",
    desc: "Steamed finger millet puttu served with wholesome boiled green gram curry tempered with mustard and curry leaves.",
    portion: "1 cup ragi puttu + 1/2 cup cherupayar curry",
    calories: 320,
    protein: 11,
    carbs: 58,
    fat: 4,
    tags: ["veg", "eggetarian", "pescatarian", "nonveg"],
    highlight: "High fiber, keeps you full till lunch"
  },
  {
    id: "b2",
    name: "Kerala Steamed Idli with Sambar & Tomato Chammanthi",
    desc: "Fluffy steamed fermented rice-urad dal idlis with drumstick & pumpkin sambar and low-coconut tangy tomato chammanthi.",
    portion: "3 standard idlis + 1 cup vegetable sambar + 1 tbsp chammanthi",
    calories: 310,
    protein: 10,
    carbs: 60,
    fat: 3,
    tags: ["veg", "eggetarian", "pescatarian", "nonveg"],
    highlight: "Fermented for gut health, zero added oil"
  },
  {
    id: "b3",
    name: "Appam with Kerala Vegetable Stew",
    desc: "Soft-centered fermented rice appams paired with aromatic vegetable stew made with thin coconut milk, carrots, potatoes, and beans.",
    portion: "2 medium appams + 1 cup light vegetable stew",
    calories: 330,
    protein: 6,
    carbs: 62,
    fat: 6,
    tags: ["veg", "eggetarian", "pescatarian", "nonveg"],
    highlight: "Light on stomach with delicate spices"
  },
  {
    id: "b4",
    name: "Whole Wheat Idiyappam with Kerala Egg Roast",
    desc: "Steamed whole wheat string hoppers served with spicy shallot-tomato boiled egg roast cooked in 1 tsp cold-pressed coconut oil.",
    portion: "3 idiyappams + 1 whole boiled egg with masala gravy",
    calories: 340,
    protein: 14,
    carbs: 52,
    fat: 8,
    tags: ["eggetarian", "pescatarian", "nonveg"],
    highlight: "High protein breakfast to preserve lean muscle"
  },
  {
    id: "b5",
    name: "Oats & Broken Wheat Uppumavu with Boiled Egg",
    desc: "Steel cut oats and broken wheat upma sautéed with mustard seeds, curry leaves, diced carrots, green beans, and ginger.",
    portion: "1.25 cups vegetable upma + 1 hard boiled egg (or 1/2 cup kadala for veg)",
    calories: 325,
    protein: 13,
    carbs: 50,
    fat: 7,
    tags: ["eggetarian", "pescatarian", "nonveg"],
    highlight: "Complex carbs + sustained energy"
  },
  {
    id: "b6",
    name: "Oats Vegetable Uppumavu with Kadala Curry",
    desc: "Vegetable-loaded oats upma served with traditional spiced black chickpea (kadala) curry.",
    portion: "1 cup oats upma + 1/2 cup kadala curry",
    calories: 320,
    protein: 12,
    carbs: 54,
    fat: 5,
    tags: ["veg"],
    highlight: "Plant-based protein + high soluble fiber"
  },
  {
    id: "b7",
    name: "Dosa with Kerala Kadala Curry",
    desc: "Crispy homemade dosa made with urad dal and parboiled rice, paired with high-protein black chickpea curry.",
    portion: "2 small dosas (minimal oil) + 1 cup kadala curry",
    calories: 350,
    protein: 13,
    carbs: 60,
    fat: 6,
    tags: ["veg", "eggetarian", "pescatarian", "nonveg"],
    highlight: "Classic Kerala comfort with low oil"
  },
  {
    id: "b8",
    name: "Kerala Naadan Omelette with Whole Wheat Toast",
    desc: "Fluffy two-egg omelette packed with finely chopped shallots, green chillies, curry leaves, and black pepper, served with toasted whole grain bread.",
    portion: "2-egg omelette + 2 slices whole wheat bread",
    calories: 330,
    protein: 18,
    carbs: 28,
    fat: 14,
    tags: ["eggetarian", "pescatarian", "nonveg"],
    highlight: "High protein, minimal prep time"
  },
  {
    id: "b9",
    name: "Cheera (Red Spinach) Dosa with Muringakka Sambar",
    desc: "Iron-rich fresh cheera puréed into dosa batter, served with drumstick and tomato sambar.",
    portion: "2 cheera dosas + 1 cup sambar",
    calories: 295,
    protein: 9,
    carbs: 54,
    fat: 4,
    tags: ["veg", "eggetarian", "pescatarian", "nonveg"],
    highlight: "Loaded with iron, folate, and micronutrients"
  }
];

const LUNCH_ITEMS = [
  {
    id: "l1",
    name: "Matta Rice Meal with Mathi (Sardine) Curry & Cheera Thoran",
    desc: "Cooked Kerala red matta rice served with omega-3 rich sardine curry (cooked in Manchatti with Kudampuli), stir-fried red spinach thoran, and fresh moru curry.",
    portion: "1 cup cooked Matta rice + 2 pieces Mathi in curry + 1 cup Cheera thoran + 1/2 cup Moru curry",
    calories: 460,
    protein: 26,
    carbs: 62,
    fat: 11,
    tags: ["pescatarian", "nonveg"],
    highlight: "Rich in Omega-3 fatty acids for fat loss & heart health"
  },
  {
    id: "l2",
    name: "Matta Rice with Ayala (Mackerel) Curry & Cabbage Thoran",
    desc: "Steamed matta rice with tangy Ayala meen mulakittathu (no coconut, chili-kokum gravy), crunchy cabbage carrot thoran, and pepper rasam.",
    portion: "1 cup cooked Matta rice + 1 Ayala fish piece with gravy + 1 cup Cabbage thoran + 1/2 cup Rasam",
    calories: 440,
    protein: 25,
    carbs: 60,
    fat: 10,
    tags: ["pescatarian", "nonveg"],
    highlight: "Kudampuli suppresses appetite naturally"
  },
  {
    id: "l3",
    name: "Kerala Naadan Chicken Curry with Matta Rice & Beans Thoran",
    desc: "Lean skinless chicken breast pieces simmered in roasted Kerala spices, shallots, garlic, and tomato, served with French beans thoran and warm jeera water.",
    portion: "1 cup Matta rice + 120g chicken curry + 1 cup Beans thoran + 1/2 cup Moru",
    calories: 470,
    protein: 32,
    carbs: 58,
    fat: 11,
    tags: ["nonveg"],
    highlight: "Lean poultry protein for maximum satiety"
  },
  {
    id: "l4",
    name: "Matta Rice with Cherupayar Parippu, Aviyal & Roasted Pappadam",
    desc: "Kerala red rice paired with yellow mung dal parippu, vegetable-loaded traditional Aviyal (prepared with curd and gentle coconut paste), and flame-roasted pappadam.",
    portion: "1 cup Matta rice + 3/4 cup Parippu curry + 1 cup Aviyal + 1 flame roasted pappadam",
    calories: 430,
    protein: 16,
    carbs: 72,
    fat: 8,
    tags: ["veg", "eggetarian", "pescatarian", "nonveg"],
    highlight: "Wholesome fiber and essential micronutrients"
  },
  {
    id: "l5",
    name: "Matta Rice with Kerala Mutta (Egg) Roast & Kovakkai Thoran",
    desc: "Two boiled eggs roasted with caramelized onions, curry leaves, and pepper, paired with crunchy ivy gourd (kovakkai) thoran and digestive rasam.",
    portion: "1 cup Matta rice + 2 boiled eggs in dry roast + 1 cup Kovakkai thoran + 1 cup Rasam",
    calories: 450,
    protein: 20,
    carbs: 60,
    fat: 13,
    tags: ["eggetarian", "pescatarian", "nonveg"],
    highlight: "Ivy gourd is scientifically proven to assist blood sugar control"
  },
  {
    id: "l6",
    name: "Kerala Vegetarian Oonu: Sambar, Moru Kachiyathu & Kaya Payar Mezhukkupuratti",
    desc: "Hearty vegetarian spread with drumstick & ash gourd sambar, tempered seasoned buttermilk, and raw plantain & long beans sautéed with shallots and black pepper.",
    portion: "1 cup Matta rice + 1 cup Sambar + 1 cup Kaya Payar mezhukkupuratti + 1/2 cup Moru",
    calories: 420,
    protein: 14,
    carbs: 74,
    fat: 6,
    tags: ["veg"],
    highlight: "Gut-friendly, zero animal fat, rich in resistant starch"
  },
  {
    id: "l7",
    name: "Meen Pollichathu Meal with Cauliflower Rice or Matta Rice",
    desc: "Pearl spot (Karimeen) or Tilapia marinated in shallots, ginger, chili, wrapped in banana leaf and pan-grilled with 1 tsp oil, served with 1 cup cucumber tomato salad and small portion matta rice.",
    portion: "1 medium fish fillet in banana leaf + 3/4 cup Matta rice + 1 cup Cheera thoran",
    calories: 430,
    protein: 30,
    carbs: 48,
    fat: 9,
    tags: ["pescatarian", "nonveg"],
    highlight: "Banana leaf infusion retains moisture without excess oil"
  },
  {
    id: "l8",
    name: "Vanpayar (Red Cowpea) Erissery with Matta Rice & Kalan",
    desc: "Slow-cooked red cowpeas and pumpkin erissery lightly tempered with roasted coconut and mustard, served with probiotic yogurt-yam kalan.",
    portion: "1 cup Matta rice + 1 cup Vanpayar erissery + 1/2 cup Kalan",
    calories: 440,
    protein: 17,
    carbs: 76,
    fat: 7,
    tags: ["veg", "eggetarian", "pescatarian", "nonveg"],
    highlight: "Slow-digesting complex carbs for steady energy"
  }
];

const SNACK_ITEMS = [
  {
    id: "s1",
    name: "Kerala Sambharam (Spiced Buttermilk)",
    desc: "Chilled fresh buttermilk blended with crushed green chillies, ginger, shallot, and curry leaves.",
    portion: "1 large glass (300ml)",
    calories: 45,
    protein: 3,
    carbs: 4,
    fat: 1.5,
    tags: ["veg", "eggetarian", "pescatarian", "nonveg"],
    highlight: "Zero sugar, natural coolant and digestion enhancer"
  },
  {
    id: "s2",
    name: "Boiled Cherupayar (Green Gram) with Crushed Pepper",
    desc: "Tender boiled whole green gram tossed with a hint of shallots, curry leaves, and freshly crushed Malabar black pepper.",
    portion: "1/2 cup boiled payar",
    calories: 120,
    protein: 8,
    carbs: 20,
    fat: 1,
    tags: ["veg", "eggetarian", "pescatarian", "nonveg"],
    highlight: "Satisfying crunch & clean protein"
  },
  {
    id: "s3",
    name: "Roasted Kadala (Dry Chana) with Kattan Chaya",
    desc: "Crunchy dry roasted black chickpeas paired with aromatic unsweetened Kerala black tea infused with cardamom.",
    portion: "1/3 cup roasted kadala + 1 cup Sulaimani/Black tea",
    calories: 110,
    protein: 6,
    carbs: 18,
    fat: 2,
    tags: ["veg", "eggetarian", "pescatarian", "nonveg"],
    highlight: "Low glycemic snack to eliminate sweet cravings"
  },
  {
    id: "s4",
    name: "Steamed Nendran Banana Slice & Green Tea",
    desc: "Lightly steamed ripe Kerala plantain (natural sweetness packed with potassium) served with unsweetened green tea.",
    portion: "1/2 piece steamed nendran banana + 1 cup green tea",
    calories: 95,
    protein: 1.5,
    carbs: 23,
    fat: 0.3,
    tags: ["veg", "eggetarian", "pescatarian", "nonveg"],
    highlight: "Prebiotic fiber for healthy gut flora"
  },
  {
    id: "s5",
    name: "Elaneer (Fresh Tender Coconut Water with Flesh)",
    desc: "Natural electrolyte-rich fresh tender coconut water from Kerala coconuts.",
    portion: "1 tender coconut water (approx 250ml)",
    calories: 50,
    protein: 1,
    carbs: 10,
    fat: 0.5,
    tags: ["veg", "eggetarian", "pescatarian", "nonveg"],
    highlight: "Packed with potassium & enzymes"
  },
  {
    id: "s6",
    name: "Chukku Kaapi (Dry Ginger Herbal Coffee) with Boiled Egg White",
    desc: "Traditional brewed black coffee infused with dry ginger, black pepper, and tulsi, paired with 2 boiled egg whites.",
    portion: "1 cup Chukku Kaapi (no sugar) + 2 egg whites",
    calories: 55,
    protein: 8,
    carbs: 3,
    fat: 0.2,
    tags: ["eggetarian", "pescatarian", "nonveg"],
    highlight: "Metabolism booster + pure protein"
  }
];

const DINNER_ITEMS = [
  {
    id: "d1",
    name: "Kerala Red Matta Broken Rice Kanji with Cherupayar & Chammanthi",
    desc: "Warm comforting light matta rice gruel (kanji) served with steamed whole green gram (payar), 1 tsp spicy thenga chammanthi, and lemon pickle.",
    portion: "1.25 cups kanji + 3/4 cup boiled cherupayar + 1 tsp chammanthi",
    calories: 360,
    protein: 14,
    carbs: 65,
    fat: 4,
    tags: ["veg", "eggetarian", "pescatarian", "nonveg"],
    highlight: "Gentle on the digestive system for deep restorative sleep"
  },
  {
    id: "d2",
    name: "Steel-Cut Oats Kanji with Kerala Fish Curry (or Boiled Egg)",
    desc: "Savory oats cooked kanji-style with ginger, green chilli, and shallots, served with 1 piece of tangy Kerala fish curry (or 1 boiled egg for eggetarian).",
    portion: "1 cup oats kanji + 1 piece fish (or 1 boiled egg) with gravy",
    calories: 340,
    protein: 22,
    carbs: 45,
    fat: 7,
    tags: ["pescatarian", "nonveg"],
    highlight: "Beta-glucan soluble fiber helps flush visceral fat"
  },
  {
    id: "d3",
    name: "Whole Wheat Chapathi with Kerala Vegetable Stew",
    desc: "Soft oil-free whole wheat phulkas/chapathis served with wholesome vegetable stew flavored with whole peppercorns and cinnamon.",
    portion: "2 medium chapathis + 1 cup vegetable stew",
    calories: 330,
    protein: 8,
    carbs: 58,
    fat: 6,
    tags: ["veg", "eggetarian", "pescatarian", "nonveg"],
    highlight: "Controlled glycemic impact and easy digestion"
  },
  {
    id: "d4",
    name: "Grilled Fish / Meen Tawa Fry with Sautéed Cheera (Spinach)",
    desc: "Fish fillet (Natholi / Ayala / Tilapia) marinated in Kashmiri chili, turmeric, ginger garlic paste, pan-seared with 1 tsp oil, served on a bed of sautéed spinach & shallots.",
    portion: "150g grilled fish fillet + 1.5 cups sautéed cheera (spinach)",
    calories: 320,
    protein: 30,
    carbs: 12,
    fat: 9,
    tags: ["pescatarian", "nonveg"],
    highlight: "Low-carb, high-protein Kerala dinner ideal for rapid fat loss"
  },
  {
    id: "d5",
    name: "Whole Wheat Chapathi with Kerala Chicken Kurma (Light)",
    desc: "Whole wheat chapathis paired with skinless chicken breast simmered with shallots, fennel, and a light cashew-paste emulsion (no heavy cream).",
    portion: "2 chapathis + 100g chicken kurma",
    calories: 370,
    protein: 26,
    carbs: 46,
    fat: 9,
    tags: ["nonveg"],
    highlight: "High satiety score stops late-night refrigerator visits"
  },
  {
    id: "d6",
    name: "Whole Wheat Chapathi with Kerala Soya Chunk Theeyal",
    desc: "Phulkas served with protein-rich soya chunks simmered in dark roasted coriander and shallot theeyal gravy.",
    portion: "2 chapathis + 1 cup soya chunk theeyal",
    calories: 340,
    protein: 20,
    carbs: 52,
    fat: 5,
    tags: ["veg", "eggetarian", "pescatarian", "nonveg"],
    highlight: "Exceptional plant protein equivalent to lean meat"
  },
  {
    id: "d7",
    name: "Kerala Naadan Pepper Chicken Soup with 1 Chapathi",
    desc: "Aromatic clear soup made with shredded chicken, crushed Malabar black pepper, ginger, shallots, garlic, and coriander leaves, served with 1 chapathi.",
    portion: "1.5 cups pepper chicken soup + 1 whole wheat chapathi",
    calories: 310,
    protein: 24,
    carbs: 30,
    fat: 6,
    tags: ["nonveg"],
    highlight: "Piperine in Malabar pepper boosts thermogenesis"
  },
  {
    id: "d8",
    name: "Ragi Dosa with Kadala Curry or Egg Roast",
    desc: "Thin crispy ragi (finger millet) crepes served with Kerala spiced black chickpeas.",
    portion: "2 ragi dosas + 3/4 cup kadala curry (or 1 egg roast)",
    calories: 340,
    protein: 12,
    carbs: 56,
    fat: 6,
    tags: ["veg", "eggetarian", "pescatarian", "nonveg"],
    highlight: "Ragi contains amino acid tryptophan which aids sleep"
  }
];

const KERALA_GROCERY_MASTER = [
  {
    category: "Whole Grains & Millets (ധാന്യങ്ങൾ)",
    icon: "🌾",
    items: [
      { name: "Kerala Red Matta Rice (കുത്തരി)", qty: "1 kg", note: "High fiber, lower glycemic index than white rice", tags: ["veg", "eggetarian", "pescatarian", "nonveg"] },
      { name: "Ragi Flour (പഞ്ഞപ്പുല്ല് / കൂവരക്)", qty: "500 g", note: "For fiber-rich Ragi puttu or Ragi dosas", tags: ["veg", "eggetarian", "pescatarian", "nonveg"] },
      { name: "Whole Wheat Atta / Flakes", qty: "1 kg", note: "For oil-free chapathis or wheat idiyappam", tags: ["veg", "eggetarian", "pescatarian", "nonveg"] },
      { name: "Steel-Cut Oats", qty: "500 g", note: "For savory Kerala oats kanji or vegetable upma", tags: ["veg", "eggetarian", "pescatarian", "nonveg"] },
      { name: "Idli / Dosa Rice & Urad Dal Batter", qty: "1 kg", note: "Naturally fermented for gut microbiome health", tags: ["veg", "eggetarian", "pescatarian", "nonveg"] }
    ]
  },
  {
    category: "Proteins & Legumes (പ്രോട്ടീൻ & പയർ)",
    icon: "💪",
    items: [
      { name: "Cherupayar (Whole Green Gram)", qty: "500 g", note: "High protein, core staple for kanji, thoran & snacks", tags: ["veg", "eggetarian", "pescatarian", "nonveg"] },
      { name: "Kadala (Black Chickpeas)", qty: "500 g", note: "High fiber legume for breakfast curry or ragi puttu", tags: ["veg", "eggetarian", "pescatarian", "nonveg"] },
      { name: "Yellow Mung Dal (ചെറുപയർ പരിപ്പ്)", qty: "250 g", note: "For light Kerala parippu curry", tags: ["veg", "eggetarian", "pescatarian", "nonveg"] },
      { name: "Vanpayar (Red Cowpeas)", qty: "250 g", note: "Slow-digesting complex carbs for erissery", tags: ["veg", "eggetarian", "pescatarian", "nonveg"] },
      { name: "Soya Chunks (Mealmaker)", qty: "200 g", note: "High plant protein equivalent to lean meat", tags: ["veg", "eggetarian", "pescatarian", "nonveg"] },
      { name: "Farm Fresh Eggs", qty: "1 to 2 dozen", note: "For boiled eggs, egg roast, and naadan omelettes", tags: ["eggetarian", "pescatarian", "nonveg"] },
      { name: "Mathi (Sardines) or Ayala (Mackerel)", qty: "750 g - 1 kg", note: "Fresh coastal fish rich in fat-burning Omega-3s", tags: ["pescatarian", "nonveg"] },
      { name: "Lean Skinless Chicken Breast", qty: "500 g", note: "For naadan pepper chicken curry or pepper soup", tags: ["nonveg"] }
    ]
  },
  {
    category: "Fresh Vegetables & Greens (പച്ചക്കറികൾ)",
    icon: "🥬",
    items: [
      { name: "Cheera (Red / Green Amaranth Leaves)", qty: "2 fresh bunches", note: "Iron-rich superfood for daily cheera thoran", tags: ["veg", "eggetarian", "pescatarian", "nonveg"] },
      { name: "Cabbage & French Beans", qty: "500 g each", note: "Low-calorie volume vegetables for filling half your plate", tags: ["veg", "eggetarian", "pescatarian", "nonveg"] },
      { name: "Carrots & Ivy Gourd (Kovakkai)", qty: "500 g each", note: "Ivy gourd is proven to aid blood-sugar balance", tags: ["veg", "eggetarian", "pescatarian", "nonveg"] },
      { name: "Drumsticks (Muringakka) & Ash Gourd", qty: "3 pieces / 500 g", note: "Essential for sambar and aviyal", tags: ["veg", "eggetarian", "pescatarian", "nonveg"] },
      { name: "Kunjulli (Small Shallots)", qty: "500 g", note: "Naadan cooking heart; lower pungency and antioxidant rich", tags: ["veg", "eggetarian", "pescatarian", "nonveg"] },
      { name: "Garlic, Ginger & Green Chillies", qty: "250 g each", note: "Thermogenic metabolic boosters", tags: ["veg", "eggetarian", "pescatarian", "nonveg"] },
      { name: "Fresh Curry Leaves (കറിവേപ്പില)", qty: "2 large bunches", note: "Rich in carbazole alkaloids that regulate lipids", tags: ["veg", "eggetarian", "pescatarian", "nonveg"] },
      { name: "Country Tomatoes & Lemons", qty: "1 kg tomatoes / 4 lemons", note: "For digestive rasam, chammanthi & lemon water", tags: ["veg", "eggetarian", "pescatarian", "nonveg"] }
    ]
  },
  {
    category: "Herbal Hydration & Spices (ഔഷധ കൂട്ടുകൾ)",
    icon: "💧",
    items: [
      { name: "Jeerakam (Cumin Seeds)", qty: "100 g", note: "For daily warm Jeeraka Vellam (improves gut motility)", tags: ["veg", "eggetarian", "pescatarian", "nonveg"] },
      { name: "Pathimugham Wood Shavings", qty: "1 small pack (50 g)", note: "Traditional Ayurvedic pink water for renal hydration", tags: ["veg", "eggetarian", "pescatarian", "nonveg"] },
      { name: "Kudampuli (Malabar Tamarind)", qty: "100 g", note: "Natural hydroxycitric acid (HCA) source; supports fat loss", tags: ["veg", "eggetarian", "pescatarian", "nonveg"] },
      { name: "Malabar Whole Black Peppercorns", qty: "100 g", note: "Piperine boosts nutrient absorption and thermogenesis", tags: ["veg", "eggetarian", "pescatarian", "nonveg"] },
      { name: "Chukku (Dry Ginger) & Uluva (Fenugreek)", qty: "50 g each", note: "For morning digestive waters and insulin sensitivity", tags: ["veg", "eggetarian", "pescatarian", "nonveg"] }
    ]
  },
  {
    category: "Dairy & Healthy Cooking (ആരോഗ്യ പാചകം)",
    icon: "🥥",
    items: [
      { name: "Fresh Curd / Low-fat Yogurt", qty: "1 kg", note: "For probiotic Sambharam (spiced buttermilk) & Moru", tags: ["veg", "eggetarian", "pescatarian", "nonveg"] },
      { name: "Cold-Pressed Pure Coconut Oil", qty: "200 ml bottle", note: "Use strictly 1 to 2 tsp measured with a spoon", tags: ["veg", "eggetarian", "pescatarian", "nonveg"] },
      { name: "Fresh Coconut", qty: "1 whole", note: "Portion carefully (max 1-2 tbsp grated per dish)", tags: ["veg", "eggetarian", "pescatarian", "nonveg"] },
      { name: "Kerala Pappadam", qty: "1 pack", note: "Flame-roast over fire with tongs (0 oil, saves 100 kcal)", tags: ["veg", "eggetarian", "pescatarian", "nonveg"] }
    ]
  },
  {
    category: "Snacks & Teas (ലഘുഭക്ഷണങ്ങൾ)",
    icon: "🍵",
    items: [
      { name: "Roasted Kadala (Dry Chana)", qty: "250 g", note: "Crunchy low glycemic snack to kill evening hunger", tags: ["veg", "eggetarian", "pescatarian", "nonveg"] },
      { name: "Tender Coconuts (Elaneer)", qty: "2 to 3 fresh", note: "Natural electrolyte-rich mid-morning refresher", tags: ["veg", "eggetarian", "pescatarian", "nonveg"] },
      { name: "Kerala Black Tea or Green Tea", qty: "1 pack", note: "For warm Sulaimani or Kattan chaya without sugar", tags: ["veg", "eggetarian", "pescatarian", "nonveg"] }
    ]
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    KERALA_HERBAL_WATERS,
    KERALA_COOKING_TIPS,
    BREAKFAST_ITEMS,
    LUNCH_ITEMS,
    SNACK_ITEMS,
    DINNER_ITEMS,
    KERALA_GROCERY_MASTER
  };
}
