// AUTO-GENERATED report markup + scoped CSS. Tokens {{x}} are filled from District.fields.
export const CSS = `.rw-region-report{
        --bg: #FFFCF0;
        --ink: #1a3c3c;
        --mid: #2d5c5a;
        --muted: #5c7a78;
        --grid: #e8e2d0;
        --teal: #1a3c3c;
        --gold: #f5b731;
        --gold-hover: #ffc94d;
        --cream: #FFFCF0;
        --on-dark: #d1e0df;
        --squiggle: 32px 8px 28px 8px / 8px 28px 8px 32px;
        --noise: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      }.rw-region-report *{ box-sizing: border-box; margin: 0; padding: 0; }.rw-region-report{ scroll-behavior: smooth; scroll-padding-top: 80px; }.rw-region-report{ background: var(--cream); color: var(--ink); font-family: 'Rubik', system-ui, sans-serif; -webkit-font-smoothing: antialiased; line-height: 1.6; }.rw-region-report /* Hero */
      .hero{ background: linear-gradient(160deg, #2c5e5b 0%, #14302f 100%); color: var(--on-dark); padding: 88px 32px; position: relative; }.rw-region-report .hero-inner{ max-width: 1040px; margin: 0 auto; display: grid; grid-template-columns: minmax(220px, 330px) 1fr; gap: 64px; align-items: center; }.rw-region-report .hero-cover{ width: 100%; }.rw-region-report .hero-cover img{ width: 100%; height: auto; display: block; transform: rotate(-3deg); }.rw-region-report .hero-text{ text-align: left; }.rw-region-report .hero h1{ font-size: clamp(40px, 5vw, 66px); font-weight: 700; color: var(--cream); margin: 0 0 18px; line-height: 1.04; letter-spacing: -0.01em; }.rw-region-report .hero p{ font-size: 1.18rem; font-weight: 400; max-width: 480px; margin: 0; line-height: 1.5; opacity: 0.9; }
      @media (max-width: 860px) {.rw-region-report .hero{ padding: 56px 24px; }.rw-region-report .hero-inner{ grid-template-columns: 1fr; gap: 32px; justify-items: center; }.rw-region-report .hero-cover{ max-width: 240px; }.rw-region-report .hero-text{ text-align: center; }.rw-region-report .hero p{ margin: 0 auto; }
      }.rw-region-report /* Squiggle underline — subtle */
      .squiggle-under{ position: relative; display: inline-block; padding-bottom: 10px; }.rw-region-report .squiggle-under::after{
        content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 8px;
        background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 10' preserveAspectRatio='none'><path d='M 0,5 Q 25,0 50,5 T 100,5 T 150,5 T 200,5' fill='none' stroke='%23f5b731' stroke-width='2.5' stroke-linecap='round'/></svg>");
        background-repeat: no-repeat; background-size: 100% 100%;
      }.rw-region-report /* Container */
      .container{ max-width: 1080px; margin: 0 auto; padding: 0 24px; }.rw-region-report .container-narrow{ max-width: 720px; margin: 0 auto; padding: 0 24px; }.rw-region-report /* Stat cards — keep dashed (signature look) but cleaner */
      .stat-card{
        background: #ffffff;
        padding: 32px;
        border-radius: var(--squiggle);
        border: 2px dashed var(--gold);
      }.rw-region-report .stat-card .big{ font-size: 40px; font-weight: 700; color: var(--ink); line-height: 1.05; margin-bottom: 8px; letter-spacing: -0.01em; }.rw-region-report .stat-card .label{ font-weight: 600; font-size: 20px; margin-bottom: 4px; color: var(--mid); }.rw-region-report .stat-card .sub{ font-size: 14px; color: var(--muted); }.rw-region-report /* Section */
      .section{ padding: 96px 0; }.rw-region-report .theme-dark{ background: linear-gradient(160deg, #245755 0%, #122c2c 100%); color: var(--on-dark); position: relative; }.rw-region-report .theme-dark h2, .rw-region-report .theme-dark h3, .rw-region-report .theme-dark .big{ color: var(--cream); }.rw-region-report .theme-dark .section-head h2{ color: var(--cream); }.rw-region-report .theme-dark .section-head p{ color: var(--on-dark); }.rw-region-report .theme-dark .prose, .rw-region-report .theme-dark .prose p{ color: var(--on-dark); }.rw-region-report .theme-dark .prose strong{ color: var(--cream); }.rw-region-report .theme-dark .label, .rw-region-report .theme-dark .meta{ color: var(--on-dark); }.rw-region-report .theme-dark .savings{ color: var(--gold); }.rw-region-report .theme-dark .stat-card{ background: rgba(255,255,255,0.08); border-color: var(--on-dark); }.rw-region-report .theme-dark .stat-card .big{ color: var(--cream); }.rw-region-report .theme-dark .stat-card .label{ color: var(--on-dark); }.rw-region-report .theme-dark .section-tag{ color: var(--gold); }.rw-region-report .theme-yellow{ background: var(--gold); color: var(--ink); }.rw-region-report .theme-yellow .section-head h2{ color: var(--ink); }.rw-region-report .theme-yellow .section-head p{ color: var(--ink); opacity: 0.8; }.rw-region-report .theme-yellow .section-tag{ color: var(--ink); opacity: 0.7; }.rw-region-report .theme-yellow .stat-card{ background: #fff; border-color: var(--ink); }.rw-region-report .theme-yellow .impact-card{ background: #fff; border-color: var(--ink); }.rw-region-report .theme-yellow .savings{ color: var(--ink); }.rw-region-report .theme-yellow .squiggle-under::after{
        background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 14' preserveAspectRatio='none'><path d='M 0,7 Q 25,0 50,7 T 100,7 T 150,7 T 200,7' fill='none' stroke='%231a3c3c' stroke-width='3' stroke-linecap='round'/></svg>");
      }.rw-region-report .theme-green{ background: linear-gradient(160deg, #245f5d 0%, #143d3c 100%); color: var(--on-dark); position: relative; }.rw-region-report .theme-green h2, .rw-region-report .theme-green h3, .rw-region-report .theme-green .big{ color: var(--cream); }.rw-region-report .theme-green .section-head h2{ color: var(--cream); }.rw-region-report .theme-green .section-head p{ color: var(--on-dark); }.rw-region-report .theme-green .prose, .rw-region-report .theme-green .prose p{ color: var(--on-dark); }.rw-region-report .theme-green .prose strong{ color: var(--cream); }.rw-region-report .theme-green .label, .rw-region-report .theme-green .meta{ color: var(--on-dark); }.rw-region-report .theme-green .savings{ color: var(--gold); }.rw-region-report .theme-green .section-tag{ color: var(--gold); }.rw-region-report .theme-green .impact-card{ background: rgba(255,255,255,0.08); border-color: var(--on-dark); }.rw-region-report .theme-green .impact-card .big{ color: var(--cream); }.rw-region-report .theme-green .impact-card .label{ color: var(--on-dark); }.rw-region-report .theme-green .impact-card .prose, .rw-region-report .theme-green .impact-card .prose p{ color: var(--on-dark); }.rw-region-report .theme-green .tabs-header{ border-bottom-color: rgba(255,255,255,0.2); }.rw-region-report .theme-green .tab-btn{ color: var(--on-dark); }.rw-region-report .theme-green .tab-btn.active{ color: var(--cream); border-bottom-color: var(--gold); }.rw-region-report .theme-green .tabs-title{ color: var(--cream); }.rw-region-report .theme-yellow .tabs-header{ border-bottom-color: rgba(26,60,60,0.2); }.rw-region-report .theme-yellow .tab-btn{ color: var(--ink); opacity: 0.6; }.rw-region-report .theme-yellow .tab-btn.active{ color: var(--ink); opacity: 1; border-bottom-color: var(--ink); }.rw-region-report .theme-yellow .tabs-title{ color: var(--ink); }.rw-region-report .section-head{ display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 28px; text-align: center; margin-bottom: 48px; }
      @media (max-width: 780px) {.rw-region-report .section-head{ flex-direction: column; gap: 14px; } }.rw-region-report .section-head h2{ font-size: clamp(32px, 4vw, 44px); font-weight: 700; line-height: 1.1; margin-bottom: 12px; color: var(--ink); letter-spacing: -0.01em; }.rw-region-report .section-head p{ color: var(--muted); font-size: 16px; max-width: 600px; margin: 0 auto; line-height: 1.5; }.rw-region-report .section-tag{ display: inline-block; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; color: var(--mid); margin-bottom: 16px; }.rw-region-report /* Section spot illustration — borderless, .rw-region-report inline beside the heading */
      .section-illo{
        display: block;
        width: clamp(120px, 15vw, 180px);
        height: auto;
        flex-shrink: 0;
        transform: rotate(-2deg);
      }
      @media (max-width: 780px) {.rw-region-report .section-illo{ width: 132px; } }.rw-region-report /* Quick-jump nav (illustrated cards) */
      .jumpnav{ display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; max-width: 920px; margin: 4px auto 60px; }.rw-region-report .jump-card{ display: flex; flex-direction: column; align-items: center; gap: 10px; text-decoration: none; background: #ffffff; border: 2px solid var(--grid); border-radius: 18px; padding: 18px 10px; cursor: pointer; transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease, background-color .18s ease; }.rw-region-report .jump-card:hover, .rw-region-report .jump-card.is-active{ transform: translateY(-3px); box-shadow: 0 10px 22px rgba(0,0,0,0.10); border-color: var(--gold); }.rw-region-report .jump-card.is-active{ background: #fbf3d6; }.rw-region-report .jump-card:focus-visible{ outline: 2px solid var(--gold); outline-offset: 2px; }.rw-region-report .jump-card img{ width: 64px; height: 64px; object-fit: contain; }.rw-region-report .jump-card span{ font-size: 13px; font-weight: 600; color: var(--ink); text-align: center; line-height: 1.25; }
      @media (max-width: 720px) {.rw-region-report .jumpnav{ grid-template-columns: repeat(2, 1fr); gap: 12px; } }.rw-region-report /* Scroll-reveal — subtle fade + rise, .rw-region-report applied via JS, .rw-region-report disabled under reduced-motion */
      .reveal{ opacity: 0; transform: translateY(22px); transition: opacity .6s ease-out, transform .6s ease-out; }.rw-region-report .reveal.in{ opacity: 1; transform: none; }.rw-region-report /* Two-col */
      .two-col{ display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: stretch; }.rw-region-report .two-col > .savings-box{ align-self: center; }
      @media (max-width: 768px) {.rw-region-report .two-col{ grid-template-columns: 1fr; gap: 32px; } }.rw-region-report /* Prose */
      .prose{ font-size: 16px; line-height: 1.65; color: var(--mid); }.rw-region-report .prose p{ margin-bottom: 16px; }.rw-region-report .prose p:last-child{ margin-bottom: 0; }.rw-region-report .prose strong{ color: var(--ink); font-weight: 600; }.rw-region-report /* Machine sections */
      .savings{ font-size: 56px; font-weight: 700; color: var(--ink); line-height: 1; margin: 12px 0 8px; letter-spacing: -0.02em; }.rw-region-report .meta{ font-size: 14px; color: var(--muted); margin-bottom: 12px; line-height: 1.4; }.rw-region-report .meta span{ display: inline-flex; align-items: center; margin-right: 16px; }.rw-region-report /* Headline stats — each in its own white card (the most important numbers) */
      .savings-box{ display: flex; flex-wrap: wrap; gap: 20px; max-width: 100%; align-items: stretch; }.rw-region-report .savings-stat{
        flex: 1 1 200px;
        background: #ffffff;
        border: 2px dashed var(--gold);
        border-radius: var(--squiggle);
        padding: 28px 30px;
        display: flex; flex-direction: column; justify-content: center;
      }.rw-region-report .savings-stat .stat-num{ font-size: clamp(34px, 3.6vw, 48px); font-weight: 700; line-height: 1.02; letter-spacing: -0.015em; margin-bottom: 8px; }.rw-region-report .savings-stat .stat-word{ font-weight: 700; }.rw-region-report .savings-stat .meta{ margin: 0; font-size: 15px; color: var(--muted); }.rw-region-report .num-save{ color: #27ae60; }.rw-region-report .num-fossil{ color: #c0392b; }.rw-region-report .theme-yellow .savings-stat{ border-color: var(--ink); }
      @media (max-width: 780px) {.rw-region-report .savings-stat{ padding: 22px 24px; }.rw-region-report .savings-stat .stat-num{ font-size: clamp(30px, 9vw, 40px); } }.rw-region-report /* Chart card — clean */
      .chart-wrap{
        background: #ffffff;
        border-radius: 16px;
        padding: 32px;
        border: 1px solid var(--grid);
      }.rw-region-report .chart-scroll{ width: 100%; overflow-x: auto; overflow-y: hidden; -webkit-overflow-scrolling: touch; touch-action: auto; }.rw-region-report .chart-inner{ min-width: 500px; height: 480px; }.rw-region-report .chart-title{ font-size: 22px; font-weight: 700; margin-bottom: 4px; color: var(--ink); letter-spacing: -0.01em; }.rw-region-report .chart-sub{ font-size: 13px; color: var(--muted); margin-bottom: 16px; }.rw-region-report .legend{ display: flex; flex-wrap: wrap; gap: 10px 20px; margin: 0 0 20px; font-size: 13px; color: var(--ink); }.rw-region-report .legend-item{ display: flex; align-items: center; gap: 8px; cursor: pointer; user-select: none; padding: 4px 0; }.rw-region-report .legend-item[data-dim="true"]{ opacity: 0.35; }.rw-region-report .swatch{ width: 12px; height: 12px; border-radius: 3px; flex-shrink: 0; }.rw-region-report .recharts-cartesian-axis-tick-value{ font-family: 'Rubik', sans-serif; font-size: 12px; }.rw-region-report /* Impact cards — keep dashed (matches stat cards) */
      .impact-card{
        background: #ffffff;
        border-radius: var(--squiggle);
        border: 2px dashed var(--gold);
        padding: 32px;
        text-align: center;
      }.rw-region-report .impact-card .big{ font-size: 40px; font-weight: 700; color: var(--ink); line-height: 1.05; margin-bottom: 8px; letter-spacing: -0.01em; }.rw-region-report .impact-card .label{ font-weight: 600; color: var(--mid); font-size: 20px; }.rw-region-report /* Buttons */
      .btn{
        display: inline-flex; align-items: center; gap: 8px;
        padding: 16px 32px; border-radius: 100px;
        border: 2px solid var(--ink); text-decoration: none;
        font-weight: 600; font-size: 16px; cursor: pointer;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        font-family: 'Rubik', sans-serif;
      }.rw-region-report .btn:hover{ transform: translateY(-2px); box-shadow: 0 8px 18px rgba(0,0,0,0.12); }.rw-region-report .btn-yellow{ background: var(--gold); border-color: var(--gold); color: var(--ink); }.rw-region-report /* Footer */
      .footer{ background: linear-gradient(160deg, #1f4d4b 0%, #122c2c 100%); color: var(--on-dark); padding: 48px 32px; text-align: center; font-size: 14px; position: relative; }.rw-region-report /* Noise texture over the dark gradient sections */
      .hero::after, .rw-region-report .theme-dark::after, .rw-region-report .theme-green::after, .rw-region-report .footer::after{
        content: ""; position: absolute; inset: 0; pointer-events: none;
        background-image: var(--noise); background-size: 180px 180px;
        opacity: 0.20; z-index: 0;
      }.rw-region-report .hero > *, .rw-region-report .theme-dark > *, .rw-region-report .theme-green > *, .rw-region-report .footer > *{ position: relative; z-index: 1; }.rw-region-report .footer a{ color: var(--cream); font-weight: 600; text-decoration: underline; }.rw-region-report .footer a:hover{ color: var(--gold); }.rw-region-report /* Tabs — clean */
      .tabs-title{ font-size: 22px; font-weight: 700; margin-bottom: 20px; color: var(--ink); letter-spacing: -0.01em; }.rw-region-report .tabs-header{ display: flex; gap: 4px; margin-bottom: 0; border-bottom: 1px solid var(--grid); }.rw-region-report .tab-btn{
        padding: 14px 24px; font-family: 'Rubik', sans-serif; font-size: 14px; font-weight: 600;
        background: none; border: none; border-bottom: 2px solid transparent;
        margin-bottom: -1px; cursor: pointer; color: var(--muted);
        transition: color 180ms ease, border-color 180ms ease;
        min-height: 44px;
      }.rw-region-report .tab-btn:hover{ color: var(--ink); }.rw-region-report .tab-btn.active{ color: var(--ink); border-bottom-color: var(--gold); }.rw-region-report .tab-btn:focus-visible{ outline: 2px solid var(--gold); outline-offset: 2px; border-radius: 4px; }.rw-region-report .tab-panel{ display: none; }.rw-region-report .tab-panel.active{ display: block; }.rw-region-report .tabs-card{
        background: #ffffff;
        border-radius: 0 16px 16px 16px;
        border: 1px solid var(--grid);
        border-top: none;
        padding: 32px;
      }.rw-region-report .horiz-chart-inner{ min-width: 400px; }.rw-region-report .legend-item:focus-visible{ outline: 2px solid var(--gold); outline-offset: 2px; border-radius: 4px; }.rw-region-report /* Local story card — collection-list item design */
      .story-card{
        display: grid;
        grid-template-columns: 320px 1fr;
        gap: 28px;
        background: #ffffff;
        border: 3px solid var(--ink);
        border-radius: var(--squiggle);
        padding: 22px;
        align-items: stretch;
      }.rw-region-report .story-photo{
        border: 3px solid var(--ink);
        border-radius: 28px 8px 24px 8px / 8px 24px 8px 28px;
        overflow: hidden;
        min-height: 300px;
        background: #c9bfa6;
      }.rw-region-report .story-photo img{ width: 100%; height: 100%; object-fit: cover; display: block; }.rw-region-report .story-photo-ph{
        width: 100%; height: 100%; min-height: 300px;
        display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px;
        background: linear-gradient(135deg, #2d5c5a, #1a3c3c);
        color: rgba(255,255,255,0.75); font-size: 12px; font-weight: 600;
        letter-spacing: 0.12em; text-transform: uppercase;
      }.rw-region-report .story-body{ padding: 8px 8px 8px 0; }.rw-region-report .story-title{
        font-family: 'Permanent Marker', cursive; font-weight: 400;
        font-size: clamp(24px, 2.4vw, 32px); line-height: 1.1; color: var(--ink);
        text-transform: uppercase; margin-bottom: 6px; letter-spacing: 0.01em;
      }.rw-region-report .story-meta{ font-size: 16px; color: var(--ink); opacity: 0.85; margin-bottom: 14px; }.rw-region-report .story-bills{ font-size: 16px; color: var(--ink); margin-bottom: 4px; }.rw-region-report .story-bills div{ margin-bottom: 2px; }.rw-region-report .story-bills strong{ font-weight: 700; }.rw-region-report .story-saved{ font-weight: 700; font-size: 15px; color: var(--ink); margin-bottom: 16px; }.rw-region-report .story-quote{ font-size: 16px; line-height: 1.6; color: var(--ink); margin-bottom: 8px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }.rw-region-report .story-card.expanded .story-quote{ -webkit-line-clamp: unset; }.rw-region-report .story-readmore{ background: none; border: none; padding: 0; margin: 0 0 18px; font-family: 'Rubik', sans-serif; font-weight: 700; font-size: 14px; color: var(--ink); cursor: pointer; text-decoration: underline; text-underline-offset: 3px; }.rw-region-report .story-readmore:hover{ color: var(--mid); }.rw-region-report .story-tags{ display: flex; flex-wrap: wrap; gap: 10px 20px; }.rw-region-report .story-tag{ display: inline-flex; align-items: center; gap: 8px; font-weight: 600; font-size: 15px; color: var(--ink); }.rw-region-report .story-check{
        width: 20px; height: 20px; border-radius: 5px; background: #3da93d;
        display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0;
      }.rw-region-report .story-check::after{
        content: ""; width: 5px; height: 10px; margin-top: -2px;
        border: solid #fff; border-width: 0 2.5px 2.5px 0; transform: rotate(45deg);
      }.rw-region-report /* Download report */
      .download-card{
        text-align: center;
        background: #ffffff;
        border: 2px dashed var(--gold);
        border-radius: var(--squiggle);
        padding: 52px 40px;
      }.rw-region-report .download-title{ font-size: clamp(26px, 3vw, 36px); font-weight: 700; color: var(--ink); margin-bottom: 12px; letter-spacing: -0.01em; }.rw-region-report .download-sub{ color: var(--muted); font-size: 16px; max-width: 540px; margin: 0 auto 28px; line-height: 1.55; }.rw-region-report .download-btn svg{ width: 18px; height: 18px; }

      @media (prefers-reduced-motion: reduce) {.rw-region-report *{ transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; scroll-behavior: auto !important; }.rw-region-report .reveal{ opacity: 1 !important; transform: none !important; }
      }

      @media print {.rw-region-report .download-section, .rw-region-report .hero-img{ display: none !important; }
      }

      @media (max-width: 780px) {.rw-region-report .tab-btn{ padding: 12px 16px; font-size: 13px; }.rw-region-report .hero{ padding: 64px 20px 56px; }.rw-region-report .stat-card{ padding: 24px; }.rw-region-report .stat-card .big{ font-size: 32px; }.rw-region-report .impact-card{ padding: 24px; }.rw-region-report .impact-card .big{ font-size: 32px; }.rw-region-report .savings{ font-size: 44px; }.rw-region-report .section{ padding: 56px 0; }.rw-region-report .chart-inner{ height: 400px; min-width: 560px; }.rw-region-report .chart-wrap{ padding: 20px; }.rw-region-report .tabs-card{ padding: 20px; }.rw-region-report .story-card{ grid-template-columns: 1fr; gap: 18px; }.rw-region-report .story-photo, .rw-region-report .story-photo-ph{ min-height: 240px; }.rw-region-report .story-body{ padding: 0; }
      }.rw-region-report /* Download grid (two boxes) */
      .download-grid{ display: grid; grid-template-columns: 1fr 1fr; gap: 24px; max-width: 960px; margin: 0 auto; align-items: stretch; }.rw-region-report .download-grid .download-card{ height: 100%; }
      @media (max-width: 760px) {.rw-region-report .download-grid{ grid-template-columns: 1fr; } }.rw-region-report /* Back to top */
      .backtotop{ position: fixed; right: 22px; bottom: 22px; z-index: 60; width: 48px; height: 48px; border-radius: 50%; border: none; background: #234e4c; color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; opacity: 0; visibility: hidden; transform: translateY(10px); transition: opacity .25s ease, transform .25s ease, visibility .25s; box-shadow: 0 6px 18px rgba(0,0,0,0.22); }.rw-region-report .backtotop.show{ opacity: 1; visibility: visible; transform: translateY(0); }.rw-region-report .backtotop:hover{ background: #2d5c5a; }.rw-region-report .backtotop svg{ width: 22px; height: 22px; }
      @media print {.rw-region-report .backtotop{ display: none !important; } }.rw-region-report /* Headline stats band */
      .headline-stats{ display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; margin: 8px 0 40px; }.rw-region-report .hl-card{ background: #fff; border: 2px dashed var(--gold); border-radius: var(--squiggle); padding: 28px 22px; text-align: center; }.rw-region-report .hl-num{ font-size: clamp(30px, 3.4vw, 46px); font-weight: 700; line-height: 1.02; letter-spacing: -0.015em; margin-bottom: 8px; }.rw-region-report .hl-green{ color: #27ae60; }.rw-region-report .hl-teal{ color: #234e4c; }.rw-region-report .hl-label{ font-size: 14px; color: var(--mid); font-weight: 500; line-height: 1.3; }
      @media (max-width: 860px) {.rw-region-report .headline-stats{ grid-template-columns: repeat(2, 1fr); } }
      @media (max-width: 460px) {.rw-region-report .headline-stats{ grid-template-columns: 1fr; } }.rw-region-report /* Cumulative savings block */
      .cumulative-block{ text-align: center; margin: 0 auto 44px; max-width: 900px; }.rw-region-report .cumulative-title{ font-size: clamp(21px, 2.5vw, 30px); font-weight: 700; line-height: 1.25; margin-bottom: 22px; color: var(--ink); }.rw-region-report .cumulative-ph{ min-height: 240px; border: 2px dashed var(--mid); border-radius: 16px; display: flex; align-items: center; justify-content: center; color: var(--muted); font-size: 15px; background: rgba(0,0,0,0.02); padding: 20px; }
    
.rw-region-report .section-head[id]{scroll-margin-top:90px;}
.rw-region-report .hero-inner--solo{grid-template-columns:1fr;justify-items:center;text-align:center;}.rw-region-report .hero-inner--solo .hero-text{text-align:center;}.rw-region-report .hero-sub{font-size:1.05rem;opacity:.85;margin-top:6px;}`;

