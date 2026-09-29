# 🌴 Fat Loss Diet Plan Creator (Kerala Meals Edition)

A clean, modern, and private web app that generates personalized 7-day fat loss diet plans exclusively using authentic, wholesome Kerala meals.

Built to run **100% in your browser** with zero login, zero external API dependencies, and complete privacy.

---

## ✨ Features

- **Personalized Calorie & Macro Target**:
  - Calculates Basal Metabolic Rate (BMR) using the gold-standard **Mifflin-St Jeor** equation.
  - Multiplies by daily activity level to find Total Daily Energy Expenditure (TDEE).
  - Deducts a calibrated calorie deficit based on selected goal speed (Gradual, Steady, or Accelerated).
  - Safeguarded with minimum healthy metabolic floors (1200 kcal for women, 1400 kcal for men).
  - Computes optimal macronutrient distribution (muscle-sparing Protein 25%, complex Carbs 47%, healthy Fats 28%).

- **Hydration & Kerala Herbal Water Science**:
  - Daily water intake tailored to body weight and physical activity level.
  - Includes traditional Kerala digestive infusions:
    - **Jeeraka Vellam (Cumin water)**: Speeds up digestion and relieves bloating.
    - **Pathimugham (Pink herbal water)**: Cooling Ayurvedic water promoting kidney health.
    - **Chukku Vellam (Dry ginger & coriander water)**: Curbs appetite and aids digestion.
    - **Sambharam (Kerala spiced buttermilk)**: Natural probiotic coolant.

- **100% Authentic Kerala Meals Database**:
  - **Breakfasts**: Ragi Puttu with Cherupayar, Idli with Sambar & Chammanthi, Appam with Vegetable Stew, Whole Wheat Idiyappam with Kerala Egg Roast, Oats Uppumavu, Cheera Dosa, Naadan Omelette.
  - **Lunches (The Balanced Kerala Oonu)**: Controlled portion of Kerala Red Matta rice (1 cup), Mathi (sardine) curry in clay pot, Ayala curry with Kudampuli, Cheera thoran, Cabbage thoran, Beans thoran, Aviyal, Cherupayar parippu, Kovakkai thoran, Moru curry, Rasam, and flame-roasted pappadam.
  - **Evening Snacks**: Kerala Sambharam, Boiled Cherupayar with black pepper, roasted Kadala (chana) with Sulaimani black tea, steamed Nendran banana, tender coconut water (Elaneer).
  - **Dinners (Light & Sleep-Promoting)**: Red Matta broken rice kanji with cherupayar & kanthari chammanthi, Steel-cut oats kanji with fish curry, Whole wheat chapathi with vegetable stew or chicken kurma, Pan-grilled meen with sautéed spinach, Naadan pepper chicken soup.

- **4 Food Preferences Supported**:
  - 🍗 **Kerala Non-Veg**: Fish curry, Naadan chicken, eggs, thoran, and matta rice.
  - 🐟 **Kerala Pescatarian**: Traditional fish curries (Mathi, Ayala), eggs, and vegetables.
  - 🥚 **Kerala Eggetarian**: Egg roasts, omelettes, lentils, and vegetable thorans.
  - 🥗 **Kerala Pure Veg**: Cherupayar, Kadala, Aviyal, Thoran, Sambar, and Moru.

- **Interactive Experience & Exporting**:
  - 🔄 **Regenerate Again**: Generates a completely new 7-day variation in one click.
  - ✏️ **Edit Details**: Tweak weight, age, or speed at any time.
  - 🖨️ **Print & PDF Export**: Optimized print stylesheet for clean, paper-friendly or PDF copies.
  - 📋 **Copy to Clipboard**: One-click summary formatted for WhatsApp or notes.
  - 📅 **Dual View**: Tabbed day-by-day navigation or Full 7-Day view.

---

## 🚀 How to Run

Because this app uses zero external frameworks or backend services, you can run it in seconds:

### Option 1: Direct Browser Open (Simplest)
Double-click `index.html` in your file explorer, or drag and drop it into Chrome, Edge, Safari, or Firefox.

### Option 2: Local HTTP Server (Python)
```bash
python -m http.server 3000
```
Then visit `http://localhost:3000` in your web browser.

### Option 3: Node.js (Optional)
```bash
npx serve .
```

---

## 📁 File Structure

```
cool-chandrasekhar/
├── index.html           # Main HTML structure with semantic UI & SVG icons
├── css/
│   └── styles.css       # Clean, modern design system, responsive styles & print CSS
├── js/
│   ├── kerala_data.js   # Kerala meal database with macros, portioning & cooking tips
│   ├── calculator.js    # BMR, TDEE, deficit, macros, and water calculation engine
│   ├── generator.js     # 7-day meal plan generator with intelligent variety
│   └── app.js           # UI controller, event handlers, regeneration & exports
└── README.md            # Documentation
```

---

## 🌿 Kerala Cooking Rules for Fat Loss

1. **The Manchatti (Clay Pot) Technique**: Cook fish and curries in clay pots with *Kudampuli* (Malabar tamarind). It provides deep naadan flavor without needing thick coconut paste.
2. **Coconut Moderation**: Limit grated coconut to 1-2 tbsp per family dish of thoran.
3. **The 50-25-25 Plate Rule**: Fill 50% of your plate with vegetable Thoran or Aviyal, 25% with protein (Mathi/Ayala/Chicken/Egg/Parippu), and 25% with cooked Kerala Red Matta rice (1 cup).
4. **Flame-Roasted Pappadam**: Roast pappadam directly over an open flame with tongs instead of deep-frying in oil to save over 100 calories per papad.
