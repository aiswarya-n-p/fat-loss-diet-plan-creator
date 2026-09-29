/**
 * 7-Day Kerala Fat Loss Meal Plan Generator
 * Matches dietary preferences, ensures authentic variety, and balances nutrition.
 */

const MealPlanGenerator = {
  DAY_NAMES: [
    "Day 1 (Monday)",
    "Day 2 (Tuesday)",
    "Day 3 (Wednesday)",
    "Day 4 (Thursday)",
    "Day 5 (Friday)",
    "Day 6 (Saturday)",
    "Day 7 (Sunday)"
  ],

  EARLY_MORNING_ROUTINES: [
    {
      title: "Warm Jeeraka Vellam",
      desc: "1 glass warm cumin-infused water + 4 soaked almonds.",
      calories: 30,
      benefit: "Jumpstarts digestion and relieves bloating"
    },
    {
      title: "Pathimugham Herbal Water",
      desc: "1 glass warm pink herbal water with a squeeze of fresh lemon.",
      calories: 8,
      benefit: "Ayurvedic detox and kidney hydration"
    },
    {
      title: "Warm Fenugreek (Uluva) Water",
      desc: "1 glass water soaked overnight with 1/2 tsp fenugreek seeds.",
      calories: 12,
      benefit: "Helps stabilize morning insulin and blood sugar"
    },
    {
      title: "Chukku & Tulsi Water",
      desc: "1 glass warm water infused with crushed dry ginger and holy basil.",
      calories: 5,
      benefit: "Anti-inflammatory and mucosal cleanser"
    }
  ],

  filterByPreference(items, preference) {
    return items.filter(item => item.tags && item.tags.includes(preference));
  },

  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  },

  getVariedSequence(items, count = 7) {
    if (!items || items.length === 0) return [];
    let pool = this.shuffleArray(items);
    const result = [];
    while (result.length < count) {
      if (pool.length === 0) {
        pool = this.shuffleArray(items);
        // Avoid repeating the exact last item immediately
        if (pool[0].id === result[result.length - 1]?.id && pool.length > 1) {
          const temp = pool[0];
          pool[0] = pool[1];
          pool[1] = temp;
        }
      }
      result.push(pool.shift());
    }
    return result;
  },

  generate7DayPlan(metrics) {
    const { foodPreference, targetCalories } = metrics;

    const dataModule = (typeof module !== "undefined" && typeof require !== "undefined") ? require("./kerala_data.js") : {};
    const bItems = typeof BREAKFAST_ITEMS !== "undefined" ? BREAKFAST_ITEMS : dataModule.BREAKFAST_ITEMS;
    const lItems = typeof LUNCH_ITEMS !== "undefined" ? LUNCH_ITEMS : dataModule.LUNCH_ITEMS;
    const sItems = typeof SNACK_ITEMS !== "undefined" ? SNACK_ITEMS : dataModule.SNACK_ITEMS;
    const dItems = typeof DINNER_ITEMS !== "undefined" ? DINNER_ITEMS : dataModule.DINNER_ITEMS;
    const hWaters = typeof KERALA_HERBAL_WATERS !== "undefined" ? KERALA_HERBAL_WATERS : dataModule.KERALA_HERBAL_WATERS;
    const cTips = typeof KERALA_COOKING_TIPS !== "undefined" ? KERALA_COOKING_TIPS : dataModule.KERALA_COOKING_TIPS;
    const gMaster = typeof KERALA_GROCERY_MASTER !== "undefined" ? KERALA_GROCERY_MASTER : dataModule.KERALA_GROCERY_MASTER;

    const groceryList = (gMaster || []).map(cat => ({
      category: cat.category,
      icon: cat.icon,
      items: cat.items.filter(item => item.tags && item.tags.includes(foodPreference))
    })).filter(cat => cat.items.length > 0);

    const eligibleBreakfasts = this.filterByPreference(bItems, foodPreference);
    const eligibleLunches = this.filterByPreference(lItems, foodPreference);
    const eligibleSnacks = this.filterByPreference(sItems, foodPreference);
    const eligibleDinners = this.filterByPreference(dItems, foodPreference);

    // Fallbacks if user preference is overly strict
    const bSeq = this.getVariedSequence(eligibleBreakfasts.length > 0 ? eligibleBreakfasts : bItems, 7);
    const lSeq = this.getVariedSequence(eligibleLunches.length > 0 ? eligibleLunches : lItems, 7);
    const sSeq = this.getVariedSequence(eligibleSnacks.length > 0 ? eligibleSnacks : sItems, 7);
    const dSeq = this.getVariedSequence(eligibleDinners.length > 0 ? eligibleDinners : dItems, 7);

    const days = [];

    for (let i = 0; i < 7; i++) {
      const earlyMorning = this.EARLY_MORNING_ROUTINES[i % this.EARLY_MORNING_ROUTINES.length];
      const breakfast = bSeq[i];
      const lunch = lSeq[i];
      const snack = sSeq[i];
      const dinner = dSeq[i];

      const dayTotalCalories = earlyMorning.calories + breakfast.calories + lunch.calories + snack.calories + dinner.calories;
      const dayTotalProtein = breakfast.protein + lunch.protein + snack.protein + dinner.protein;
      const dayTotalCarbs = breakfast.carbs + lunch.carbs + snack.carbs + dinner.carbs;
      const dayTotalFat = breakfast.fat + lunch.fat + snack.fat + dinner.fat;

      // Portion adjustment suggestion to align closely with user's target
      const calDiff = targetCalories - dayTotalCalories;
      let portionAdvice = "";
      if (calDiff > 150) {
        portionAdvice = `Tip: Add 1 extra cup of steamed cucumber/carrot salad or 1 glass of Sambharam (spiced buttermilk) to comfortably reach your ${targetCalories} kcal goal.`;
      } else if (calDiff < -150) {
        portionAdvice = `Tip: Reduce matta rice or kanji portion slightly by 2-3 tablespoons to stay within your ${targetCalories} kcal deficit.`;
      } else {
        portionAdvice = `Portions match your ${targetCalories} kcal goal spot-on!`;
      }

      days.push({
        dayNumber: i + 1,
        dayName: this.DAY_NAMES[i],
        earlyMorning,
        breakfast,
        lunch,
        snack,
        dinner,
        totals: {
          calories: dayTotalCalories,
          protein: dayTotalProtein,
          carbs: dayTotalCarbs,
          fat: dayTotalFat
        },
        portionAdvice
      });
    }

    return {
      metrics,
      days,
      herbalWaters: hWaters,
      cookingTips: cTips,
      groceryList,
      generatedAt: new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      })
    };
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = MealPlanGenerator;
}
