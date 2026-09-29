/**
 * Main Application Logic for Fat Loss Diet Plan Creator (Kerala Edition)
 * Handles state management, UI rendering, regeneration, printing, and interactions.
 */

document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const dietForm = document.getElementById("diet-form");
  const sampleBtn = document.getElementById("sample-profile-btn");
  const resultsSection = document.getElementById("results-section");
  const inputCard = document.getElementById("input-card");
  const toast = document.getElementById("toast");

  // Action Buttons in Results Banner
  const regenerateBtn = document.getElementById("regenerate-btn");
  const editDetailsBtn = document.getElementById("edit-details-btn");
  const jumpGroceryBtn = document.getElementById("jump-grocery-btn");
  const printPlanBtn = document.getElementById("print-plan-btn");
  const copyPlanBtn = document.getElementById("copy-plan-btn");

  // Grocery List Elements
  const grocerySection = document.getElementById("grocery-section");
  const groceryContainer = document.getElementById("grocery-categories-container");
  const copyGroceryBtn = document.getElementById("copy-grocery-btn");
  const resetGroceryBtn = document.getElementById("reset-grocery-btn");
  const groceryProgressText = document.getElementById("grocery-progress-text");
  const groceryProgressPct = document.getElementById("grocery-progress-pct");
  const groceryProgressFill = document.getElementById("grocery-progress-fill");

  // View Mode Buttons
  const viewTabsBtn = document.getElementById("view-tabs-btn");
  const viewAllBtn = document.getElementById("view-all-btn");

  // State
  let currentMetrics = null;
  let currentPlan = null;
  let activeDayIndex = 0;
  let isAllDaysView = false;
  let checkedGroceryItems = new Set();

  // Icons Helper (SVG Strings for crisp offline rendering)
  const ICONS = {
    sun: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
    coffee: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>`,
    utensils: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2v20M2 2v20M6 2v7a4 4 0 0 0 4 4v9M14 2v7a4 4 0 0 1-4 4"></path></svg>`,
    moon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`,
    droplet: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>`,
    check: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`
  };

  // Toast Helper
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3200);
  }

  // Pre-fill Sample Profile
  sampleBtn.addEventListener("click", () => {
    document.querySelector('input[name="gender"][value="female"]').checked = true;
    document.getElementById("age").value = 29;
    document.getElementById("weight").value = 68;
    document.getElementById("height").value = 162;
    document.querySelector('input[name="activityLevel"][value="light"]').checked = true;
    document.querySelector('input[name="foodPreference"][value="pescatarian"]').checked = true;
    document.querySelector('input[name="goalSpeed"][value="moderate"]').checked = true;

    showToast("Filled with Kerala sample profile (29yo, 68kg, Pescatarian)");
    generatePlan();
  });

  // Handle Form Submission
  dietForm.addEventListener("submit", (e) => {
    e.preventDefault();
    generatePlan();
  });

  function getFormValues() {
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const age = parseInt(document.getElementById("age").value, 10);
    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value);
    const activityLevel = document.querySelector('input[name="activityLevel"]:checked').value;
    const foodPreference = document.querySelector('input[name="foodPreference"]:checked').value;
    const goalSpeed = document.querySelector('input[name="goalSpeed"]:checked').value;

    return { gender, age, weight, height, activityLevel, foodPreference, goalSpeed };
  }

  function generatePlan() {
    const values = getFormValues();

    if (isNaN(values.age) || values.age < 15 || values.age > 100) {
      showToast("Please enter a valid age between 15 and 100.");
      return;
    }
    if (isNaN(values.weight) || values.weight < 35 || values.weight > 250) {
      showToast("Please enter a valid weight between 35kg and 250kg.");
      return;
    }
    if (isNaN(values.height) || values.height < 120 || values.height > 230) {
      showToast("Please enter a valid height between 120cm and 230cm.");
      return;
    }

    currentMetrics = Calculator.computePlanMetrics(values);
    currentPlan = MealPlanGenerator.generate7DayPlan(currentMetrics);

    renderDashboard(currentPlan);

    // Show Results & Smooth Scroll
    resultsSection.style.display = "block";
    resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    showToast("✨ Personalized Kerala Diet Plan Generated!");
  }

  function renderDashboard(plan) {
    const { metrics, days, herbalWaters, cookingTips } = plan;

    // 1. Top Banner Stats
    document.getElementById("stat-target-cal").textContent = `${metrics.targetCalories} kcal`;
    document.getElementById("stat-deficit").textContent = `-${metrics.deficit} kcal deficit (TDEE ${metrics.tdee})`;
    
    document.getElementById("stat-water").textContent = `${metrics.water.liters} L`;
    document.getElementById("stat-glasses").textContent = `~${metrics.water.glasses} glasses/day (inc. ${metrics.water.herbalGlasses} herbal waters)`;

    document.getElementById("stat-speed-label").textContent = metrics.goalDetails.label;
    document.getElementById("stat-weekly-loss").textContent = `Target: ${metrics.goalDetails.weeklyLoss}`;

    document.getElementById("stat-bmi").textContent = `${metrics.bmi} BMI`;
    document.getElementById("stat-bmi-cat").textContent = metrics.bmiCategory;

    // 2. Macronutrient Progress Bars
    const { protein, carbs, fat } = metrics.macros;
    document.getElementById("macro-protein-grams").textContent = `${protein.grams}g (${protein.pct}%)`;
    document.getElementById("bar-protein").style.width = `${protein.pct * 2}%`;

    document.getElementById("macro-carbs-grams").textContent = `${carbs.grams}g (${carbs.pct}%)`;
    document.getElementById("bar-carbs").style.width = `${carbs.pct * 1.5}%`;

    document.getElementById("macro-fat-grams").textContent = `${fat.grams}g (${fat.pct}%)`;
    document.getElementById("bar-fat").style.width = `${fat.pct * 2}%`;

    // 3. Recommended Kerala Herbal Water
    renderHerbalWaterPill(herbalWaters);

    // 4. Render 7-Day Plan Tabs & Meals
    renderDayTabs(days);
    renderMealsView(days);

    // 5. Render 1-Week Kerala Grocery List
    renderGroceryList(plan.groceryList);

    // 6. Render Kerala Cooking Tips
    renderCookingTips(cookingTips);
  }

  function renderHerbalWaterPill(herbalWaters) {
    const container = document.getElementById("herbal-water-suggestion");
    if (!container) return;
    const randomWater = herbalWaters[Math.floor(Math.random() * herbalWaters.length)];
    container.innerHTML = `
      <strong>💧 Kerala Hydration Secret: ${randomWater.name}</strong>
      <span>${randomWater.desc}</span>
      <div style="font-size: 0.775rem; margin-top: 0.35rem; color: #0284c7;"><em>How to make:</em> ${randomWater.prep}</div>
    `;
  }

  function renderDayTabs(days) {
    const tabsContainer = document.getElementById("day-tabs");
    tabsContainer.innerHTML = "";

    days.forEach((day, index) => {
      const btn = document.createElement("button");
      btn.className = `day-tab-btn ${index === activeDayIndex ? "active" : ""}`;
      btn.innerHTML = `<span>Day ${day.dayNumber}</span> <small style="opacity: 0.85;">(${day.dayName.split(" ")[1].replace(/[()]/g, "")})</small>`;
      btn.addEventListener("click", () => {
        activeDayIndex = index;
        isAllDaysView = false;
        updateViewToggles();
        renderDayTabs(days);
        renderMealsView(days);
      });
      tabsContainer.appendChild(btn);
    });
  }

  function renderMealsView(days) {
    const container = document.getElementById("meals-container");
    container.innerHTML = "";

    if (isAllDaysView) {
      // Render All 7 Days
      days.forEach(day => {
        container.appendChild(createDayCardElement(day));
      });
    } else {
      // Render Selected Day Only
      const selectedDay = days[activeDayIndex] || days[0];
      container.appendChild(createDayCardElement(selectedDay));
    }
  }

  function createDayCardElement(day) {
    const card = document.createElement("div");
    card.className = "day-plan-card";

    card.innerHTML = `
      <div class="day-header-summary">
        <div class="day-header-title">${day.dayName}</div>
        <div class="day-totals-badge">
          <span>🔥 ${day.totals.calories} kcal</span>
          <span>💪 ${day.totals.protein}g Protein</span>
          <span>🌾 ${day.totals.carbs}g Carbs</span>
          <span>🥥 ${day.totals.fat}g Fat</span>
        </div>
      </div>

      <div class="meals-grid">
        <!-- Early Morning -->
        <div class="meal-block">
          <div class="meal-type-badge">
            <span class="meal-name-tag">${ICONS.sun} Wake Up</span>
            <span class="meal-time-tag">6:30 AM - 7:00 AM</span>
            <span class="meal-cal-pill">${day.earlyMorning.calories} kcal</span>
          </div>
          <div class="meal-details">
            <div class="meal-recipe-title">${day.earlyMorning.title}</div>
            <div class="meal-description">${day.earlyMorning.desc}</div>
            <div class="meal-footer-meta">
              <span class="meal-highlight-badge">🌿 ${day.earlyMorning.benefit}</span>
            </div>
          </div>
        </div>

        <!-- Breakfast -->
        <div class="meal-block">
          <div class="meal-type-badge">
            <span class="meal-name-tag">${ICONS.coffee} Breakfast</span>
            <span class="meal-time-tag">8:00 AM - 8:45 AM</span>
            <span class="meal-cal-pill">${day.breakfast.calories} kcal</span>
          </div>
          <div class="meal-details">
            <div class="meal-recipe-title">${day.breakfast.name}</div>
            <div class="meal-portion">Serving: ${day.breakfast.portion}</div>
            <div class="meal-description">${day.breakfast.desc}</div>
            <div class="meal-footer-meta">
              <span class="macro-mini-pill"><strong>Protein:</strong> ${day.breakfast.protein}g</span>
              <span class="macro-mini-pill"><strong>Carbs:</strong> ${day.breakfast.carbs}g</span>
              <span class="macro-mini-pill"><strong>Fat:</strong> ${day.breakfast.fat}g</span>
              <span class="meal-highlight-badge">✨ ${day.breakfast.highlight}</span>
            </div>
          </div>
        </div>

        <!-- Lunch (Kerala Traditional Oonu Plate) -->
        <div class="meal-block">
          <div class="meal-type-badge">
            <span class="meal-name-tag">${ICONS.utensils} Kerala Lunch</span>
            <span class="meal-time-tag">12:45 PM - 1:30 PM</span>
            <span class="meal-cal-pill">${day.lunch.calories} kcal</span>
          </div>
          <div class="meal-details">
            <div class="meal-recipe-title">${day.lunch.name}</div>
            <div class="meal-portion">Plate: ${day.lunch.portion}</div>
            <div class="meal-description">${day.lunch.desc}</div>
            <div class="meal-footer-meta">
              <span class="macro-mini-pill"><strong>Protein:</strong> ${day.lunch.protein}g</span>
              <span class="macro-mini-pill"><strong>Carbs:</strong> ${day.lunch.carbs}g</span>
              <span class="macro-mini-pill"><strong>Fat:</strong> ${day.lunch.fat}g</span>
              <span class="meal-highlight-badge">🥥 ${day.lunch.highlight}</span>
            </div>
          </div>
        </div>

        <!-- Evening Snack & Hydration -->
        <div class="meal-block">
          <div class="meal-type-badge">
            <span class="meal-name-tag">${ICONS.sun} Evening Snack</span>
            <span class="meal-time-tag">4:30 PM - 5:00 PM</span>
            <span class="meal-cal-pill">${day.snack.calories} kcal</span>
          </div>
          <div class="meal-details">
            <div class="meal-recipe-title">${day.snack.name}</div>
            <div class="meal-portion">Serving: ${day.snack.portion}</div>
            <div class="meal-description">${day.snack.desc}</div>
            <div class="meal-footer-meta">
              <span class="macro-mini-pill"><strong>Protein:</strong> ${day.snack.protein}g</span>
              <span class="macro-mini-pill"><strong>Carbs:</strong> ${day.snack.carbs}g</span>
              <span class="meal-highlight-badge">🍵 ${day.snack.highlight}</span>
            </div>
          </div>
        </div>

        <!-- Dinner -->
        <div class="meal-block">
          <div class="meal-type-badge">
            <span class="meal-name-tag">${ICONS.moon} Light Dinner</span>
            <span class="meal-time-tag">7:30 PM - 8:15 PM</span>
            <span class="meal-cal-pill">${day.dinner.calories} kcal</span>
          </div>
          <div class="meal-details">
            <div class="meal-recipe-title">${day.dinner.name}</div>
            <div class="meal-portion">Serving: ${day.dinner.portion}</div>
            <div class="meal-description">${day.dinner.desc}</div>
            <div class="meal-footer-meta">
              <span class="macro-mini-pill"><strong>Protein:</strong> ${day.dinner.protein}g</span>
              <span class="macro-mini-pill"><strong>Carbs:</strong> ${day.dinner.carbs}g</span>
              <span class="macro-mini-pill"><strong>Fat:</strong> ${day.dinner.fat}g</span>
              <span class="meal-highlight-badge">🌙 ${day.dinner.highlight}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="day-advice-box">
        <span>💡</span>
        <span>${day.portionAdvice}</span>
      </div>
    `;

    return card;
  }

  function renderGroceryList(groceryCategories) {
    if (!groceryContainer || !groceryCategories) return;
    groceryContainer.innerHTML = "";

    let totalItemsCount = 0;

    groceryCategories.forEach((cat, catIdx) => {
      const catCard = document.createElement("div");
      catCard.className = "grocery-cat-card";

      const catHeader = document.createElement("div");
      catHeader.className = "grocery-cat-header";
      catHeader.innerHTML = `
        <div class="grocery-cat-title">
          <span>${cat.icon}</span>
          <span>${cat.category}</span>
        </div>
        <span class="grocery-cat-count">${cat.items.length} items</span>
      `;
      catCard.appendChild(catHeader);

      const itemsList = document.createElement("div");
      itemsList.className = "grocery-items-list";

      cat.items.forEach((item, itemIdx) => {
        totalItemsCount++;
        const itemId = `g_${catIdx}_${itemIdx}_${item.name.replace(/[^a-zA-Z0-9]/g, "")}`;
        const isChecked = checkedGroceryItems.has(itemId);

        const row = document.createElement("label");
        row.className = `grocery-item-row ${isChecked ? "checked" : ""}`;
        row.setAttribute("for", itemId);

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = itemId;
        checkbox.checked = isChecked;

        checkbox.addEventListener("change", (e) => {
          if (e.target.checked) {
            checkedGroceryItems.add(itemId);
            row.classList.add("checked");
          } else {
            checkedGroceryItems.delete(itemId);
            row.classList.remove("checked");
          }
          updateGroceryProgress(totalItemsCount);
        });

        const content = document.createElement("div");
        content.className = "grocery-item-content";
        content.innerHTML = `
          <div class="grocery-item-main">
            <span class="grocery-item-name">${item.name}</span>
            <span class="grocery-item-qty">${item.qty}</span>
          </div>
          <div class="grocery-item-note">${item.note}</div>
        `;

        row.appendChild(checkbox);
        row.appendChild(content);
        itemsList.appendChild(row);
      });

      catCard.appendChild(itemsList);
      groceryContainer.appendChild(catCard);
    });

    updateGroceryProgress(totalItemsCount);
  }

  function updateGroceryProgress(totalItems) {
    if (!groceryProgressText || !groceryProgressPct || !groceryProgressFill) return;
    const checkedCount = checkedGroceryItems.size;
    const pct = totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0;

    groceryProgressText.textContent = `Items Purchased: ${checkedCount} of ${totalItems}`;
    groceryProgressPct.textContent = `${pct}% Purchased`;
    groceryProgressFill.style.width = `${pct}%`;
  }

  function renderCookingTips(tips) {
    const container = document.getElementById("wisdom-tips-grid");
    if (!container) return;
    container.innerHTML = "";

    const icons = ["🏺", "🥥", "🍚", "🔥", "🥟"];

    tips.forEach((t, i) => {
      const tipCard = document.createElement("div");
      tipCard.className = "wisdom-card";
      tipCard.innerHTML = `
        <div class="wisdom-card-icon">${icons[i % icons.length]}</div>
        <h4>${t.title}</h4>
        <p>${t.tip}</p>
      `;
      container.appendChild(tipCard);
    });
  }

  function updateViewToggles() {
    if (isAllDaysView) {
      viewTabsBtn.classList.remove("active");
      viewAllBtn.classList.add("active");
      document.querySelector(".day-tabs-wrapper").style.display = "none";
    } else {
      viewTabsBtn.classList.add("active");
      viewAllBtn.classList.remove("active");
      document.querySelector(".day-tabs-wrapper").style.display = "block";
    }
  }

  // View Switcher Handlers
  viewTabsBtn.addEventListener("click", () => {
    isAllDaysView = false;
    updateViewToggles();
    renderDayTabs(currentPlan.days);
    renderMealsView(currentPlan.days);
  });

  viewAllBtn.addEventListener("click", () => {
    isAllDaysView = true;
    updateViewToggles();
    renderMealsView(currentPlan.days);
  });

  // Regenerate Plan Button
  regenerateBtn.addEventListener("click", () => {
    if (!currentMetrics) return;
    // Add quick spin / pulse feedback
    regenerateBtn.style.opacity = "0.7";
    setTimeout(() => {
      currentPlan = MealPlanGenerator.generate7DayPlan(currentMetrics);
      renderDashboard(currentPlan);
      regenerateBtn.style.opacity = "1";
      showToast("🔄 7-Day Kerala Plan Freshly Regenerated!");
    }, 150);
  });

  // Edit Details Button
  editDetailsBtn.addEventListener("click", () => {
    inputCard.scrollIntoView({ behavior: "smooth", block: "start" });
    document.getElementById("weight").focus();
  });

  // Print Plan Button
  printPlanBtn.addEventListener("click", () => {
    // Before printing, switch to all-days view so full week is printed
    const prevView = isAllDaysView;
    isAllDaysView = true;
    updateViewToggles();
    renderMealsView(currentPlan.days);

    setTimeout(() => {
      window.print();
      // Restore previous view if needed
      if (!prevView) {
        isAllDaysView = false;
        updateViewToggles();
        renderMealsView(currentPlan.days);
      }
    }, 200);
  });

  // Copy Plan to Clipboard
  copyPlanBtn.addEventListener("click", () => {
    if (!currentPlan) return;

    let text = `========================================\n`;
    text += `FAT LOSS DIET PLAN (KERALA MEALS ONLY)\n`;
    text += `Target Daily Calories: ${currentMetrics.targetCalories} kcal (TDEE: ${currentMetrics.tdee} kcal)\n`;
    text += `Water Goal: ${currentMetrics.water.liters} Liters (${currentMetrics.water.glasses} glasses) + Warm Jeera/Pathimugham water\n`;
    text += `Macros: Protein ${currentMetrics.macros.protein.grams}g | Carbs ${currentMetrics.macros.carbs.grams}g | Fat ${currentMetrics.macros.fat.grams}g\n`;
    text += `========================================\n\n`;

    currentPlan.days.forEach(day => {
      text += `--- ${day.dayName.toUpperCase()} (${day.totals.calories} kcal | Protein: ${day.totals.protein}g) ---\n`;
      text += `* Wake Up: ${day.earlyMorning.title} (${day.earlyMorning.calories} kcal)\n`;
      text += `* Breakfast: ${day.breakfast.name} [${day.breakfast.portion}] (${day.breakfast.calories} kcal)\n`;
      text += `* Lunch: ${day.lunch.name} [${day.lunch.portion}] (${day.lunch.calories} kcal)\n`;
      text += `* Snack: ${day.snack.name} [${day.snack.portion}] (${day.snack.calories} kcal)\n`;
      text += `* Dinner: ${day.dinner.name} [${day.dinner.portion}] (${day.dinner.calories} kcal)\n\n`;
    });

    text += `\nKERALA FAT LOSS RULES:\n`;
    text += `1. Cook fish/curries in Manchatti with Kudampuli (Malabar tamarind) - zero heavy coconut milk.\n`;
    text += `2. Fill 50% plate with vegetable thoran (beans, cheera, cabbage) & limit Matta rice to 1 cup.\n`;
    text += `3. Drink warm Jeeraka Vellam or Pathimugham water through the day.\n`;
    text += `4. Roast pappadam directly over flame; avoid deep frying.\n`;

    navigator.clipboard.writeText(text).then(() => {
      showToast("📋 Entire 7-Day Plan copied to clipboard!");
    }).catch(() => {
      showToast("Unable to copy to clipboard.");
    });
  });

  // Jump to Grocery Section
  if (jumpGroceryBtn) {
    jumpGroceryBtn.addEventListener("click", () => {
      grocerySection.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  // Reset Grocery Checklist
  if (resetGroceryBtn) {
    resetGroceryBtn.addEventListener("click", () => {
      checkedGroceryItems.clear();
      if (currentPlan && currentPlan.groceryList) {
        renderGroceryList(currentPlan.groceryList);
      }
      showToast("🔄 Grocery checklist reset.");
    });
  }

  // Copy Grocery List formatted for WhatsApp / Notes
  if (copyGroceryBtn) {
    copyGroceryBtn.addEventListener("click", () => {
      if (!currentPlan || !currentPlan.groceryList) return;

      let text = `🛒 *KERALA FAT LOSS GROCERY LIST (1 WEEK)*\n`;
      text += `_Personalized for ${currentMetrics.foodPreference.toUpperCase()} diet • 7 days_\n\n`;

      currentPlan.groceryList.forEach(cat => {
        text += `*${cat.icon} ${cat.category.toUpperCase()}*\n`;
        cat.items.forEach(item => {
          text += `[ ] ${item.name} (${item.qty}) - ${item.note}\n`;
        });
        text += `\n`;
      });

      text += `💡 *Kerala Fat Loss Cooking Tip:* Use Kudampuli in clay pots, measure coconut oil with a teaspoon, and roast pappadam over fire without oil!\n`;

      navigator.clipboard.writeText(text).then(() => {
        showToast("📋 Grocery list copied! Ready to paste into WhatsApp.");
      }).catch(() => {
        showToast("Unable to copy grocery list.");
      });
    });
  }
});
