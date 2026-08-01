# Sesterce — site vitrine

Site statique (HTML/CSS/JS, sans framework ni build step) pour maximiser le
crawl par les moteurs de recherche et les IA : tout le contenu est présent
directement dans le HTML au chargement, sans hydratation côté client.

## Structure

```
index.html      Page unique, sémantique, avec métadonnées SEO/OG et JSON-LD
styles.css       Design system (tokens couleur/typo) + composants
script.js        Progressive enhancement (menu mobile, pause d'animation)
sitemap.xml
robots.txt
assets/
  logo-sesterce.png
  bg-hero-salle.jpg        Fond du hero (salle de spectacle)
  bg-festival-concert.jpg  Fond de la section festival
  bg-theatre-facade.jpg    Fond de la bande stats/confiance
```

## Déploiement

Aucune étape de build. Peut être servi tel quel par n'importe quel hébergeur
statique (Vercel, Netlify, Cloudflare Pages, GitHub Pages, OVH...).

Avant mise en prod, penser à :
- Mettre à jour `https://www.sesterce.biz/` dans `index.html` (canonical, OG),
  `sitemap.xml` et `robots.txt` si le domaine final diffère.
- Ajouter les vraies pages "Mentions légales" (le lien pointe actuellement
  vers l'ancre `#top` en attendant le contenu).

## Notes de design

- **Palette** : cyan de marque (`--cyan`, dérivé du logo) + bronze (`--bronze`)
  évoquant la monnaie romaine "sesterce", sur un fond papier billet (`--paper`).
- **Typo** : Fraunces (display, empattements marqués) / Inter (texte courant) /
  IBM Plex Mono (labels, stats, codes — registre "billet/ticket").
- **Signature** : la carte animée du hero bascule entre un "Billet" (cyan,
  offre culturelle actuelle) et un "Jeton" (bronze, monnaie de festival à
  venir) — elle incarne littéralement l'extension du produit annoncée dans
  la section Festivals.
- Les séparateurs perforés entre sections reprennent le motif du ticket
  déchiré (cohérent avec le sujet : billetterie + monnaie).

## Section "Festivals"

Présentée comme un système disponible, au même titre que les cartes
culturelles (pas de mention "en développement" côté contenu public).
