// ============================================================
// PC STORE - Master Product Database
// All prices in SAR (Saudi Riyals)
// ============================================================

const PRODUCTS_DB = {

// ============================================================
// PROCESSORS
// ============================================================
processors: [
  { id:"cpu-001", category:"processors", brand:"Intel", name:"Intel Core i3-12100", generation:12, cores:4, threads:8, baseSpeed:"3.3GHz", boostSpeed:"4.3GHz", socket:"LGA1700", tdp:"60W", ramSupport:"DDR4/DDR5", cache:"12MB", price:649, rating:4.2, reviews:128, badge:"popular", icon:"🔵",
    specs:{ cores:4, threads:8, baseSpeed:"3.3GHz", boostSpeed:"4.3GHz", socket:"LGA1700", tdp:"60W", cache:"12MB", ramType:"DDR4/DDR5", process:"Intel 7 (10nm)" },
    description:"معالج اقتصادي رائع للمهام اليومية والألعاب الخفيفة. أداء ممتاز بسعر مناسب مع دعم الجيل الثاني عشر من إنتل." },
  { id:"cpu-002", category:"processors", brand:"Intel", name:"Intel Core i5-12600K", generation:12, cores:10, threads:16, baseSpeed:"3.7GHz", boostSpeed:"4.9GHz", socket:"LGA1700", tdp:"125W", ramSupport:"DDR4/DDR5", cache:"20MB", price:1149, rating:4.6, reviews:312, badge:"bestseller", icon:"🔵",
    specs:{ cores:10, threads:16, baseSpeed:"3.7GHz", boostSpeed:"4.9GHz", socket:"LGA1700", tdp:"125W", cache:"20MB", ramType:"DDR4/DDR5", process:"Intel 7 (10nm)" },
    description:"معالج متوسط الفئة بأداء استثنائي للألعاب والإنتاجية. يدعم الرفع الترددي مع 6 أنوية أداء + 4 أنوية كفاءة." },
  { id:"cpu-003", category:"processors", brand:"Intel", name:"Intel Core i7-12700K", generation:12, cores:12, threads:20, baseSpeed:"3.6GHz", boostSpeed:"5.0GHz", socket:"LGA1700", tdp:"125W", ramSupport:"DDR4/DDR5", cache:"25MB", price:1749, rating:4.7, reviews:245, badge:"new", icon:"🔵",
    specs:{ cores:12, threads:20, baseSpeed:"3.6GHz", boostSpeed:"5.0GHz", socket:"LGA1700", tdp:"125W", cache:"25MB", ramType:"DDR4/DDR5", process:"Intel 7 (10nm)" },
    description:"معالج عالي الأداء يجمع بين قوة الألعاب والإنتاجية المتعددة المهام. مثالي للمحترفين." },
  { id:"cpu-004", category:"processors", brand:"Intel", name:"Intel Core i9-12900K", generation:12, cores:16, threads:24, baseSpeed:"3.2GHz", boostSpeed:"5.2GHz", socket:"LGA1700", tdp:"125W", ramSupport:"DDR4/DDR5", cache:"30MB", price:2449, rating:4.8, reviews:189, badge:"premium", icon:"🔵",
    specs:{ cores:16, threads:24, baseSpeed:"3.2GHz", boostSpeed:"5.2GHz", socket:"LGA1700", tdp:"125W", cache:"30MB", ramType:"DDR4/DDR5", process:"Intel 7 (10nm)" },
    description:"قمة أداء إنتل من الجيل الثاني عشر. 16 نواة و24 خيط لأقصى أداء ممكن في الألعاب والإنتاجية." },
  { id:"cpu-005", category:"processors", brand:"Intel", name:"Intel Core i5-13600K", generation:13, cores:14, threads:20, baseSpeed:"3.5GHz", boostSpeed:"5.1GHz", socket:"LGA1700", tdp:"125W", ramSupport:"DDR4/DDR5", cache:"24MB", price:1399, rating:4.8, reviews:421, badge:"bestseller", icon:"🔵",
    specs:{ cores:14, threads:20, baseSpeed:"3.5GHz", boostSpeed:"5.1GHz", socket:"LGA1700", tdp:"125W", cache:"24MB", ramType:"DDR4/DDR5", process:"Intel 7 (10nm)" },
    description:"الأفضل مبيعاً في فئته. 14 نواة بسعر تنافسي يقدم أداء استثنائياً يفوق معالجات أغلى منه ثمناً." },
  { id:"cpu-006", category:"processors", brand:"Intel", name:"Intel Core i7-13700K", generation:13, cores:16, threads:24, baseSpeed:"3.4GHz", boostSpeed:"5.4GHz", socket:"LGA1700", tdp:"125W", ramSupport:"DDR4/DDR5", cache:"30MB", price:2099, rating:4.7, reviews:287, badge:"new", icon:"🔵",
    specs:{ cores:16, threads:24, baseSpeed:"3.4GHz", boostSpeed:"5.4GHz", socket:"LGA1700", tdp:"125W", cache:"30MB", ramType:"DDR4/DDR5", process:"Intel 7 (10nm)" },
    description:"قوة هائلة للمحترفين والمحترفين في الألعاب. 16 نواة هجينة بسرعة تعزيز 5.4GHz." },
  { id:"cpu-007", category:"processors", brand:"Intel", name:"Intel Core i9-13900K", generation:13, cores:24, threads:32, baseSpeed:"3.0GHz", boostSpeed:"5.8GHz", socket:"LGA1700", tdp:"125W", ramSupport:"DDR4/DDR5", cache:"36MB", price:3199, rating:4.9, reviews:156, badge:"premium", icon:"🔵",
    specs:{ cores:24, threads:32, baseSpeed:"3.0GHz", boostSpeed:"5.8GHz", socket:"LGA1700", tdp:"125W", cache:"36MB", ramType:"DDR4/DDR5", process:"Intel 7 (10nm)" },
    description:"أقوى معالج سطح مكتب من إنتل. 24 نواة و32 خيط مع سرعة تعزيز قياسية 5.8GHz." },
  { id:"cpu-008", category:"processors", brand:"Intel", name:"Intel Core i5-14600K", generation:14, cores:14, threads:20, baseSpeed:"3.5GHz", boostSpeed:"5.3GHz", socket:"LGA1700", tdp:"125W", ramSupport:"DDR4/DDR5", cache:"24MB", price:1549, rating:4.7, reviews:198, badge:"new", icon:"🔵",
    specs:{ cores:14, threads:20, baseSpeed:"3.5GHz", boostSpeed:"5.3GHz", socket:"LGA1700", tdp:"125W", cache:"24MB", ramType:"DDR4/DDR5", process:"Intel 7 (10nm)" },
    description:"الجيل الرابع عشر بتحسينات تردد ملحوظة. أفضل خيار للألعاب في الفئة المتوسطة." },
  { id:"cpu-009", category:"processors", brand:"Intel", name:"Intel Core i9-14900K", generation:14, cores:24, threads:32, baseSpeed:"3.2GHz", boostSpeed:"6.0GHz", socket:"LGA1700", tdp:"125W", ramSupport:"DDR4/DDR5", cache:"36MB", price:3499, rating:4.9, reviews:134, badge:"premium", icon:"🔵",
    specs:{ cores:24, threads:32, baseSpeed:"3.2GHz", boostSpeed:"6.0GHz", socket:"LGA1700", tdp:"125W", cache:"36MB", ramType:"DDR4/DDR5", process:"Intel 7 (10nm)" },
    description:"أول معالج يصل إلى 6GHz. الأسرع في العالم للألعاب. 24 نواة تسحق كل المنافسين." },
  { id:"cpu-010", category:"processors", brand:"Intel", name:"Intel Core i9-15900K", generation:15, cores:24, threads:32, baseSpeed:"3.2GHz", boostSpeed:"6.2GHz", socket:"LGA1700", tdp:"150W", ramSupport:"DDR4/DDR5", cache:"36MB", price:3899, rating:4.9, reviews:89, badge:"new", icon:"🔵",
    specs:{ cores:24, threads:32, baseSpeed:"3.2GHz", boostSpeed:"6.2GHz", socket:"LGA1700", tdp:"150W", cache:"36MB", ramType:"DDR4/DDR5", process:"Intel 4 (7nm)" },
    description:"قمة أداء الجيل الخامس عشر. تقنية إنتل 4 الجديدة مع سرعة 6.2GHz للمطلوب الأقصى." },
  // AMD Ryzen
  { id:"cpu-011", category:"processors", brand:"AMD", name:"AMD Ryzen 5 5600X", generation:5, cores:6, threads:12, baseSpeed:"3.7GHz", boostSpeed:"4.6GHz", socket:"AM4", tdp:"65W", ramSupport:"DDR4", cache:"32MB", price:899, rating:4.7, reviews:534, badge:"bestseller", icon:"🔴",
    specs:{ cores:6, threads:12, baseSpeed:"3.7GHz", boostSpeed:"4.6GHz", socket:"AM4", tdp:"65W", cache:"32MB L3", ramType:"DDR4", process:"TSMC 7nm" },
    description:"المعالج الأفضل قيمة مقابل المال لسنوات. 6 أنوية بأداء رائع في الألعاب مع استهلاك طاقة منخفض." },
  { id:"cpu-012", category:"processors", brand:"AMD", name:"AMD Ryzen 7 5800X", generation:5, cores:8, threads:16, baseSpeed:"3.8GHz", boostSpeed:"4.7GHz", socket:"AM4", tdp:"105W", ramSupport:"DDR4", cache:"32MB", price:1299, rating:4.6, reviews:412, badge:"popular", icon:"🔴",
    specs:{ cores:8, threads:16, baseSpeed:"3.8GHz", boostSpeed:"4.7GHz", socket:"AM4", tdp:"105W", cache:"32MB L3", ramType:"DDR4", process:"TSMC 7nm" },
    description:"8 أنوية و16 خيط للمبدعين واللاعبين. أداء ممتاز في تعدد المهام مع منصة AM4 الموثوقة." },
  { id:"cpu-013", category:"processors", brand:"AMD", name:"AMD Ryzen 9 5900X", generation:5, cores:12, threads:24, baseSpeed:"3.7GHz", boostSpeed:"4.8GHz", socket:"AM4", tdp:"105W", ramSupport:"DDR4", cache:"64MB", price:1799, rating:4.8, reviews:356, badge:"premium", icon:"🔴",
    specs:{ cores:12, threads:24, baseSpeed:"3.7GHz", boostSpeed:"4.8GHz", socket:"AM4", tdp:"105W", cache:"64MB L3", ramType:"DDR4", process:"TSMC 7nm" },
    description:"12 نواة من الجيل الخامس لأقصى أداء إنتاجي. مثالي لأعمال التصميم والفيديو والألعاب." },
  { id:"cpu-014", category:"processors", brand:"AMD", name:"AMD Ryzen 9 5950X", generation:5, cores:16, threads:32, baseSpeed:"3.4GHz", boostSpeed:"4.9GHz", socket:"AM4", tdp:"105W", ramSupport:"DDR4", cache:"64MB", price:2599, rating:4.9, reviews:278, badge:"premium", icon:"🔴",
    specs:{ cores:16, threads:32, baseSpeed:"3.4GHz", boostSpeed:"4.9GHz", socket:"AM4", tdp:"105W", cache:"64MB L3", ramType:"DDR4", process:"TSMC 7nm" },
    description:"16 نواة من أداء TSMC 7nm. وحش الإنتاجية من AMD، مثالي للتصيير وتحرير الفيديو 4K." },
  { id:"cpu-015", category:"processors", brand:"AMD", name:"AMD Ryzen 5 7600X", generation:7, cores:6, threads:12, baseSpeed:"4.7GHz", boostSpeed:"5.3GHz", socket:"AM5", tdp:"105W", ramSupport:"DDR5", cache:"32MB", price:1099, rating:4.6, reviews:312, badge:"new", icon:"🔴",
    specs:{ cores:6, threads:12, baseSpeed:"4.7GHz", boostSpeed:"5.3GHz", socket:"AM5", tdp:"105W", cache:"32MB L3", ramType:"DDR5", process:"TSMC 5nm" },
    description:"أول معالج Ryzen على منصة AM5 الجديدة مع DDR5. سرعة تعزيز 5.3GHz بـ 6 أنوية." },
  { id:"cpu-016", category:"processors", brand:"AMD", name:"AMD Ryzen 7 7700X", generation:7, cores:8, threads:16, baseSpeed:"4.5GHz", boostSpeed:"5.4GHz", socket:"AM5", tdp:"105W", ramSupport:"DDR5", cache:"32MB", price:1449, rating:4.7, reviews:267, badge:"new", icon:"🔴",
    specs:{ cores:8, threads:16, baseSpeed:"4.5GHz", boostSpeed:"5.4GHz", socket:"AM5", tdp:"105W", cache:"32MB L3", ramType:"DDR5", process:"TSMC 5nm" },
    description:"8 أنوية Zen 4 بتقنية TSMC 5nm الأحدث. أداء رائد في الألعاب مع دعم PCIe 5.0 وDDR5." },
  { id:"cpu-017", category:"processors", brand:"AMD", name:"AMD Ryzen 9 7900X", generation:7, cores:12, threads:24, baseSpeed:"4.7GHz", boostSpeed:"5.6GHz", socket:"AM5", tdp:"170W", ramSupport:"DDR5", cache:"64MB", price:2149, rating:4.8, reviews:198, badge:"premium", icon:"🔴",
    specs:{ cores:12, threads:24, baseSpeed:"4.7GHz", boostSpeed:"5.6GHz", socket:"AM5", tdp:"170W", cache:"64MB L3", ramType:"DDR5", process:"TSMC 5nm" },
    description:"12 نواة Zen 4 للمحترفين. سرعة تعزيز 5.6GHz مع دعم كامل لـ DDR5 وPCIe 5.0." },
  { id:"cpu-018", category:"processors", brand:"AMD", name:"AMD Ryzen 9 7950X", generation:7, cores:16, threads:32, baseSpeed:"4.5GHz", boostSpeed:"5.7GHz", socket:"AM5", tdp:"170W", ramSupport:"DDR5", cache:"64MB", price:3299, rating:4.9, reviews:145, badge:"premium", icon:"🔴",
    specs:{ cores:16, threads:32, baseSpeed:"4.5GHz", boostSpeed:"5.7GHz", socket:"AM5", tdp:"170W", cache:"64MB L3", ramType:"DDR5", process:"TSMC 5nm" },
    description:"قمة AMD للمنصة الجديدة. 16 نواة Zen 4 مع ذاكرة مؤقتة 64MB وسرعة تعزيز 5.7GHz المذهلة." },
  { id:"cpu-019", category:"processors", brand:"AMD", name:"AMD Ryzen 5 7600", generation:7, cores:6, threads:12, baseSpeed:"3.8GHz", boostSpeed:"5.1GHz", socket:"AM5", tdp:"65W", ramSupport:"DDR5", cache:"32MB", price:949, rating:4.5, reviews:423, badge:"popular", icon:"🔴",
    specs:{ cores:6, threads:12, baseSpeed:"3.8GHz", boostSpeed:"5.1GHz", socket:"AM5", tdp:"65W", cache:"32MB L3", ramType:"DDR5", process:"TSMC 5nm" },
    description:"6 أنوية Zen 4 بـ 65W فقط. الخيار الأذكى لبناء جهاز اقتصادي فعال على منصة AM5." },
  { id:"cpu-020", category:"processors", brand:"AMD", name:"AMD Ryzen 3 4100", generation:4, cores:4, threads:8, baseSpeed:"3.8GHz", boostSpeed:"4.0GHz", socket:"AM4", tdp:"65W", ramSupport:"DDR4", cache:"4MB", price:399, rating:4.1, reviews:287, badge:"", icon:"🔴",
    specs:{ cores:4, threads:8, baseSpeed:"3.8GHz", boostSpeed:"4.0GHz", socket:"AM4", tdp:"65W", cache:"4MB L3", ramType:"DDR4", process:"TSMC 7nm" },
    description:"معالج اقتصادي ممتاز للمبتدئين. 4 أنوية Zen 2 بسعر متناسب للمهام اليومية الخفيفة." },

], // end processors

// ============================================================
// GRAPHICS CARDS
// ============================================================
gpus: [
  // NVIDIA GTX Series
  { id:"gpu-001", category:"gpus", brand:"NVIDIA", name:"NVIDIA GTX 1650 Super", series:"GTX", vram:"4GB", vramType:"GDDR6", busWidth:"128-bit", rayTracing:false, tdp:"100W", connector:"PCIe 3.0", price:649, rating:4.0, reviews:312, badge:"", icon:"🟢",
    specs:{ vram:"4GB GDDR6", busWidth:"128-bit", cores:1280, baseClock:"1530MHz", boostClock:"1725MHz", rayTracing:"لا", dlss:"لا", tdp:"100W", connector:"PCIe 3.0" },
    description:"كرت اقتصادي للألعاب بدقة 1080p. أداء معقول بسعر منخفض للمبتدئين." },
  { id:"gpu-002", category:"gpus", brand:"NVIDIA", name:"NVIDIA GTX 1660 Super", series:"GTX", vram:"6GB", vramType:"GDDR6", busWidth:"192-bit", rayTracing:false, tdp:"125W", connector:"PCIe 3.0", price:899, rating:4.3, reviews:456, badge:"popular", icon:"🟢",
    specs:{ vram:"6GB GDDR6", busWidth:"192-bit", cores:1408, baseClock:"1530MHz", boostClock:"1785MHz", rayTracing:"لا", dlss:"لا", tdp:"125W", connector:"PCIe 3.0" },
    description:"الخيار الكلاسيكي لألعاب 1080p الثابتة. أداء ممتاز وموثوقية عالية بسعر معقول." },
  { id:"gpu-003", category:"gpus", brand:"NVIDIA", name:"NVIDIA GTX 1660 Ti", series:"GTX", vram:"6GB", vramType:"GDDR6", busWidth:"192-bit", rayTracing:false, tdp:"120W", connector:"PCIe 3.0", price:999, rating:4.4, reviews:389, badge:"", icon:"🟢",
    specs:{ vram:"6GB GDDR6", busWidth:"192-bit", cores:1536, baseClock:"1500MHz", boostClock:"1770MHz", rayTracing:"لا", dlss:"لا", tdp:"120W", connector:"PCIe 3.0" },
    description:"نسخة Ti المحسنة من GTX 1660 بأداء أفضل للألعاب بدقة 1080p عالية الجودة." },
  // NVIDIA RTX Series
  { id:"gpu-004", category:"gpus", brand:"NVIDIA", name:"NVIDIA RTX 3060", series:"RTX 3000", vram:"12GB", vramType:"GDDR6", busWidth:"192-bit", rayTracing:true, tdp:"170W", connector:"PCIe 4.0", price:1399, rating:4.5, reviews:678, badge:"bestseller", icon:"🟢",
    specs:{ vram:"12GB GDDR6", busWidth:"192-bit", cores:3584, baseClock:"1320MHz", boostClock:"1777MHz", rayTracing:"نعم (2nd Gen)", dlss:"DLSS 2.0", tdp:"170W", connector:"PCIe 4.0" },
    description:"12GB ذاكرة بسعر منافس. مثالي لـ 1080p و1440p مع دعم Ray Tracing وDLSS." },
  { id:"gpu-005", category:"gpus", brand:"NVIDIA", name:"NVIDIA RTX 3060 Ti", series:"RTX 3000", vram:"8GB", vramType:"GDDR6", busWidth:"256-bit", rayTracing:true, tdp:"200W", connector:"PCIe 4.0", price:1699, rating:4.6, reviews:542, badge:"popular", icon:"🟢",
    specs:{ vram:"8GB GDDR6", busWidth:"256-bit", cores:4864, baseClock:"1410MHz", boostClock:"1665MHz", rayTracing:"نعم (2nd Gen)", dlss:"DLSS 2.0", tdp:"200W", connector:"PCIe 4.0" },
    description:"8GB بناقل 256-bit. أداء يفوق RTX 3070 القديم في كثير من الأحيان. خيار ممتاز لـ 1440p." },
  { id:"gpu-006", category:"gpus", brand:"NVIDIA", name:"NVIDIA RTX 3070", series:"RTX 3000", vram:"8GB", vramType:"GDDR6", busWidth:"256-bit", rayTracing:true, tdp:"220W", connector:"PCIe 4.0", price:2199, rating:4.7, reviews:423, badge:"", icon:"🟢",
    specs:{ vram:"8GB GDDR6", busWidth:"256-bit", cores:5888, baseClock:"1500MHz", boostClock:"1725MHz", rayTracing:"نعم (2nd Gen)", dlss:"DLSS 2.0", tdp:"220W", connector:"PCIe 4.0" },
    description:"أداء 4K بسعر معقول. 5888 نواة CUDA لتجربة بصرية خارقة مع دعم ray tracing متقدم." },
  { id:"gpu-007", category:"gpus", brand:"NVIDIA", name:"NVIDIA RTX 3080", series:"RTX 3000", vram:"10GB", vramType:"GDDR6X", busWidth:"320-bit", rayTracing:true, tdp:"320W", connector:"PCIe 4.0", price:2999, rating:4.8, reviews:356, badge:"premium", icon:"🟢",
    specs:{ vram:"10GB GDDR6X", busWidth:"320-bit", cores:8704, baseClock:"1440MHz", boostClock:"1710MHz", rayTracing:"نعم (2nd Gen)", dlss:"DLSS 2.0", tdp:"320W", connector:"PCIe 4.0" },
    description:"كرت الـ 4K المثالي من الجيل الثلاثين. GDDR6X بسرعة نقل هائلة و8704 نواة CUDA." },
  { id:"gpu-008", category:"gpus", brand:"NVIDIA", name:"NVIDIA RTX 4060", series:"RTX 4000", vram:"8GB", vramType:"GDDR6", busWidth:"128-bit", rayTracing:true, tdp:"115W", connector:"PCIe 4.0", price:1549, rating:4.4, reviews:489, badge:"new", icon:"🟢",
    specs:{ vram:"8GB GDDR6", busWidth:"128-bit", cores:3072, baseClock:"1830MHz", boostClock:"2460MHz", rayTracing:"نعم (3rd Gen)", dlss:"DLSS 3", tdp:"115W", connector:"PCIe 4.0" },
    description:"الجيل الرابع بكفاءة طاقة قياسية. 115W فقط مع DLSS 3 وFrame Generation للألعاب بدقة 1080p." },
  { id:"gpu-009", category:"gpus", brand:"NVIDIA", name:"NVIDIA RTX 4070", series:"RTX 4000", vram:"12GB", vramType:"GDDR6X", busWidth:"192-bit", rayTracing:true, tdp:"200W", connector:"PCIe 4.0", price:2349, rating:4.7, reviews:387, badge:"bestseller", icon:"🟢",
    specs:{ vram:"12GB GDDR6X", busWidth:"192-bit", cores:5888, baseClock:"1920MHz", boostClock:"2475MHz", rayTracing:"نعم (3rd Gen)", dlss:"DLSS 3", tdp:"200W", connector:"PCIe 4.0" },
    description:"12GB GDDR6X مع DLSS 3. الخيار المثالي لـ 1440p Ultra و4K بكفاءة طاقة ممتازة." },
  { id:"gpu-010", category:"gpus", brand:"NVIDIA", name:"NVIDIA RTX 4080", series:"RTX 4000", vram:"16GB", vramType:"GDDR6X", busWidth:"256-bit", rayTracing:true, tdp:"320W", connector:"PCIe 4.0", price:4499, rating:4.8, reviews:234, badge:"premium", icon:"🟢",
    specs:{ vram:"16GB GDDR6X", busWidth:"256-bit", cores:9728, baseClock:"2205MHz", boostClock:"2505MHz", rayTracing:"نعم (3rd Gen)", dlss:"DLSS 3", tdp:"320W", connector:"PCIe 4.0" },
    description:"16GB GDDR6X لأعلى أداء في 4K. تقنية Ada Lovelace مع 9728 نواة CUDA." },
  { id:"gpu-011", category:"gpus", brand:"NVIDIA", name:"NVIDIA RTX 4090", series:"RTX 4000", vram:"24GB", vramType:"GDDR6X", busWidth:"384-bit", rayTracing:true, tdp:"450W", connector:"PCIe 4.0", price:6999, rating:4.9, reviews:178, badge:"premium", icon:"🟢",
    specs:{ vram:"24GB GDDR6X", busWidth:"384-bit", cores:16384, baseClock:"2235MHz", boostClock:"2520MHz", rayTracing:"نعم (3rd Gen)", dlss:"DLSS 3", tdp:"450W", connector:"PCIe 4.0" },
    description:"أقوى كرت شاشة مستهلك في العالم. 24GB GDDR6X و16384 نواة CUDA للألعاب بـ 8K وصناعة المحتوى." },
  // AMD Radeon
  { id:"gpu-012", category:"gpus", brand:"AMD", name:"AMD Radeon RX 580", series:"RX 500", vram:"8GB", vramType:"GDDR5", busWidth:"256-bit", rayTracing:false, tdp:"185W", connector:"PCIe 3.0", price:699, rating:4.0, reviews:534, badge:"", icon:"🔴",
    specs:{ vram:"8GB GDDR5", busWidth:"256-bit", cores:2304, baseClock:"1257MHz", boostClock:"1340MHz", rayTracing:"لا", dlss:"لا", tdp:"185W", connector:"PCIe 3.0" },
    description:"كرت كلاسيكي موثوق لألعاب 1080p. 8GB ذاكرة بسعر منخفض جداً، مثالي لتجديد الأجهزة القديمة." },
  { id:"gpu-013", category:"gpus", brand:"AMD", name:"AMD Radeon RX 6600", series:"RX 6000", vram:"8GB", vramType:"GDDR6", busWidth:"128-bit", rayTracing:true, tdp:"132W", connector:"PCIe 4.0", price:1199, rating:4.3, reviews:412, badge:"popular", icon:"🔴",
    specs:{ vram:"8GB GDDR6", busWidth:"128-bit", cores:1792, baseClock:"1626MHz", boostClock:"2491MHz", rayTracing:"نعم", dlss:"FSR 2.0", tdp:"132W", connector:"PCIe 4.0" },
    description:"كفاءة طاقة ممتازة مع أداء قوي لـ 1080p. 8GB GDDR6 مع دعم AMD FSR للتحسين." },
  { id:"gpu-014", category:"gpus", brand:"AMD", name:"AMD Radeon RX 6700 XT", series:"RX 6000", vram:"12GB", vramType:"GDDR6", busWidth:"192-bit", rayTracing:true, tdp:"230W", connector:"PCIe 4.0", price:1799, rating:4.5, reviews:356, badge:"", icon:"🔴",
    specs:{ vram:"12GB GDDR6", busWidth:"192-bit", cores:2560, baseClock:"1756MHz", boostClock:"2581MHz", rayTracing:"نعم", dlss:"FSR 2.0", tdp:"230W", connector:"PCIe 4.0" },
    description:"12GB ذاكرة ضخمة لـ 1440p مريح. أداء AMD RDNA 2 مع Infinity Cache للسرعة الفائقة." },
  { id:"gpu-015", category:"gpus", brand:"AMD", name:"AMD Radeon RX 6800 XT", series:"RX 6000", vram:"16GB", vramType:"GDDR6", busWidth:"256-bit", rayTracing:true, tdp:"300W", connector:"PCIe 4.0", price:2699, rating:4.7, reviews:289, badge:"premium", icon:"🔴",
    specs:{ vram:"16GB GDDR6", busWidth:"256-bit", cores:4608, baseClock:"1825MHz", boostClock:"2310MHz", rayTracing:"نعم", dlss:"FSR 2.0", tdp:"300W", connector:"PCIe 4.0" },
    description:"16GB GDDR6 لألعاب 4K مريحة. منافس حقيقي لـ RTX 3080 بسعر تنافسي." },
  { id:"gpu-016", category:"gpus", brand:"AMD", name:"AMD Radeon RX 7600", series:"RX 7000", vram:"8GB", vramType:"GDDR6", busWidth:"128-bit", rayTracing:true, tdp:"165W", connector:"PCIe 4.0", price:1299, rating:4.4, reviews:267, badge:"new", icon:"🔴",
    specs:{ vram:"8GB GDDR6", busWidth:"128-bit", cores:2048, baseClock:"1720MHz", boostClock:"2655MHz", rayTracing:"نعم", dlss:"FSR 3.0", tdp:"165W", connector:"PCIe 4.0" },
    description:"RDNA 3 الجديد بكفاءة ممتازة. دعم FSR 3.0 مع أداء قوي لـ 1080p وبداية 1440p." },
  { id:"gpu-017", category:"gpus", brand:"AMD", name:"AMD Radeon RX 7900 XTX", series:"RX 7000", vram:"24GB", vramType:"GDDR6", busWidth:"384-bit", rayTracing:true, tdp:"355W", connector:"PCIe 4.0", price:5499, rating:4.8, reviews:178, badge:"premium", icon:"🔴",
    specs:{ vram:"24GB GDDR6", busWidth:"384-bit", cores:6144, baseClock:"1855MHz", boostClock:"2500MHz", rayTracing:"نعم", dlss:"FSR 3.0", tdp:"355W", connector:"PCIe 4.0" },
    description:"قمة AMD من الجيل السابع. 24GB ذاكرة هائلة مع ناقل 384-bit لأعلى أداء في 4K وVR." },

], // end gpus

// ============================================================
// PC CASES
// ============================================================
cases: [
  { id:"case-001", category:"cases", brand:"Corsair", name:"Corsair 4000D Airflow", size:"Mid Tower", sidePanel:"زجاج مقوى", rgb:false, waterCooling:true, color:"أسود", motherboard:"ATX/mATX/ITX", price:549, rating:4.7, reviews:678, badge:"bestseller", icon:"🖥️",
    specs:{ size:"Mid Tower", motherboard:"ATX/mATX/ITX", dimensions:"453×230×466mm", fans:"2×120mm مدمجة", maxGPU:"360mm", maxCooler:"170mm", driveBays:"2×3.5\" + 2×2.5\"", sidePanel:"زجاج مقوى", rgb:"لا", waterCooling:"360mm" },
    description:"الكيس الأكثر مبيعاً في العالم. تصميم مثالي لتدفق الهواء مع زجاج جانبي أنيق وسهولة التركيب." },
  { id:"case-002", category:"cases", brand:"NZXT", name:"NZXT H510", size:"Mid Tower", sidePanel:"زجاج مقوى", rgb:false, waterCooling:true, color:"أبيض", motherboard:"ATX/mATX", price:479, rating:4.5, reviews:523, badge:"popular", icon:"🖥️",
    specs:{ size:"Mid Tower", motherboard:"ATX/mATX", dimensions:"428×210×460mm", fans:"2×120mm مدمجة", maxGPU:"381mm", maxCooler:"165mm", driveBays:"2×2.5\" + 1×3.5\"", sidePanel:"زجاج مقوى", rgb:"لا", waterCooling:"280mm" },
    description:"تصميم مينيمال أنيق بزجاج جانبي كامل. الكيس المفضل للمستخدمين الذين يهتمون بالجماليات." },
  { id:"case-003", category:"cases", brand:"Lian Li", name:"Lian Li PC-O11 Dynamic", size:"Mid Tower", sidePanel:"زجاج مقوى كامل", rgb:true, waterCooling:true, color:"أسود", motherboard:"ATX/mATX/ITX", price:699, rating:4.8, reviews:734, badge:"bestseller", icon:"🖥️",
    specs:{ size:"Mid Tower", motherboard:"ATX/mATX/ITX", dimensions:"462×272×445mm", fans:"حتى 9×120mm", maxGPU:"420mm", maxCooler:"155mm", driveBays:"2×2.5\" + 2×3.5\"", sidePanel:"زجاج مقوى من الجانبين", rgb:"RGB مدمج", waterCooling:"360mm" },
    description:"الكيس الأيقوني مزدوج الزجاج. مثالي للتبريد المائي مع رؤية 360 درجة للمكونات الداخلية." },
  { id:"case-004", category:"cases", brand:"Fractal Design", name:"Fractal Design Meshify C", size:"Mid Tower", sidePanel:"زجاج مقوى", rgb:false, waterCooling:true, color:"أسود", motherboard:"ATX/mATX/ITX", price:529, rating:4.6, reviews:445, badge:"", icon:"🖥️",
    specs:{ size:"Mid Tower", motherboard:"ATX/mATX/ITX", dimensions:"395×212×453mm", fans:"2×120mm مدمجة", maxGPU:"315mm", maxCooler:"172mm", driveBays:"2×3.5\" + 2×2.5\"", sidePanel:"زجاج مقوى", rgb:"لا", waterCooling:"240mm" },
    description:"شبكة هوائية عالية الكثافة للتبريد المثالي. تصميم مدمج وأنيق مع أداء هوائي استثنائي." },
  { id:"case-005", category:"cases", brand:"Cooler Master", name:"Cooler Master MasterBox TD500", size:"Mid Tower", sidePanel:"زجاج مقوى", rgb:true, waterCooling:true, color:"أسود", motherboard:"ATX/mATX/ITX", price:449, rating:4.4, reviews:389, badge:"", icon:"🖥️",
    specs:{ size:"Mid Tower", motherboard:"ATX/mATX/ITX", dimensions:"493×217×469mm", fans:"3×120mm ARGB مدمجة", maxGPU:"410mm", maxCooler:"165mm", driveBays:"2×3.5\" + 2×2.5\"", sidePanel:"زجاج مقوى", rgb:"ARGB مدمج", waterCooling:"360mm" },
    description:"3 مراوح ARGB مدمجة مع شبكة هوائية أمامية. التوازن المثالي بين الأداء والجماليات." },
  { id:"case-006", category:"cases", brand:"Corsair", name:"Corsair 5000D Airflow", size:"Mid Tower", sidePanel:"زجاج مقوى", rgb:false, waterCooling:true, color:"أبيض", motherboard:"ATX/E-ATX/mATX", price:749, rating:4.8, reviews:512, badge:"premium", icon:"🖥️",
    specs:{ size:"Mid Tower", motherboard:"ATX/E-ATX/mATX", dimensions:"520×245×520mm", fans:"حتى 10×120mm", maxGPU:"420mm", maxCooler:"190mm", driveBays:"4×3.5\" + 4×2.5\"", sidePanel:"زجاج مقوى", rgb:"لا", waterCooling:"420mm" },
    description:"الكيس الكبير بتدفق هواء استثنائي. مساحة واسعة لأضخم المكونات مع تصميم احترافي." },
  { id:"case-007", category:"cases", brand:"NZXT", name:"NZXT H7 Flow RGB", size:"Mid Tower", sidePanel:"زجاج مقوى", rgb:true, waterCooling:true, color:"أسود", motherboard:"ATX/mATX/ITX", price:669, rating:4.7, reviews:312, badge:"new", icon:"🖥️",
    specs:{ size:"Mid Tower", motherboard:"ATX/mATX/ITX", dimensions:"480×230×505mm", fans:"3×120mm RGB مدمجة", maxGPU:"400mm", maxCooler:"185mm", driveBays:"4×2.5\" + 2×3.5\"", sidePanel:"زجاج مقوى", rgb:"RGB مدمج", waterCooling:"360mm" },
    description:"إضاءة RGB ممتازة مع هيكل حديث. تصميم عصري مع إدارة كابلات احترافية مدمجة." },
  { id:"case-008", category:"cases", brand:"Lian Li", name:"Lian Li Lancool III", size:"Full Tower", sidePanel:"زجاج مقوى كامل", rgb:true, waterCooling:true, color:"أسود", motherboard:"E-ATX/ATX/mATX", price:899, rating:4.9, reviews:245, badge:"premium", icon:"🖥️",
    specs:{ size:"Full Tower", motherboard:"E-ATX/ATX/mATX", dimensions:"520×270×510mm", fans:"حتى 12×120mm", maxGPU:"435mm", maxCooler:"190mm", driveBays:"4×2.5\" + 2×3.5\"", sidePanel:"زجاج مقوى من الجانبين", rgb:"ARGB مدمج", waterCooling:"420mm" },
    description:"برج كامل من Lian Li بزجاج كامل من الجانبين. مساحة هائلة مع تبريد استثنائي." },
  { id:"case-009", category:"cases", brand:"Fractal Design", name:"Fractal Design Define 7", size:"Full Tower", sidePanel:"زجاج مقوى", rgb:false, waterCooling:true, color:"أبيض", motherboard:"E-ATX/ATX/mATX", price:849, rating:4.7, reviews:289, badge:"", icon:"🖥️",
    specs:{ size:"Full Tower", motherboard:"E-ATX/ATX/mATX", dimensions:"543×240×562mm", fans:"حتى 9×120mm", maxGPU:"440mm", maxCooler:"185mm", driveBays:"18 درج", sidePanel:"زجاج مقوى", rgb:"لا", waterCooling:"420mm" },
    description:"كيس برج صامت للمحترفين. عزل صوتي ممتاز مع سعة تخزين هائلة و18 درجاً للأقراص." },
  { id:"case-010", category:"cases", brand:"Cooler Master", name:"Cooler Master HAF 700 EVO", size:"Full Tower", sidePanel:"زجاج مقوى", rgb:true, waterCooling:true, color:"أسود", motherboard:"E-ATX/ATX", price:1299, rating:4.8, reviews:156, badge:"premium", icon:"🖥️",
    specs:{ size:"Full Tower", motherboard:"E-ATX/ATX", dimensions:"674×294×700mm", fans:"6×120mm مدمجة", maxGPU:"485mm", maxCooler:"210mm", driveBays:"4×3.5\" + 4×2.5\"", sidePanel:"زجاج مقوى", rgb:"ARGB مدمج", waterCooling:"480mm" },
    description:"وحش التبريد. مساحة هائلة لأضخم مبردات مائية مع إضاءة ARGB ضخمة وتدفق هواء هائل." },

], // end cases

// ============================================================
// RAM
// ============================================================
ram: [
  { id:"ram-001", category:"ram", brand:"Corsair", name:"Corsair Vengeance LPX 16GB DDR4", type:"DDR4", capacity:"16GB", kit:"2×8GB", speed:"3200MHz", cl:"CL16", voltage:"1.35V", rgb:false, price:249, rating:4.7, reviews:892, badge:"bestseller", icon:"🟡",
    specs:{ type:"DDR4", capacity:"16GB (2×8GB)", speed:"3200MHz", cl:"CL16-18-18-36", voltage:"1.35V", rgb:"لا", heatsink:"نعم", xmp:"XMP 2.0", height:"31.25mm" },
    description:"الرام الأكثر مبيعاً في العالم. موثوقية عالية وتوافق واسع مع جميع اللوحات الأم." },
  { id:"ram-002", category:"ram", brand:"G.Skill", name:"G.Skill Trident Z RGB 16GB DDR4", type:"DDR4", capacity:"16GB", kit:"2×8GB", speed:"3600MHz", cl:"CL16", voltage:"1.35V", rgb:true, price:349, rating:4.8, reviews:678, badge:"popular", icon:"🟡",
    specs:{ type:"DDR4", capacity:"16GB (2×8GB)", speed:"3600MHz", cl:"CL16-19-19-39", voltage:"1.35V", rgb:"RGB مدمج", heatsink:"نعم", xmp:"XMP 2.0", height:"44mm" },
    description:"إضاءة RGB ساحرة مع أداء 3600MHz. الخيار الجمالي الأول لمن يريد مزيجاً من الأداء والجمال." },
  { id:"ram-003", category:"ram", brand:"Kingston", name:"Kingston Fury Beast 32GB DDR4", type:"DDR4", capacity:"32GB", kit:"2×16GB", speed:"3200MHz", cl:"CL16", voltage:"1.35V", rgb:false, price:449, rating:4.6, reviews:534, badge:"", icon:"🟡",
    specs:{ type:"DDR4", capacity:"32GB (2×16GB)", speed:"3200MHz", cl:"CL16-18-18-36", voltage:"1.35V", rgb:"لا", heatsink:"نعم", xmp:"XMP 2.0", height:"34.1mm" },
    description:"32GB بسعر ممتاز. الخيار المثالي للمحترفين الذين يحتاجون ذاكرة وفيرة للإنتاجية والألعاب." },
  { id:"ram-004", category:"ram", brand:"Corsair", name:"Corsair Dominator Platinum 32GB DDR4", type:"DDR4", capacity:"32GB", kit:"2×16GB", speed:"3600MHz", cl:"CL18", voltage:"1.35V", rgb:true, price:649, rating:4.8, reviews:412, badge:"premium", icon:"🟡",
    specs:{ type:"DDR4", capacity:"32GB (2×16GB)", speed:"3600MHz", cl:"CL18-22-22-42", voltage:"1.35V", rgb:"DHX RGB", heatsink:"نعم - ذو مشط", xmp:"XMP 2.0", height:"51mm" },
    description:"الفاخرة من Corsair. مشط تبريد ضخم مع إضاءة DHX RGB وأداء استثنائي في الرفع الترددي." },
  { id:"ram-005", category:"ram", brand:"G.Skill", name:"G.Skill Ripjaws V 64GB DDR4", type:"DDR4", capacity:"64GB", kit:"2×32GB", speed:"3200MHz", cl:"CL16", voltage:"1.35V", rgb:false, price:849, rating:4.7, reviews:289, badge:"", icon:"🟡",
    specs:{ type:"DDR4", capacity:"64GB (2×32GB)", speed:"3200MHz", cl:"CL16-18-18-38", voltage:"1.35V", rgb:"لا", heatsink:"نعم", xmp:"XMP 2.0", height:"42mm" },
    description:"64GB للاستوديوهات والمهندسين. طاقة ذاكرة هائلة لأعمال الرسم ثلاثي الأبعاد وتحرير الفيديو." },
  { id:"ram-006", category:"ram", brand:"TeamGroup", name:"TeamGroup T-Force Delta RGB 16GB DDR4", type:"DDR4", capacity:"16GB", kit:"2×8GB", speed:"3200MHz", cl:"CL16", voltage:"1.35V", rgb:true, price:299, rating:4.5, reviews:456, badge:"", icon:"🟡",
    specs:{ type:"DDR4", capacity:"16GB (2×8GB)", speed:"3200MHz", cl:"CL16-18-18-38", voltage:"1.35V", rgb:"RGB كامل", heatsink:"نعم", xmp:"XMP 2.0", height:"47mm" },
    description:"إضاءة RGB بديعة بسعر تنافسي. تصميم زجاجي شفاف يعكس الألوان بشكل مذهل." },
  { id:"ram-007", category:"ram", brand:"G.Skill", name:"G.Skill Trident Z5 32GB DDR5", type:"DDR5", capacity:"32GB", kit:"2×16GB", speed:"6000MHz", cl:"CL36", voltage:"1.35V", rgb:true, price:799, rating:4.7, reviews:312, badge:"new", icon:"🟡",
    specs:{ type:"DDR5", capacity:"32GB (2×16GB)", speed:"6000MHz", cl:"CL36-36-36-96", voltage:"1.35V", rgb:"RGB مدمج", heatsink:"نعم", xmp:"XMP 3.0", height:"44mm" },
    description:"DDR5 بسرعة 6000MHz. الجيل الجديد من الذاكرة بعرض نطاق ترددي مضاعف مع XMP 3.0." },
  { id:"ram-008", category:"ram", brand:"Corsair", name:"Corsair Vengeance DDR5 32GB", type:"DDR5", capacity:"32GB", kit:"2×16GB", speed:"5600MHz", cl:"CL36", voltage:"1.25V", rgb:false, price:699, rating:4.6, reviews:267, badge:"new", icon:"🟡",
    specs:{ type:"DDR5", capacity:"32GB (2×16GB)", speed:"5600MHz", cl:"CL36-36-36-76", voltage:"1.25V", rgb:"لا", heatsink:"نعم", xmp:"XMP 3.0", height:"34mm" },
    description:"DDR5 بتقنية On-Die ECC المدمجة للموثوقية القصوى. انتقل للجيل الجديد بثقة." },
  { id:"ram-009", category:"ram", brand:"Kingston", name:"Kingston Fury Beast DDR5 64GB", type:"DDR5", capacity:"64GB", kit:"2×32GB", speed:"5200MHz", cl:"CL40", voltage:"1.25V", rgb:false, price:1199, rating:4.6, reviews:178, badge:"", icon:"🟡",
    specs:{ type:"DDR5", capacity:"64GB (2×32GB)", speed:"5200MHz", cl:"CL40-40-40-80", voltage:"1.25V", rgb:"لا", heatsink:"نعم", xmp:"XMP 3.0", height:"34.1mm" },
    description:"64GB DDR5 للمحترفين. طاقة هائلة مع الجيل الجديد من الذاكرة لأقصى إنتاجية." },
  { id:"ram-010", category:"ram", brand:"Corsair", name:"Corsair Vengeance LPX 8GB DDR4", type:"DDR4", capacity:"8GB", kit:"1×8GB", speed:"3000MHz", cl:"CL16", voltage:"1.35V", rgb:false, price:129, rating:4.4, reviews:1023, badge:"", icon:"🟡",
    specs:{ type:"DDR4", capacity:"8GB (1×8GB)", speed:"3000MHz", cl:"CL16-18-18-36", voltage:"1.35V", rgb:"لا", heatsink:"نعم", xmp:"XMP 2.0", height:"31.25mm" },
    description:"خيار اقتصادي موثوق للمبتدئين. ارتفاع منخفض يناسب جميع المبردات الهوائية الضخمة." },
  { id:"ram-011", category:"ram", brand:"TeamGroup", name:"TeamGroup T-Create Expert DDR5 32GB", type:"DDR5", capacity:"32GB", kit:"2×16GB", speed:"6400MHz", cl:"CL38", voltage:"1.4V", rgb:false, price:879, rating:4.7, reviews:134, badge:"new", icon:"🟡",
    specs:{ type:"DDR5", capacity:"32GB (2×16GB)", speed:"6400MHz", cl:"CL38-38-38-78", voltage:"1.4V", rgb:"لا", heatsink:"نعم", xmp:"XMP 3.0/EXPO", height:"44mm" },
    description:"أسرع DDR5 للمنصتين Intel وAMD. يدعم XMP 3.0 وEXPO للتوافق الأوسع." },

], // end ram

// ============================================================
// COOLERS
// ============================================================
coolers: [
  { id:"cool-001", category:"coolers", brand:"Noctua", name:"Noctua NH-D15", type:"هوائي", size:"Dual Tower", radiator:null, socket:"LGA1700/AM5/AM4", tdpRating:"250W", noise:"24.6 dBa", rgb:false, price:649, rating:4.9, reviews:1245, badge:"bestseller", icon:"🌀",
    specs:{ type:"هوائي - Dual Tower", fans:"2×140mm NF-A15", socket:"LGA1700/AM4/AM5", tdpRating:"250W+", height:"165mm", weight:"1320g", noise:"24.6 dBa", rgb:"لا", heatpipes:"6 أنابيب حرارة" },
    description:"أفضل مبرد هوائي في العالم. أداء يضاهي مبردات مائية 280mm مع صوت منخفض جداً." },
  { id:"cool-002", category:"coolers", brand:"Noctua", name:"Noctua NH-U12S Redux", type:"هوائي", size:"Single Tower", radiator:null, socket:"LGA1700/AM5/AM4", tdpRating:"180W", noise:"22.4 dBa", rgb:false, price:299, rating:4.7, reviews:678, badge:"popular", icon:"🌀",
    specs:{ type:"هوائي - Single Tower", fans:"1×120mm NF-P12", socket:"LGA1700/AM4/AM5", tdpRating:"180W", height:"158mm", weight:"745g", noise:"22.4 dBa", rgb:"لا", heatpipes:"5 أنابيب حرارة" },
    description:"التوازن المثالي بين الأداء والحجم. يناسب معظم الكيسات مع صوت شبه صامت." },
  { id:"cool-003", category:"coolers", brand:"Cooler Master", name:"Cooler Master Hyper 212 Black", type:"هوائي", size:"Single Tower", radiator:null, socket:"LGA1700/AM5/AM4", tdpRating:"150W", noise:"26 dBa", rgb:false, price:179, rating:4.5, reviews:2134, badge:"bestseller", icon:"🌀",
    specs:{ type:"هوائي - Single Tower", fans:"1×120mm SickleFlow", socket:"LGA1700/AM4/AM5/LGA1200", tdpRating:"150W", height:"159mm", weight:"530g", noise:"26 dBa", rgb:"لا", heatpipes:"4 أنابيب حرارة" },
    description:"الأكثر مبيعاً في التاريخ. سعر لا يُقاوم مع أداء يتجاوز سعره بكثير." },
  { id:"cool-004", category:"coolers", brand:"NZXT", name:"NZXT Kraken X53 240mm AIO", type:"مائي", size:"AIO 240mm", radiator:"240mm", socket:"LGA1700/AM5/AM4", tdpRating:"300W", noise:"33 dBa", rgb:true, price:749, rating:4.6, reviews:534, badge:"popular", icon:"💧",
    specs:{ type:"تبريد مائي متكامل", radiator:"240mm", fans:"2×120mm Aer P", socket:"LGA1700/AM4/AM5", tdpRating:"300W", headHeight:"52mm", noise:"33 dBa", rgb:"Infinity Mirror RGB", tubeLength:"400mm" },
    description:"مضخة Infinity Mirror الجذابة مع مشع 240mm. تبريد فعال وجمالية استثنائية." },
  { id:"cool-005", category:"coolers", brand:"Corsair", name:"Corsair iCUE H100i Elite 240mm AIO", type:"مائي", size:"AIO 240mm", radiator:"240mm", socket:"LGA1700/AM5/AM4", tdpRating:"280W", noise:"37 dBa", rgb:true, price:699, rating:4.7, reviews:612, badge:"", icon:"💧",
    specs:{ type:"تبريد مائي متكامل", radiator:"240mm", fans:"2×120mm QL RGB", socket:"LGA1700/AM4/AM5/LGA1200", tdpRating:"280W", headHeight:"43mm", noise:"37 dBa", rgb:"QL RGB مدمج", tubeLength:"380mm" },
    description:"مراوح QL RGB ساحرة مع مضخة قوية. يتحكم بها عبر برنامج iCUE لإضاءة متناسقة." },
  { id:"cool-006", category:"coolers", brand:"Corsair", name:"Corsair iCUE H150i Elite 360mm AIO", type:"مائي", size:"AIO 360mm", radiator:"360mm", socket:"LGA1700/AM5/AM4", tdpRating:"400W", noise:"37 dBa", rgb:true, price:999, rating:4.8, reviews:389, badge:"bestseller", icon:"💧",
    specs:{ type:"تبريد مائي متكامل", radiator:"360mm", fans:"3×120mm QL RGB", socket:"LGA1700/AM4/AM5/LGA1200", tdpRating:"400W+", headHeight:"43mm", noise:"37 dBa", rgb:"QL RGB مدمج", tubeLength:"400mm" },
    description:"مشع 360mm للمعالجات الأقوى. 3 مراوح QL RGB مع تبريد فائق لمعالجات i9 وRyzen 9." },
  { id:"cool-007", category:"coolers", brand:"NZXT", name:"NZXT Kraken Z73 360mm AIO", type:"مائي", size:"AIO 360mm", radiator:"360mm", socket:"LGA1700/AM5/AM4", tdpRating:"400W", noise:"36 dBa", rgb:true, price:1099, rating:4.8, reviews:267, badge:"premium", icon:"💧",
    specs:{ type:"تبريد مائي متكامل", radiator:"360mm", fans:"3×120mm Aer P", socket:"LGA1700/AM4/AM5", tdpRating:"400W+", headHeight:"52mm + شاشة LCD", noise:"36 dBa", rgb:"شاشة LCD 2.36 بوصة", tubeLength:"400mm" },
    description:"شاشة LCD 2.36 بوصة في المضخة تعرض درجة الحرارة أو صورتك. مشع 360mm قاتل." },
  { id:"cool-008", category:"coolers", brand:"Cooler Master", name:"Cooler Master MasterLiquid 280mm AIO", type:"مائي", size:"AIO 280mm", radiator:"280mm", socket:"LGA1700/AM5/AM4", tdpRating:"350W", noise:"30 dBa", rgb:true, price:799, rating:4.6, reviews:312, badge:"", icon:"💧",
    specs:{ type:"تبريد مائي متكامل", radiator:"280mm", fans:"2×140mm ARGB", socket:"LGA1700/AM4/AM5", tdpRating:"350W", headHeight:"49mm", noise:"30 dBa", rgb:"ARGB مدمج", tubeLength:"400mm" },
    description:"مشع 280mm بمراوح 140mm الأهدأ. أداء ممتاز مع صوت أقل من نظيره 240mm." },
  { id:"cool-009", category:"coolers", brand:"Noctua", name:"Noctua NH-L9i Low Profile", type:"هوائي", size:"Low Profile", radiator:null, socket:"LGA1700/LGA1200", tdpRating:"65W", noise:"23.6 dBa", rgb:false, price:249, rating:4.6, reviews:445, badge:"", icon:"🌀",
    specs:{ type:"هوائي - Low Profile", fans:"1×92mm NF-B9", socket:"LGA1700/LGA1200", tdpRating:"65W", height:"37mm", weight:"320g", noise:"23.6 dBa", rgb:"لا", heatpipes:"3 أنابيب حرارة" },
    description:"أرق مبرد هوائي بـ 37mm فقط. مثالي لكيسات HTPC والمينيIPX الصغيرة." },
  { id:"cool-010", category:"coolers", brand:"NZXT", name:"NZXT Kraken 120mm AIO", type:"مائي", size:"AIO 120mm", radiator:"120mm", socket:"LGA1700/AM5/AM4", tdpRating:"200W", noise:"30 dBa", rgb:true, price:499, rating:4.4, reviews:378, badge:"", icon:"💧",
    specs:{ type:"تبريد مائي متكامل", radiator:"120mm", fans:"1×120mm Aer P", socket:"LGA1700/AM4/AM5", tdpRating:"200W", headHeight:"52mm", noise:"30 dBa", rgb:"Infinity Mirror RGB", tubeLength:"380mm" },
    description:"أصغر مبرد مائي متكامل من NZXT. مثالي للكيسات الصغيرة مع تأثير Infinity Mirror الجذاب." },

], // end coolers

// ============================================================
// ACCESSORIES (SSD, HDD, PSU, etc.)
// ============================================================
accessories: [
  // SSD NVMe
  { id:"acc-001", category:"accessories", subCategory:"SSD NVMe", brand:"Samsung", name:"Samsung 980 Pro 1TB NVMe M.2", capacity:"1TB", type:"NVMe M.2", speed:"7000MB/s Read", interface:"PCIe 4.0 x4", formFactor:"M.2 2280", price:549, rating:4.8, reviews:1234, badge:"bestseller", icon:"💾",
    specs:{ capacity:"1TB", type:"NVMe M.2", interface:"PCIe 4.0 x4", readSpeed:"7000 MB/s", writeSpeed:"5100 MB/s", formFactor:"M.2 2280", endurance:"600 TBW", dram:"DRAM Cache" },
    description:"أسرع SSD M.2 للمستهلكين. 7000MB/s قراءة مع PCIe 4.0. مثالي لألعاب PC والإنتاجية." },
  { id:"acc-002", category:"accessories", subCategory:"SSD NVMe", brand:"WD", name:"WD Black SN850X 2TB NVMe", capacity:"2TB", type:"NVMe M.2", speed:"7300MB/s Read", interface:"PCIe 4.0 x4", formFactor:"M.2 2280", price:899, rating:4.8, reviews:678, badge:"premium", icon:"💾",
    specs:{ capacity:"2TB", type:"NVMe M.2", interface:"PCIe 4.0 x4", readSpeed:"7300 MB/s", writeSpeed:"6600 MB/s", formFactor:"M.2 2280", endurance:"1200 TBW", dram:"DRAM Cache" },
    description:"2TB بأقصى سرعة. محسّن لألعاب DirectStorage مع نظام تبريد مدمج وأداء متواصل." },
  { id:"acc-003", category:"accessories", subCategory:"SSD NVMe", brand:"Seagate", name:"Seagate FireCuda 530 512GB", capacity:"512GB", type:"NVMe M.2", speed:"7000MB/s Read", interface:"PCIe 4.0 x4", formFactor:"M.2 2280", price:379, rating:4.7, reviews:456, badge:"", icon:"💾",
    specs:{ capacity:"512GB", type:"NVMe M.2", interface:"PCIe 4.0 x4", readSpeed:"7000 MB/s", writeSpeed:"3000 MB/s", formFactor:"M.2 2280", endurance:"310 TBW", dram:"DRAM Cache" },
    description:"PCIe 4.0 بحجم اقتصادي. يدعم PlayStation 5 Expansion Slot مع أداء ممتاز." },
  { id:"acc-004", category:"accessories", subCategory:"SSD NVMe", brand:"Samsung", name:"Samsung 990 Pro 1TB NVMe", capacity:"1TB", type:"NVMe M.2", speed:"7450MB/s Read", interface:"PCIe 4.0 x4", formFactor:"M.2 2280", price:599, rating:4.9, reviews:389, badge:"new", icon:"💾",
    specs:{ capacity:"1TB", type:"NVMe M.2", interface:"PCIe 4.0 x4", readSpeed:"7450 MB/s", writeSpeed:"6900 MB/s", formFactor:"M.2 2280", endurance:"600 TBW", dram:"DRAM Cache" },
    description:"الأحدث من Samsung. 7450MB/s مع تحسينات حرارية وطاقة تجعله أفضل 990 Pro لليوم." },
  { id:"acc-005", category:"accessories", subCategory:"SSD NVMe", brand:"WD", name:"WD Blue SN580 1TB NVMe", capacity:"1TB", type:"NVMe M.2", speed:"4150MB/s Read", interface:"PCIe 4.0 x4", formFactor:"M.2 2280", price:329, rating:4.6, reviews:534, badge:"popular", icon:"💾",
    specs:{ capacity:"1TB", type:"NVMe M.2", interface:"PCIe 4.0 x4", readSpeed:"4150 MB/s", writeSpeed:"4150 MB/s", formFactor:"M.2 2280", endurance:"600 TBW", dram:"لا DRAM" },
    description:"قيمة رائعة مقابل المال. PCIe 4.0 بسعر PCIe 3.0 للأجهزة العادية والمتوسطة." },
  // SSD SATA
  { id:"acc-006", category:"accessories", subCategory:"SSD SATA", brand:"Samsung", name:"Samsung 870 EVO 1TB SATA", capacity:"1TB", type:"SATA SSD", speed:"560MB/s Read", interface:"SATA III", formFactor:"2.5\"", price:349, rating:4.8, reviews:2345, badge:"bestseller", icon:"📀",
    specs:{ capacity:"1TB", type:"SATA SSD 2.5\"", interface:"SATA III 6Gb/s", readSpeed:"560 MB/s", writeSpeed:"530 MB/s", formFactor:"2.5\" / 7mm", endurance:"600 TBW", dram:"DRAM Cache" },
    description:"أفضل SSD SATA في التاريخ. موثوقية قصوى وأداء ثابت للأجهزة التي لا تدعم NVMe." },
  { id:"acc-007", category:"accessories", subCategory:"SSD SATA", brand:"Crucial", name:"Crucial MX500 2TB SATA", capacity:"2TB", type:"SATA SSD", speed:"560MB/s Read", interface:"SATA III", formFactor:"2.5\"", price:499, rating:4.7, reviews:1123, badge:"popular", icon:"📀",
    specs:{ capacity:"2TB", type:"SATA SSD 2.5\"", interface:"SATA III 6Gb/s", readSpeed:"560 MB/s", writeSpeed:"510 MB/s", formFactor:"2.5\" / 7mm", endurance:"700 TBW", dram:"DRAM Cache" },
    description:"2TB SATA بسعر ممتاز. مثالي لترقية اللابتوب القديم أو تخزين إضافي للعبة." },
  // HDD
  { id:"acc-008", category:"accessories", subCategory:"HDD", brand:"Seagate", name:"Seagate Barracuda 2TB HDD", capacity:"2TB", type:"HDD 3.5\"", speed:"7200 RPM", interface:"SATA III", formFactor:"3.5\"", price:249, rating:4.3, reviews:1567, badge:"popular", icon:"🖴",
    specs:{ capacity:"2TB", type:"HDD 3.5\"", rpm:"7200 RPM", interface:"SATA III 6Gb/s", cache:"256MB", formFactor:"3.5\"", warranty:"2 سنة" },
    description:"تخزين ضخم بسعر منخفض. مثالي لتخزين الألعاب والفيديو والملفات الكبيرة بشكل موسع." },
  { id:"acc-009", category:"accessories", subCategory:"HDD", brand:"WD", name:"WD Blue 4TB HDD", capacity:"4TB", type:"HDD 3.5\"", speed:"5400 RPM", interface:"SATA III", formFactor:"3.5\"", price:349, rating:4.4, reviews:934, badge:"", icon:"🖴",
    specs:{ capacity:"4TB", type:"HDD 3.5\"", rpm:"5400 RPM", interface:"SATA III 6Gb/s", cache:"256MB", formFactor:"3.5\"", warranty:"2 سنة" },
    description:"4TB للتخزين الضخم. WD Blue الموثوق لمكتبات الألعاب والأفلام والنسخ الاحتياطي." },
  { id:"acc-010", category:"accessories", subCategory:"HDD", brand:"Seagate", name:"Seagate IronWolf 8TB NAS HDD", capacity:"8TB", type:"HDD 3.5\" NAS", speed:"7200 RPM", interface:"SATA III", formFactor:"3.5\"", price:899, rating:4.6, reviews:456, badge:"", icon:"🖴",
    specs:{ capacity:"8TB", type:"HDD 3.5\" NAS", rpm:"7200 RPM", interface:"SATA III 6Gb/s", cache:"256MB", formFactor:"3.5\"", warranty:"3 سنوات" },
    description:"مصمم للعمل المتواصل 24/7 في أنظمة NAS. موثوقية استثنائية مع ضمان 3 سنوات." },
  // PSU
  { id:"acc-011", category:"accessories", subCategory:"PSU", brand:"Corsair", name:"Corsair RM850x 850W Gold", wattage:850, efficiency:"80+ Gold", modular:"Full Modular", price:749, rating:4.8, reviews:789, badge:"bestseller", icon:"⚡",
    specs:{ wattage:"850W", efficiency:"80+ Gold", modular:"Full Modular", fanSize:"135mm Semi-passive", protection:"OVP/UVP/OCP/OTP/SCP", certification:"80 PLUS Gold", warranty:"10 سنوات" },
    description:"10 سنوات ضمان! Full Modular مع كفاءة Gold. الخيار الأمثل للبناء المتوسط والعالي." },
  { id:"acc-012", category:"accessories", subCategory:"PSU", brand:"EVGA", name:"EVGA SuperNOVA 1000W Platinum", wattage:1000, efficiency:"80+ Platinum", modular:"Full Modular", price:999, rating:4.9, reviews:456, badge:"premium", icon:"⚡",
    specs:{ wattage:"1000W", efficiency:"80+ Platinum", modular:"Full Modular", fanSize:"135mm EC Fan", protection:"OVP/UVP/OCP/OTP/SCP/OPP", certification:"80 PLUS Platinum", warranty:"10 سنوات" },
    description:"قوة 1000W بكفاءة Platinum للبنايات الضخمة مع i9 وRTX 4090. ضمان 10 سنوات." },
  { id:"acc-013", category:"accessories", subCategory:"PSU", brand:"Seasonic", name:"Seasonic Focus GX 750W Gold", wattage:750, efficiency:"80+ Gold", modular:"Full Modular", price:649, rating:4.9, reviews:623, badge:"popular", icon:"⚡",
    specs:{ wattage:"750W", efficiency:"80+ Gold", modular:"Full Modular", fanSize:"120mm Hybrid", protection:"OVP/UVP/OCP/OTP/SCP", certification:"80 PLUS Gold", warranty:"10 سنوات" },
    description:"Seasonic الشهيرة بجودتها الاستثنائية. Full Modular بوضع صامت حتى 40% حمل." },
  { id:"acc-014", category:"accessories", subCategory:"PSU", brand:"Corsair", name:"Corsair CV550 550W Bronze", wattage:550, efficiency:"80+ Bronze", modular:"Non-Modular", price:299, rating:4.3, reviews:534, badge:"", icon:"⚡",
    specs:{ wattage:"550W", efficiency:"80+ Bronze", modular:"Non-Modular", fanSize:"120mm", protection:"OVP/UVP/OCP/OTP/SCP", certification:"80 PLUS Bronze", warranty:"3 سنوات" },
    description:"الخيار الاقتصادي الموثوق للبنايات المدخلية. 550W يكفي لمعالج i5 وكرت RTX 3060." },
  { id:"acc-015", category:"accessories", subCategory:"PSU", brand:"be quiet!", name:"be quiet! Dark Power Pro 1500W Titanium", wattage:1500, efficiency:"80+ Titanium", modular:"Full Modular", price:1999, rating:4.9, reviews:178, badge:"premium", icon:"⚡",
    specs:{ wattage:"1500W", efficiency:"80+ Titanium", modular:"Full Modular", fanSize:"135mm Silent Wings", protection:"OVP/UVP/OCP/OTP/SCP/OPP", certification:"80 PLUS Titanium", warranty:"10 سنوات" },
    description:"1500W بكفاءة Titanium - أعلى كفاءة ممكنة. للبنايات الأقوى في العالم." },
  // Thermal Paste
  { id:"acc-016", category:"accessories", subCategory:"Thermal Paste", brand:"Thermal Grizzly", name:"Thermal Grizzly Kryonaut 5.5g", price:89, rating:4.9, reviews:2345, badge:"bestseller", icon:"🧴",
    specs:{ weight:"5.5g", thermalConductivity:"12.5 W/mK", viscosity:"130-170 Pas", temperature:"-250°C to +350°C" },
    description:"أفضل معجون تبريد في العالم. يقلل درجة حرارة المعالج بـ 5-10 درجات مقارنة بالمعاجين العادية." },
  { id:"acc-017", category:"accessories", subCategory:"Thermal Paste", brand:"Arctic", name:"Arctic MX-6 4g", price:45, rating:4.7, reviews:1456, badge:"popular", icon:"🧴",
    specs:{ weight:"4g", thermalConductivity:"8.2 W/mK", viscosity:"أوتوماتيك", temperature:"-40°C to +150°C" },
    description:"قيمة ممتازة مقابل المال. أداء احترافي بسعر منخفض جداً. الخيار الأول للأغلبية." },
  // Case Fans
  { id:"acc-018", category:"accessories", subCategory:"Case Fan", brand:"Noctua", name:"Noctua NF-A12x25 120mm Fan", size:"120mm", price:149, rating:4.9, reviews:1789, badge:"bestseller", icon:"🌬️",
    specs:{ size:"120mm", maxRPM:"2000 RPM", airflow:"60.1 CFM", noise:"22.6 dBa", connector:"4-pin PWM", rgb:"لا", bearing:"SSO2 Bearing" },
    description:"أفضل مروحة 120mm في العالم. أداء هوائي لا يُضاهى مع صوت شبه صامت." },
  { id:"acc-019", category:"accessories", subCategory:"Case Fan", brand:"Corsair", name:"Corsair LL120 RGB Fan 3-pack", size:"120mm", price:299, rating:4.6, reviews:892, badge:"popular", icon:"🌬️",
    specs:{ size:"120mm (3 مراوح)", maxRPM:"1500 RPM", airflow:"47.3 CFM", noise:"24.8 dBa", connector:"4-pin PWM + RGB", rgb:"Dual Light Loop RGB", bearing:"Hydraulic" },
    description:"3 مراوح LL120 بإضاءة RGB مزدوجة الحلقة. جمالية ساحرة مع أداء جيد للكيس." },

] // end accessories

}; // end PRODUCTS_DB

