const fs = require('fs');
const path = require('path');
const { runExport } = require('../../brain/export-public.js');

const repoRoot = path.join(__dirname, '../..');
const siteDir = path.join(repoRoot, 'site');
const notesDir = path.join(siteDir, 'notes');
const assetsDir = path.join(siteDir, 'assets');

// Ensure output dirs exist
if (!fs.existsSync(notesDir)) {
  fs.mkdirSync(notesDir, { recursive: true });
}
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// 1. Write site/config.json if not present
const configPath = path.join(siteDir, 'config.json');
let siteConfig = { start_date: '2026-07-09', canonical_url: '' };
if (fs.existsSync(configPath)) {
  try {
    siteConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  } catch (e) {
    // Ignore and write default
  }
}
fs.writeFileSync(configPath, JSON.stringify(siteConfig, null, 2));

// Calculate Day N
function getDayNumber(startDateStr) {
  const start = new Date(startDateStr);
  const today = new Date();
  const diffTime = today - start;
  if (diffTime < 0) return 1;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
  return diffDays;
}
const dayNumber = getDayNumber(siteConfig.start_date);

// Helper to convert Markdown to clean HTML (without external heavy libraries)
function simpleMarkdownToHtml(md, domain) {
  let html = md;

  // Clean frontmatter
  html = html.replace(/^---\r?\n[\s\S]*?\r?\n---/, '');

  // Escape HTML tags to prevent XSS / formatting corruption
  html = html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Restore allowed basic tags like <!-- comment --> if any
  html = html.replace(/&lt;!--([\s\S]*?)--&gt;/g, '<!--$1-->');

  // Code blocks: ```js ... ```
  html = html.replace(/```(\w*)\r?\n([\s\S]*?)\r?\n```/g, (match, lang, code) => {
    return `<pre><code class="language-${lang}">${code.trim()}</code></pre>`;
  });

  // Blockquotes: > quote
  html = html.replace(/^\s*&gt;\s+(.*)$/gm, '<blockquote>$1</blockquote>');

  // Headers: ## Header, ### Header
  html = html.replace(/^\s*##\s+(.*)$/gm, (match, p1) => {
    const cleanId = p1.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    // Specially style "Where this could be wrong" heading
    if (p1.toLowerCase().includes('where this could be wrong') || p1.toLowerCase().includes('debated')) {
      return `<h2 id="${cleanId}" class="section-challenged">${p1}</h2>`;
    }
    return `<h2 id="${cleanId}">${p1}</h2>`;
  });
  html = html.replace(/^\s*###\s+(.*)$/gm, '<h3>$1</h3>');

  // Bold: **text**
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Italic: *text*
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Double bracket wiki-links: [[note-slug]] or [[note-slug|Display Label]]
  html = html.replace(/\[\[([a-zA-Z0-9\s-_#|]+)\]\]/g, (match, p1) => {
    const parts = p1.split('|');
    const slug = parts[0].trim().toLowerCase().replace(/\s+/g, '-');
    const label = parts[1] ? parts[1].trim() : parts[0].trim();
    return `<a class="wiki-link" href="${slug}.html">${label}</a>`;
  });

  // Standard markdown links: [label](url)
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>');

  // Lists: - bullet
  // Simple paragraph & bullet handling
  const lines = html.split(/\r?\n/);
  let inList = false;
  let finalLines = [];

  for (let line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('- ')) {
      if (!inList) {
        finalLines.push('<ul>');
        inList = true;
      }
      // Highlight Tier levels in source list
      let itemContent = trimmed.substring(2);
      if (itemContent.includes('Tier ')) {
        itemContent = itemContent.replace(/(Tier \d+)/i, '<span class="tier-tag">$1</span>');
      }
      finalLines.push(`<li>${itemContent}</li>`);
    } else {
      if (inList) {
        finalLines.push('</ul>');
        inList = false;
      }
      if (trimmed.length > 0 && !trimmed.startsWith('<h') && !trimmed.startsWith('<pre') && !trimmed.startsWith('<code') && !trimmed.startsWith('<block') && !trimmed.startsWith('&lt;!--') && !trimmed.startsWith('<!--')) {
        finalLines.push(`<p>${trimmed}</p>`);
      } else {
        finalLines.push(line);
      }
    }
  }
  if (inList) {
    finalLines.push('</ul>');
  }

  html = finalLines.join('\n');

  // Add clinician footer on health/gut/nutrition notes
  const healthDomains = ['health-core', 'gut', 'mind-gut', 'body', 'nutrition'];
  if (healthDomains.includes(domain)) {
    const footerText = 'Educational summary from cited sources — not medical advice; confirm anything you\'d act on with a qualified clinician.';
    if (!html.toLowerCase().includes('clinician')) {
      html += `\n<div class="clinician-footer">${footerText}</div>`;
    }
  }

  return html;
}

// 2. Generate CSS style sheet (assets/style.css)
const styleCss = `
:root {
  --bg-color: #0b0f12;
  --panel-bg: rgba(15, 23, 30, 0.75);
  --panel-border: rgba(42, 127, 127, 0.25);
  --accent-teal: #2a7f7f;
  --accent-bright: #3ee2e2;
  --text-main: #e2e8f0;
  --text-muted: #94a3b8;
  --text-dark: #64748b;
}

body {
  background-color: var(--bg-color);
  color: var(--text-main);
  font-family: 'Geist', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  margin: 0;
  padding: 0;
  line-height: 1.6;
}

/* Gridlines Layout */
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  background-image: 
    radial-gradient(circle at 1px 1px, rgba(42, 127, 127, 0.04) 1px, transparent 0);
  background-size: 20px 20px;
}

header {
  border-bottom: 1px solid var(--panel-border);
  padding-bottom: 20px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand {
  font-weight: 700;
  font-size: 1.2rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent-bright);
}

.day-badge {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: rgba(42, 127, 127, 0.2);
  border: 1px solid var(--accent-teal);
  padding: 4px 10px;
  border-radius: 4px;
}

nav {
  margin: 10px 0;
  display: flex;
  gap: 16px;
}

nav a {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: color 0.2s;
}

nav a:hover {
  color: var(--accent-bright);
}

h1, h2, h3 {
  letter-spacing: -0.02em;
}

h1 {
  font-size: 2rem;
  margin-bottom: 8px;
}

.metadata-row {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.tag {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: 1px solid var(--panel-border);
  padding: 2px 8px;
  border-radius: 4px;
  color: var(--text-muted);
}

p {
  margin-bottom: 20px;
  color: var(--text-main);
}

strong {
  color: #fff;
}

blockquote {
  border-left: 3px solid var(--accent-teal);
  padding-left: 16px;
  margin: 20px 0;
  color: var(--text-muted);
  font-style: italic;
}

pre {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid var(--panel-border);
  border-radius: 6px;
  padding: 16px;
  overflow-x: auto;
  margin: 24px 0;
}

code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
}

a {
  color: var(--accent-bright);
  text-decoration: none;
  transition: border-bottom 0.2s;
}

a:hover {
  text-decoration: underline;
}

a.wiki-link {
  border-bottom: 1px dashed var(--accent-teal);
}

a.wiki-link:hover {
  border-bottom-style: solid;
  text-decoration: none;
}

/* Styled "Where this could be wrong" heading */
.section-challenged {
  border-left: 3px solid #f6ad55;
  padding-left: 10px;
  color: #f6ad55;
  text-transform: uppercase;
  font-size: 1rem;
  letter-spacing: 0.05em;
  margin-top: 32px;
}

.tier-tag {
  font-size: 0.65rem;
  font-weight: 700;
  background: rgba(246, 173, 85, 0.15);
  color: #f6ad55;
  border: 1px solid rgba(246, 173, 85, 0.3);
  padding: 1px 4px;
  border-radius: 3px;
  margin-left: 6px;
}

.clinician-footer {
  margin-top: 40px;
  border-top: 1px dashed var(--panel-border);
  padding-top: 16px;
  font-size: 0.8rem;
  color: var(--text-dark);
  font-style: italic;
}

.back-btn {
  display: inline-block;
  margin-bottom: 24px;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.feed-item {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding: 16px 0;
}

.feed-item a {
  font-size: 1.1rem;
  font-weight: 600;
}

.feed-item .date {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-top: 4px;
}
`;
fs.writeFileSync(path.join(assetsDir, 'style.css'), styleCss);

// 3. Main runner
function buildSite() {
  console.log('--- Rebuilding Static Site Pages ---');
  
  // Call exporter first to verify and get files list
  const filesToExport = runExport();
  
  // HTML Template Wrapper
  function wrapHtml(title, canonicalUrl, contentHtml) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — VIZIER Living Brain</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../assets/style.css">
  ${canonicalUrl ? `<link rel="canonical" href="${canonicalUrl}">` : ''}
</head>
<body>
  <div class="container">
    <header>
      <div class="brand">VIZIER</div>
      <div class="day-badge">Day ${dayNumber} of 251</div>
    </header>
    <nav>
      <a href="../index.html">🕸️ Brain Graph</a>
      <a href="../feed.html">📜 Latest Feed</a>
      <a href="../about.html">🔍 About</a>
    </nav>
    <main style="margin-top: 20px;">
      ${contentHtml}
    </main>
  </div>
</body>
</html>`;
  }

  const feedItems = [];

  // 4. Render Note Pages & Write Raw Sanitized Markdown
  for (const file of filesToExport) {
    if (file.type === 'center') {
      // VIZIER.md center note
      fs.writeFileSync(path.join(siteDir, 'VIZIER.md'), file.content);
      continue;
    }

    const noteSlug = file.slug;
    const noteMeta = file.metadata;
    const cleanContent = file.content.replace(/^---\r?\n[\s\S]*?\r?\n---/, '').trim();
    
    // Write sanitized raw markdown for D3 sidebar previews
    fs.writeFileSync(path.join(notesDir, `${noteSlug}.md`), cleanContent);
    
    // Convert to HTML
    const noteBodyHtml = simpleMarkdownToHtml(file.content, noteMeta.domain);
    const dateStr = noteMeta.modified || new Date().toISOString();
    
    const notePageHtml = wrapHtml(
      noteMeta.title || noteSlug,
      siteConfig.canonical_url ? `${siteConfig.canonical_url}/notes/${noteSlug}.html` : '',
      `
      <a href="../index.html" class="back-btn">← Back to Graph</a>
      <article>
        <h1>${noteMeta.title || noteSlug}</h1>
        <div class="metadata-row">
          <span class="tag">Domain: ${noteMeta.domain || 'none'}</span>
          <span class="tag">Confidence: ${noteMeta.confidence || 'medium'}</span>
          <span class="tag">Class: ${noteMeta.note_type || 'note'}</span>
        </div>
        <div class="note-body">
          ${noteBodyHtml}
        </div>
      </article>
      `
    );

    fs.writeFileSync(path.join(notesDir, `${noteSlug}.html`), notePageHtml);
    
    feedItems.push({
      title: noteMeta.title || noteSlug,
      slug: noteSlug,
      domain: noteMeta.domain || 'none',
      date: new Date(dateStr)
    });
  }

  // 5. Generate Feed Page (feed.html)
  // Sort newest first
  feedItems.sort((a, b) => b.date - a.date);
  
  const feedListHtml = feedItems.map(item => `
    <div class="feed-item">
      <a href="notes/${item.slug}.html">${item.title}</a>
      <div class="metadata-row" style="margin-top: 4px; margin-bottom: 0;">
        <span class="tag">Domain: ${item.domain}</span>
      </div>
      <div class="date">Modified: ${item.date.toLocaleDateString()}</div>
    </div>
  `).join('\n');

  const feedPageHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Latest Feed — VIZIER Living Brain</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/style.css">
</head>
<body>
  <div class="container">
    <header>
      <div class="brand">VIZIER</div>
      <div class="day-badge">Day ${dayNumber} of 251</div>
    </header>
    <nav>
      <a href="index.html">🕸️ Brain Graph</a>
      <a href="feed.html">📜 Latest Feed</a>
      <a href="about.html">🔍 About</a>
    </nav>
    <main style="margin-top: 20px;">
      <h1>Latest Notes Feed</h1>
      <p style="color: var(--text-muted); margin-bottom: 30px;">Chronological index of published knowledge nodes.</p>
      <div class="feed-list">
        ${feedListHtml || '<p style="color: var(--text-dark)">No public nodes exported yet.</p>'}
      </div>
    </main>
  </div>
</body>
</html>`;
  fs.writeFileSync(path.join(siteDir, 'feed.html'), feedPageHtml);

  // 6. Generate About Page (about.html)
  const aboutPageHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>About — VIZIER Living Brain</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/style.css">
</head>
<body>
  <div class="container">
    <header>
      <div class="brand">VIZIER</div>
      <div class="day-badge">Day ${dayNumber} of 251</div>
    </header>
    <nav>
      <a href="index.html">🕸️ Brain Graph</a>
      <a href="feed.html">📜 Latest Feed</a>
      <a href="about.html">🔍 About</a>
    </nav>
    <main style="margin-top: 20px;">
      <h1>About VIZIER — A Living Brain</h1>
      
      <h2>What is this?</h2>
      <p>This is a living, public knowledge graph representing a personal knowledge repository built on top of the operational VIZIER agent loop. Over a span of 251 days, one new structured, cited, and challenged knowledge node is published here daily.</p>
      
      <h2>The Three Gates of Honesty</h2>
      <p>Every note published to this brain must pass three validation checkpoints before it is allowed to go live:</p>
      <ul>
        <li><strong>Cited</strong>: Every factual claim made must carry a direct link to primary scientific literature.</li>
        <li><strong>Tiered</strong>: All sources are transparently categorized by evidence strength (Tier 1: Systematic reviews/meta-analyses, Tier 2: Randomized controlled trials, Tier 3: Explainer portals).</li>
        <li><strong>Challenged</strong>: Every note carries a mandatory, prominent section highlighting limits, conflicting evidence, or potential ways the claims could be incorrect to prevent confirmation bias.</li>
      </ul>

      <h2>Safety & Clinical Framing</h2>
      <p>Any note touching biological systems, gut microbiome, or health domains carries a mandatory clinician disclaimer. The search engines operate under strict abstention policies, refusing to formulate responses when source abstracts are unavailable or empty.</p>
    </main>
  </div>
</body>
</html>`;
  fs.writeFileSync(path.join(siteDir, 'about.html'), aboutPageHtml);

  // 7. Adapt index.html (graph homepage visualizer)
  const viewerSrcPath = path.join(repoRoot, 'brain', 'viewer', 'index.html');
  if (fs.existsSync(viewerSrcPath)) {
    let viewerHtml = fs.readFileSync(viewerSrcPath, 'utf-8');
    
    // Replace title
    viewerHtml = viewerHtml.replace('<title>VIZIER — Brain Graph Visualizer</title>', '<title>VIZIER — A Living Brain</title>');
    
    // Replace header VIZIER title with brand + Day badge
    viewerHtml = viewerHtml.replace(
      '<h1>Vizier Brain <span>Life-OS</span></h1>',
      `<h1>Vizier Brain <span>Day ${dayNumber} of 251</span></h1>`
    );

    // Replace the d3.json source file target
    viewerHtml = viewerHtml.replace('d3.json("../brain-index.json")', 'd3.json("brain-index.public.json")');

    // Replace the preview fetch path from '../../' to relative site notes folder
    viewerHtml = viewerHtml.replace("fetch('../../' + node.path)", "fetch(node.path)");

    // Inject navigation links under header in index.html control panel
    const navInsert = `<div style="margin-bottom: 10px; display: flex; gap: 12px; font-size: 0.8rem; text-transform: uppercase;">
      <a href="feed.html" style="color: var(--accent-bright); text-decoration: none;">📜 Feed</a>
      <a href="about.html" style="color: var(--accent-bright); text-decoration: none;">🔍 About</a>
    </div>`;
    viewerHtml = viewerHtml.replace(
      '<h1>Vizier Brain <span>Day ' + dayNumber + ' of 251</span></h1>',
      '<h1>Vizier Brain <span>Day ' + dayNumber + ' of 251</span></h1>\n    ' + navInsert
    );

    // Inject "View Note Page" button inside the inspector action row
    viewerHtml = viewerHtml.replace(
      '<button class="btn-action" id="btn-copy-path">Copy Path</button>',
      '<button class="btn-action" id="btn-copy-path">Copy Path</button>\n      <button class="btn-action" id="btn-view-page" style="margin-left: 8px;">View Note Page</button>'
    );

    // Inject the view-page button event listener
    const viewBtnListener = `
    const btnView = document.getElementById("btn-view-page");
    if (btnView) {
      btnView.addEventListener("click", () => {
        if (selectedNode && selectedNode.slug) {
          window.open('notes/' + selectedNode.slug + '.html', '_blank');
        }
      });
    }
    `;
    viewerHtml = viewerHtml.replace(
      'document.getElementById("btn-copy-path").addEventListener("click", () => {',
      viewBtnListener + '\n    document.getElementById("btn-copy-path").addEventListener("click", () => {'
    );

    fs.writeFileSync(path.join(siteDir, 'index.html'), viewerHtml);
    console.log('Saved adapted index.html to site/index.html.');
  }

  console.log('--- Static Site Build Completed successfully! ---');
}

if (require.main === module) {
  buildSite();
}

module.exports = { buildSite };
