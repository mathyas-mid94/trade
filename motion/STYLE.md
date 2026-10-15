# Charte motion design

Référence unique pour toutes les vidéos (intros, pubs, explications) :
**« How The Economic Machine Works » de Ray Dalio** — propre, clean, très animé.

## Identité MIC (prioritaire sur les couleurs de l'original Dalio)
Logo et palette de référence : `brand/mic-logo-reference.png`, `brand/mic-palette-reference.webp`.

| Rôle | Nom | Hex |
|---|---|---|
| Fond | paper | `#FBF7EC` |
| Fond secondaire, remplissages clairs | paperDeep | `#F0E8D2` |
| Trait, texte, logo | ink (teal) | `#234E48` |
| Argent, aplats foncés | inkSoft | `#3F6F68` |
| Gilets, flèches d'échange, mise en avant | accent | `#CAA97A` |
| Cartons, détails clairs | accentSoft | `#ECE0C5` |

- Aucune couleur hors palette (pas de vert fluo, pas de rouge vif).
- Typo : Cormorant Garamond (logo, titres), Inter en capitales espacées (sous-titres, slogans).
- Logo : double cercle teal (épais + fin), « MIC » en serif, filet dessous. Version vectorielle animable : `D.micLogo()`.

## Règles visuelles (style Dalio)
- Fond papier uni avec un léger grain. Pas de dégradé, pas de photo.
- Trait net, arrondi, épaisseur régulière, couleur ink.
- Objets **remplis** et cernés — pas juste des contours.
- Personnages : jambes très longues et fines, gilet en œuf avec col en V et deux boutons,
  tête ovale claire, cheveux, un trait pour l'œil, bras fins et souples.
- Échanges représentés par des flèches en ressort.

## Règles d'animation
- Rien n'est statique : apparitions en « pop » avec rebond, objets qui volent en arc, boucles qui tournent.
- Les traits se dessinent ; le texte arrive lettre par lettre.
- Caméra vivante : poussées lentes, grands reculs qui révèlent le système entier.
- Transitions par objet : un élément fonce vers la caméra ou se transforme en élément du plan suivant.
- Une idée par plan.

## Pipeline
- `lib/dalio.js` : briques réutilisables (personnage, billets, carton, flèche ressort, tracé progressif, grain).
- Chaque animation est une page HTML/SVG qui expose `window.render(t)` et `window.DURATION`.
- `node motion/render.mjs <page.html> <sortie.mp4> [fps]` capture chaque image avec Chromium puis encode en MP4.
