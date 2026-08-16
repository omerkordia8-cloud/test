// ============================================================
// products.js — Shared logic for all product listing pages
// ============================================================

let currentProducts = [];
let filteredProducts = [];
let currentPage = 1;
const PAGE_SIZE = 12;
let viewMode = 'grid';

// ===== Init Products Page =====
function initProductsPage(category, filterConfig) {
  currentProducts = getByCategory(category);
  filteredProducts = [...currentProducts];
  renderFilters(filterConfig);
  applyFiltersAndRender();
  setupSortBar();
}

// ===== Render Filters Sidebar =====
function renderFilters(config) {
  const sidebar = document.getElementById('filtersSidebar');
  if (!sidebar) return;

  let html = `<div class="filters-title">🔍 الفلاتر</div>`;

  // Price range
  const prices = currentProducts.map(p => p.price);
  const minP = Math.min(...prices), maxP = Math.max(...prices);
  html += `
  <div class="filter-group">
    <div class="filter-group-title">💰 نطاق السعر</div>
    <input type="range" class="price-slider" id="priceSlider"
      min="${minP}" max="${maxP}" value="${maxP}" step="50"
      oninput="updatePriceDisplay(this.value);applyFiltersAndRender()">
    <div class="price-display">
      <span>من ${minP.toLocaleString('ar-SA')} ر.س</span>
      <span id="priceDisplay">حتى ${maxP.toLocaleString('ar-SA')} ر.س</span>
    </div>
  </div>`;

  // Rating filter
  html += `
  <div class="filter-group">
    <div class="filter-group-title">⭐ التقييم</div>
    <div class="filter-options">
      ${[5,4,3].map(r => `
      <label class="filter-option">
        <input type="radio" name="ratingFilter" value="${r}" onchange="applyFiltersAndRender()">
        ${'★'.repeat(r)}${'☆'.repeat(5-r)} فأكثر
      </label>`).join('')}
      <label class="filter-option">
        <input type="radio" name="ratingFilter" value="0" checked onchange="applyFiltersAndRender()">
        الكل
      </label>
    </div>
  </div>`;

  // Dynamic filter groups
  config.forEach(group => {
    const values = [...new Set(currentProducts.map(p => p[group.field]).filter(Boolean))].sort();
    if (!values.length) return;
    html += `
    <div class="filter-group">
      <div class="filter-group-title">${group.icon} ${group.label}</div>
      <div class="filter-options">
        ${values.map(v => `
        <label class="filter-option">
          <input type="checkbox" data-field="${group.field}" value="${v}" onchange="applyFiltersAndRender()">
          ${v}
        </label>`).join('')}
      </div>
    </div>`;
  });

  html += `<button class="reset-filters-btn" onclick="resetFilters()">↺ إعادة تعيين الفلاتر</button>`;
  sidebar.innerHTML = html;
}

// ===== Apply Filters =====
function applyFiltersAndRender() {
  const maxPrice = parseFloat(document.getElementById('priceSlider')?.value || 999999);
  const ratingEl = document.querySelector('input[name="ratingFilter"]:checked');
  const minRating = ratingEl ? parseFloat(ratingEl.value) : 0;

  // Checkbox filters
  const checkboxGroups = {};
  document.querySelectorAll('.filter-options input[type="checkbox"]:checked').forEach(cb => {
    const field = cb.dataset.field;
    if (!checkboxGroups[field]) checkboxGroups[field] = [];
    checkboxGroups[field].push(cb.value);
  });

  // Search
  const searchVal = (document.getElementById('searchInput')?.value || '').toLowerCase().trim();

  filteredProducts = currentProducts.filter(p => {
    if (p.price > maxPrice) return false;
    if (p.rating < minRating) return false;
    for (const [field, vals] of Object.entries(checkboxGroups)) {
      if (!vals.includes(String(p[field]))) return false;
    }
    if (searchVal && !p.name.toLowerCase().includes(searchVal) && !p.brand.toLowerCase().includes(searchVal)) return false;
    return true;
  });

  // Sort
  const sortVal = document.getElementById('sortSelect')?.value || 'popular';
  sortProducts(sortVal);

  currentPage = 1;
  renderActiveFilterTags(checkboxGroups, maxPrice);
  renderProductsGrid();
  updateResultsCount();
}

function sortProducts(val) {
  switch(val) {
    case 'price-asc':  filteredProducts.sort((a,b) => a.price - b.price); break;
    case 'price-desc': filteredProducts.sort((a,b) => b.price - a.price); break;
    case 'rating':     filteredProducts.sort((a,b) => b.rating - a.rating); break;
    case 'newest':     filteredProducts.sort((a,b) => (b.badge === 'new' ? 1 : 0) - (a.badge === 'new' ? 1 : 0)); break;
    default:           filteredProducts.sort((a,b) => b.reviews - a.reviews);
  }
}