// ============================================================
// Helper: get all products flat
// ============================================================
function getAllProducts() {
  return Object.values(PRODUCTS_DB).flat();
}

// ============================================================
// Helper: get products by category
// ============================================================
function getByCategory(cat) {
  return PRODUCTS_DB[cat] || [];
}

// ============================================================
// Helper: get product by ID
// ============================================================
function getProductById(id) {
  return getAllProducts().find(p => p.id === id) || null;
}

// ============================================================
// Helper: load custom products from localStorage (admin edits)
// ============================================================
function loadCustomProducts() {
  try {
    const custom = JSON.parse(localStorage.getItem('pcstore_custom_products') || '{}');
    Object.keys(custom).forEach(cat => {
      if (!PRODUCTS_DB[cat]) PRODUCTS_DB[cat] = [];
      custom[cat].forEach(cp => {
        const idx = PRODUCTS_DB[cat].findIndex(p => p.id === cp.id);
        if (idx >= 0) PRODUCTS_DB[cat][idx] = cp;
        else PRODUCTS_DB[cat].push(cp);
      });
    });
    // Handle deletions
    const deleted = JSON.parse(localStorage.getItem('pcstore_deleted_ids') || '[]');
    Object.keys(PRODUCTS_DB).forEach(cat => {
      PRODUCTS_DB[cat] = PRODUCTS_DB[cat].filter(p => !deleted.includes(p.id));
    });
  } catch(e) { console.error('loadCustomProducts error:', e); }
}

loadCustomProducts();
