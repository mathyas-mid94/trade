# Charte motion design

Référence unique pour toutes les vidéos (intros, pubs, explications) :
**le style de « How The Economic Machine Works » de Ray Dalio.**

## Règles
- Fond crème uni (`#FAF8F3`), jamais de dégradé ni de photo en fond.
- Trait noir (`#1D1D1D`) épais et arrondi, légèrement irrégulier, comme dessiné au feutre.
- Les éléments se **dessinent** à l'écran (trait qui se trace), ils n'apparaissent pas d'un coup.
- Personnages en bonhommes simples : tête ronde, deux points pour les yeux, corps en traits.
- Couleur rare et porteuse de sens : vert `#2E9E5B` (hausse), rouge `#D94A3D` (baisse), bleu `#3A7BD5` (mise en avant).
- Texte en police manuscrite (Patrick Hand), révélé comme s'il était écrit.
- Mouvements de caméra doux (zoom/pan avec easing), transitions par zoom dans un élément de la scène.
- Une idée par plan, beaucoup de blanc.

## Pipeline
Chaque animation est une page HTML/SVG qui expose `window.render(t)` et `window.DURATION`.
`node motion/render.mjs <page.html> <sortie.mp4> [fps]` capture chaque image avec Chromium puis encode en MP4 (ffmpeg).