// ===== Render Grid =====
function renderProductsGrid() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;
  grid.className = `products-grid${viewMode === 'list' ? ' list-view' : ''}`;

  const start = (currentPage - 1) * PAGE_SIZE;
  const page = filteredProducts.slice(start, start + PAGE_SIZE);

  if (!page.length) {
    grid.innerHTML = `<div class="no-results"><span class="icon">🔍</span>لا توجد منتجات تطابق الفلاتر المختارة.<br><button class="btn btn-outline btn-sm" style="margin-top:14px" onclick="resetFilters()">إعادة تعيين الفلاتر</button></div>`;
    renderPagination(0);
    return;
  }

  grid.innerHTML = page.map(buildProductCard).join('');
  renderPagination(filteredProducts.length);
}

// ===== Pagination =====
function renderPagination(total) {
  const container = document.getElementById('pagination');
  if (!container) return;
  const pages = Math.ceil(total / PAGE_SIZE);
  if (pages <= 1) { container.innerHTML = ''; return; }

  let html = `<button class="page-btn" onclick="goPage(${currentPage-1})" ${currentPage===1?'disabled':''}>›</button>`;
  for (let i = 1; i <= pages; i++) {
    if (pages > 7 && i > 3 && i < pages - 2 && Math.abs(i - currentPage) > 1) {
      if (i === 4) html += '<span style="padding:0 8px;color:var(--text-muted)">…</span>';
      continue;
    }
    html += `<button class="page-btn${i===currentPage?' active':''}" onclick="goPage(${i})">${i}</button>`;
  }
  html += `<button class="page-btn" onclick="goPage(${currentPage+1})" ${currentPage===pages?'disabled':''}>‹</button>`;
  container.innerHTML = html;
}

function goPage(p) {
  const pages = Math.ceil(filteredProducts.length / PAGE_SIZE);
  if (p < 1 || p > pages) return;
  currentPage = p;
  renderProductsGrid();
  window.scrollTo({ top: 200, behavior: 'smooth' });
}

// ===== Sort Bar =====
function setupSortBar() {
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) sortSelect.addEventListener('change', applyFiltersAndRender);
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    let timer;
    searchInput.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(applyFiltersAndRender, 300); });
  }
  // View toggle
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      viewMode = btn.dataset.view;
      document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProductsGrid();
    });
  });
}

// ===== Update Count =====
function updateResultsCount() {
  const el = document.getElementById('resultsCount');
  if (el) el.innerHTML = `عرض <strong>${filteredProducts.length}</strong> من ${currentProducts.length} منتج`;
}

// ===== Active Filter Tags =====
function renderActiveFilterTags(groups, maxPrice) {
  const container = document.getElementById('activeFilters');
  if (!container) return;
  const allPrices = currentProducts.map(p => p.price);
  const globalMax = Math.max(...allPrices);
  let html = '';
  if (maxPrice < globalMax) {
    html += `<span class="active-filter-tag">السعر: حتى ${Math.round(maxPrice).toLocaleString('ar-SA')} ر.س <button onclick="resetPriceFilter()">×</button></span>`;
  }
  for (const [field, vals] of Object.entries(groups)) {
    vals.forEach(v => {
      html += `<span class="active-filter-tag">${v} <button onclick="removeFilterTag('${field}','${v}')">×</button></span>`;
    });
  }
  container.innerHTML = html;
}

function removeFilterTag(field, value) {
  const cb = document.querySelector(`input[data-field="${field}"][value="${value}"]`);
  if (cb) { cb.checked = false; applyFiltersAndRender(); }
}

function resetPriceFilter() {
  const slider = document.getElementById('priceSlider');
  if (slider) { slider.value = slider.max; updatePriceDisplay(slider.max); applyFiltersAndRender(); }
}

function updatePriceDisplay(val) {
  const el = document.getElementById('priceDisplay');
  if (el) el.textContent = `حتى ${Math.round(val).toLocaleString('ar-SA')} ر.س`;
}

// ===== Reset All Filters =====
function resetFilters() {
  document.querySelectorAll('.filter-options input[type="checkbox"]').forEach(cb => cb.checked = false);
  const ratingAll = document.querySelector('input[name="ratingFilter"][value="0"]');
  if (ratingAll) ratingAll.checked = true;
  const slider = document.getElementById('priceSlider');
  if (slider) { slider.value = slider.max; updatePriceDisplay(slider.max); }
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';
  applyFiltersAndRender();
}

// ===== Mobile Filters Toggle =====
function toggleFilters() {
  const sidebar = document.getElementById('filtersSidebar');
  if (sidebar) sidebar.classList.toggle('open');
}