export const TEMPLATE = `<div class="hero">
      <div class="hero-inner hero-inner--solo">
        <div class="hero-text">
          <h1><span class="squiggle-under">Electrifying {{location}}</span></h1>
          <p class="hero-sub">A pathway to savings for households, economic growth for the community, reduced emissions and greater resilience.</p>
        </div>
      </div>
    </div>

    <!-- Economics -->
    <div class="section">
      <div class="container">
        <div class="prose" style="max-width:780px; margin: 0 auto 32px; text-align:center;">
          <p>{{location}} has <strong>crossed the electrification tipping point</strong> where homes can save money and reduce their emissions by going electric. The technology is proven, the economics stack up, and the transition is already underway. But there are still plenty of households paying more than they need to by running on fossil fuels.</p>
        </div>
        <div class="headline-stats">
          <div class="hl-card"><div class="hl-num hl-green">{{elec_savings_annual}}</div><div class="hl-label">saved across the region every year</div></div>
          <div class="hl-card"><div class="hl-num hl-teal">{{co2e_annual}}</div><div class="hl-label">tonnes of CO₂e avoided every year</div></div>
          <div class="hl-card"><div class="hl-num hl-teal">{{jobs_created}}</div><div class="hl-label">new local jobs created</div></div>
          <div class="hl-card"><div class="hl-num hl-green">{{bill_savings}}</div><div class="hl-label">saved per household, every year</div></div>
        </div>
        <div class="cumulative-block">
          <h2 class="cumulative-title"><span class="squiggle-under">{{location}} homes could cumulatively save {{cumulative_savings}} between 2026 and 2040</span></h2>
          <div id="cumulative-chart" class="cumulative-ph"><span>Cumulative savings graph — awaiting the year-by-year data</span></div>
        </div>
        <nav class="jumpnav" aria-label="Jump to a section">
          <a class="jump-card" href="#bills"><img src="https://rewiring-region-reports.pages.dev/electrifying-dunedin-images/bills.png" alt="" /><span>Bills</span></a>
          <a class="jump-card" href="#solar"><img src="https://rewiring-region-reports.pages.dev/electrifying-dunedin-images/solar-battery.png" alt="" /><span>Solar &amp; batteries</span></a>
          <a class="jump-card" href="#ev"><img src="https://rewiring-region-reports.pages.dev/electrifying-dunedin-images/ev-section.png" alt="" /><span>Electric vehicle</span></a>
          <a class="jump-card" href="#heat-pump"><img src="https://rewiring-region-reports.pages.dev/electrifying-dunedin-images/heat-pump.png" alt="" /><span>Heat pump</span></a>
          <a class="jump-card" href="#hot-water"><img src="https://rewiring-region-reports.pages.dev/electrifying-dunedin-images/hot-water.png" alt="" /><span>Hot water</span></a>
          <a class="jump-card" href="#induction"><img src="https://rewiring-region-reports.pages.dev/electrifying-dunedin-images/induction.png" alt="" /><span>Induction</span></a>
        </nav>
      </div>
    </div>

    <!-- ═══ PAGE 2: Bills + Solar ═══ -->
    <div class="section">
      <div class="container">
        <div class="section-head" id="bills">
          <img class="section-illo" src="https://rewiring-region-reports.pages.dev/electrifying-dunedin-images/bills.png" alt="Illustration of a power bill with a falling-cost arrow" />
          <h2><span class="squiggle-under">Bills</span></h2>
        </div>
        <div class="two-col" style="margin-bottom:32px;">
          <div class="stat-card">
            <div class="big" style="color:#c0392b;">{{bill_fossil}} annual bill</div>
            <div class="label">for a fossil fuel home</div>
            <div class="prose" style="margin-top:12px; text-align:left;">
              <p>For an average {{location}} home (using gas for cooking and heating, driving two petrol vehicles), energy spending is <strong>spread across multiple fuels</strong>, each with its own bill, its own price fluctuations, and its own supplier.</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="big" style="color:#27ae60;">{{bill_electric}} annual bill</div>
            <div class="label">for an electric home</div>
            <div class="prose" style="margin-top:12px; text-align:left;">
              <p>When a {{location}} home electrifies (using electric heating and cooking, driving two EVs, plus solar and batteries), they consolidate their energy into a single source &mdash; electricity &mdash; meaning <strong>lower bills and far greater control</strong>.</p>
            </div>
          </div>
        </div>
        <div id="bill-chart"></div>
      </div>
    </div>

    <!-- Solar & Batteries -->
    <div class="section theme-yellow">
      <div class="container">
        <div class="section-head" id="solar">
          <img class="section-illo" src="https://rewiring-region-reports.pages.dev/electrifying-dunedin-images/solar-battery.png" alt="Illustration of a solar panel and home battery" />
          <h2><span class="squiggle-under">Solar and batteries</span></h2>
        </div>
        <div class="two-col" style="margin-bottom:32px;">
          <div class="savings-box">
            <div class="savings-stat">
              <div class="stat-num num-save">{{solar_net_savings}} <span class="stat-word">savings</span></div>
              <div class="meta">net, over the panel lifetime</div>
            </div>
            <div class="savings-stat">
              <div class="stat-num num-save">{{solar_panel_life}} <span class="stat-word">years</span></div>
              <div class="meta">panel lifetime &amp; warranty</div>
            </div>
          </div>
          <div class="prose">
            <p>Solar offers strong payback for {{location}} homes, even in shaded areas, while improving energy independence. By pairing an {{solar_cost}} {{solar_size}} rooftop solar installation with a {{battery_cost}} {{battery_size}} home battery system, a {{location}} home will <strong>save {{solar_battery_15yr_savings}} on bills over 15 years</strong>.</p>
            <p>With a mix of solar, battery, and grid electricity &mdash; financed at {{solar_finance_rate}} &mdash; the household is paying the <strong>equivalent electricity price of {{solar_effective_rate}}</strong>, compared to the average grid rate of <strong>around {{grid_rate}}</strong>. Solar panels are expected to <strong>last {{solar_panel_life}} years</strong>, with warranties of a similar length, meaning the system well outlasts any loan used to finance it. And a battery adds resilience, <strong>keeping essential appliances running during outages</strong>.</p>
          </div>
        </div>
        <div id="solar-tabs"></div>
      </div>
    </div>

    <!-- ═══ PAGE 3: EV + Heat Pump ═══ -->

    <!-- Electric Vehicle -->
    <div class="section theme-green">
      <div class="container">
        <div class="section-head" id="ev">
          <img class="section-illo" src="https://rewiring-region-reports.pages.dev/electrifying-dunedin-images/ev-section.png" alt="Illustration of an electric car on charge" />
          <h2><span class="squiggle-under">Electric vehicle</span></h2>
        </div>
        <div class="two-col" style="margin-bottom:32px;">
          <div class="savings-box">
            <div class="savings-stat">
              <div class="stat-num num-save">{{ev_net_savings}} <span class="stat-word">savings</span></div>
              <div class="meta">net, 15 years</div>
            </div>
            <div class="savings-stat">
              <div class="stat-num num-fossil">{{cars_fossil}}</div>
              <div class="meta">fossil fuel cars</div>
            </div>
          </div>
          <div class="prose">
            <p>EVs are <strong>far cheaper to run</strong>, require little maintenance and aren't exposed to volatile global fuel prices. Plus they're quiet, comfortable and fun to drive! Switching from a petrol to an electric medium SUV <strong>saves {{ev_suv_savings}} on bills over 15 years</strong>, or around {{ev_annual_savings}} every year, including road user charges. Diesel ute drivers save even more at <strong>{{ev_ute_savings}} net over 15 years</strong>.</p>
            <p>{{location}} drivers cover an average of <strong>{{driving_weekly_km}} per week</strong>: well within the range of a modern EV. And charging is easy. 80% of EV owners do more than half their charging at home. 60% trickle charge using a standard three-pin plug. Charging at home using grid electricity costs <strong>effectively half what you'd spend on petrol or diesel</strong>, and for those with rooftop solar, the savings are even greater. And for when you do need to charge on the go, public chargers are available at least every 75km on 97% of New Zealand highways.</p>
          </div>
        </div>
        <div id="ev-tabs"></div>
      </div>
    </div>

    <!-- Heat Pump -->
    <div class="section">
      <div class="container">
        <div class="section-head" id="heat-pump">
          <img class="section-illo" src="https://rewiring-region-reports.pages.dev/electrifying-dunedin-images/heat-pump.png" alt="Illustration of a wall-mounted heat pump" />
          <h2><span class="squiggle-under">Heat pump</span></h2>
        </div>
        <div class="two-col" style="margin-bottom:32px;">
          <div class="savings-box">
            <div class="savings-stat">
              <div class="stat-num num-save">{{heatpump_lifetime_savings}} <span class="stat-word">savings</span></div>
              <div class="meta">lifetime (LPG fire)</div>
            </div>
            <div class="savings-stat">
              <div class="stat-num num-fossil">{{heaters_fossil}}</div>
              <div class="meta">fossil fuel heaters</div>
            </div>
          </div>
          <div class="prose">
            <p>Heat pumps use around <strong>{{heatpump_energy_pct}} less energy</strong> than gas heaters to deliver the same warmth, and, unlike gas, they cool in summer too. Switching from an LPG fire to a heat pump <strong>saves {{heatpump_15yr_savings}} on bills over 15 years</strong> and {{heatpump_lifetime_savings}} over the lifetime including upfront costs, or around {{heatpump_annual_savings}} every year. Of {{location}}'s {{heaters_fossil}} non-electric heaters, approximately {{heaters_lpg}} are LPG. Whatever the fuel type, going electric brings significant savings, and the comfort upgrade is immediate.</p>
          </div>
        </div>
        <div id="heating-tabs"></div>
      </div>
    </div>

    <!-- ═══ PAGE 4: Hot Water + Induction ═══ -->

    <!-- Hot Water Heat Pump -->
    <div class="section theme-green">
      <div class="container">
        <div class="section-head" id="hot-water">
          <img class="section-illo" src="https://rewiring-region-reports.pages.dev/electrifying-dunedin-images/hot-water.png" alt="Illustration of a hot water heat pump cylinder" />
          <h2><span class="squiggle-under">Hot water heat pump</span></h2>
        </div>
        <div class="two-col" style="margin-bottom:32px;">
          <div class="savings-box">
            <div class="savings-stat">
              <div class="stat-num num-save">{{water_15yr_savings}} <span class="stat-word">savings</span></div>
              <div class="meta">bill, 15 years (LPG instant)</div>
            </div>
            <div class="savings-stat">
              <div class="stat-num num-fossil">{{water_heaters_fossil}}</div>
              <div class="meta">fossil fuel water heaters</div>
            </div>
          </div>
          <div class="prose">
            <p>Hot water heat pumps have a higher upfront cost, but <strong>deliver the lowest ongoing energy bills</strong> of any water heating option. In {{location}}, switching from LPG instant to a hot water heat pump <strong>saves {{water_15yr_savings}} on bills over 15 years</strong>, or {{water_lifetime_savings}} over the lifetime including upfront costs. Of {{location}}'s {{water_heaters_fossil}} non-electric water heaters, approximately {{water_heaters_lpg}} are LPG instant.</p>
            <p>Water heating makes up around <strong>{{water_energy_pct}} of an average home's energy load</strong> &mdash; making it one of the highest-impact switches a household can make. Hot water heat pumps can also act as a 'thermal battery' where you time it to heat water when electricity is cheapest, or when your solar panels are generating.</p>
          </div>
        </div>
        <div id="water-tabs"></div>
      </div>
    </div>

    <!-- Induction Cooktop -->
    <div class="section">
      <div class="container">
        <div class="section-head" id="induction">
          <img class="section-illo" src="https://rewiring-region-reports.pages.dev/electrifying-dunedin-images/induction.png" alt="Illustration of an induction cooktop with a pot" />
          <h2><span class="squiggle-under">Induction cooktop</span></h2>
        </div>
        <div class="two-col" style="margin-bottom:32px;">
          <div class="savings-box">
            <div class="savings-stat">
              <div class="stat-num num-save">{{cooktop_savings}} <span class="stat-word">savings</span></div>
              <div class="meta">net, 15 years (LPG)</div>
            </div>
            <div class="savings-stat">
              <div class="stat-num num-fossil">{{cooktops_gas}}</div>
              <div class="meta">fossil fuel cooktops</div>
            </div>
          </div>
          <div class="prose">
            <p>Cooking doesn't use a lot of energy but electric cooking is <strong>lower cost (and much lower emissions)</strong> than cooking with gas. Induction is more expensive upfront than resistive electric cooking, but offers lower ongoing bills. Switching from LPG to induction <strong>saves {{cooktop_savings}} on bills over 15 years</strong>.</p>
            <p>But the most compelling case for induction might be <strong>health</strong>. Gas cooking releases nitrogen dioxide and other pollutants into the home, linked nationally to <strong>200+ premature deaths, 3,200+ child asthma cases, and $3.3 billion</strong> in productivity and health costs every year.</p>
          </div>
        </div>
        <div id="cooktop-tabs"></div>
      </div>
    </div>

    `;
