**Questa é una Web App creata come progetto per il completamento del Corso _React.js_ di _Start2Impact_**.

## Progetto:

<div align="center">
  <h2>Progetto Finale Front-End / LifeStyle</h2>
</div>

<hr>
<hr>

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## To Do

Inizio:

- [ ] Configurare Route
- [ ] i18?
- [ ]

ToDo:

- [ ] sistemare showPicker (basta try catch per eliminare eventuali saltuari errori)

<hr>
<hr>

<div align="center">
<h1><i>World Carbon Monoxide Detector</i></h1>
</div>

**Web App created as final project for the Start2Impact Front-End Development path.**

## Project

<div align="center">
  <h2>Front-End / Air Quality / Data Visualization</h2>
</div>

<hr>
<hr>

<p align="center">
<img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/Icarus1989/NOME_REPOSITORY?style=flat-square">
<img alt="GitHub commit activity" src="https://img.shields.io/github/commit-activity/m/Icarus1989/NOME_REPOSITORY"> 
<img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/Icarus1989/NOME_REPOSITORY">
<img alt="GitHub language count" src="https://img.shields.io/github/languages/count/Icarus1989/NOME_REPOSITORY">
<img alt="GitHub top language" src="https://img.shields.io/github/languages/top/Icarus1989/NOME_REPOSITORY">
</p>

<hr>
<hr>

<div id="begin"></div>

<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#description">Description</a>
          <ul>
            <li><a href="#intro">Intro</a></li>
            <li><a href="#main-features">Main Features</a></li>
            <li><a href="#air-quality-data">Air Quality Data</a></li>
            <li><a href="#search-system">Search System</a></li>
            <li><a href="#3d-globe">3D Globe</a></li>
            <li><a href="#results-and-data-visualization">Results and Data Visualization</a></li>
            <li><a href="#internationalization">Internationalization</a></li>
            <li><a href="#responsive-design">Responsive Design</a></li>
            <li><a href="#error-handling">Error Handling</a></li>
            <li><a href="#host">Host</a></li>
            <li><a href="#conclusions">Conclusions</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#trace-summary">Trace Summary</a></li>
    <li><a href="#additional-features">Additional Features</a></li>
    <li><a href="#future-improvements">Future Improvements</a></li>
    <li><a href="#resources">Resources</a></li>
    <li><a href="#demo">Demo</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contacts">Contacts</a></li>
  </ol>
</details>

<hr>
<hr>

## About The Project

### Built With

Application structure, logic and styling:

- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [CSS Modules](https://github.com/css-modules/css-modules)
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [Next.js](https://nextjs.org/)

3D graphics and animations:

- [Three.js](https://threejs.org/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
- [Drei](https://github.com/pmndrs/drei)
- [Framer Motion](https://www.framer.com/motion/)

Data and APIs:

- [OpenAQ API](https://docs.openaq.org/)
- [Open-Meteo Air Quality API](https://open-meteo.com/en/docs/air-quality-api)
- [Mapbox](https://www.mapbox.com/)

Internationalization:

- [i18next](https://www.i18next.com/)
- [react-i18next](https://react.i18next.com/)

Hosting:

- [Vercel](https://vercel.com/)

<hr>
<hr>

## Description

<div align="center">
  <img src="INSERIRE_SCREENSHOT_O_COVER" alt="World Carbon Monoxide Detector preview" width="90%">
</div>

### Intro

<!-- Scrivi qui una breve introduzione al progetto:
- obiettivo dell'app
- perché il monossido di carbonio / qualità dell'aria
- collegamento con la traccia Start2Impact
- valore aggiunto rispetto a una semplice ricerca dati -->

<hr>

### Main Features

<!-- Elenca e descrivi brevemente:
- ricerca per città/luogo
- ricerca per coordinate
- ricerca per paese
- risultati qualità aria
- focus su CO
- altri inquinanti
- trend ultimi sei mesi
- fonti dati
- supporto multilingua
- responsive design -->

<hr>

### Air Quality Data

<!-- Spiega:
- uso di OpenAQ come fonte principale quando disponibile
- uso di Open-Meteo come fallback/completamento
- dati mostrati: CO, PM2.5, PM10, NO2, O3, SO2, AQI se presenti
- gestione dei dati mancanti
- limiti dei dati ambientali pubblici -->

<hr>

### Search System

<!-- Spiega:
- modalità Place
- modalità Coordinates
- modalità Country
- validazione campi
- date range
- geocoding
- target usato per orientare globo e risultati -->

<hr>

### 3D Globe

<!-- Spiega:
- globo 3D con Three.js / React Three Fiber
- rotazione verso il target selezionato
- uso di texture e confini geografici
- scopo visuale e interattivo -->

<hr>

### Results and Data Visualization

<!-- Spiega:
- ResultsModal
- tab Overview
- tab Pollutants
- tab Trend
- tab Sources
- rappresentazione valori, unità, fonte dati e trend -->

<hr>

### Internationalization

<!-- Spiega:
- lingue supportate
- i18next
- cambio lingua tramite settings
- traduzione labels paesi e testi UI -->

<hr>

### Responsive Design

<!-- Spiega:
- adattamento mobile/tablet/desktop
- orientamenti portrait/landscape
- gestione CSS Modules e media query
- difficoltà principali risolte -->

<hr>

### Error Handling

<!-- Spiega:
- errori API
- assenza dati
- fallback
- messaggi utente
- gestione loading states -->

<hr>

### Host

<!-- Scrivi qui:
- deploy su Vercel
- motivazione scelta Vercel
- eventuale nota su env variables -->

<hr>

### Conclusions

<!-- Scrivi qui:
- cosa hai imparato
- difficoltà principali
- aspetti tecnici più importanti
- possibili sviluppi futuri -->

<hr>
<hr>

## Usage

### Home

<!-- Descrivi brevemente la home:
- globo 3D
- pulsante ricerca
- settings -->

<div align="center">
  <img src="INSERIRE_SCREENSHOT_HOME" alt="Home screenshot" width="80%">
</div>

<br>

### Search Panel

<!-- Descrivi:
- ricerca per luogo
- ricerca per coordinate
- ricerca per paese
- intervallo date -->

<div align="center">
  <img src="INSERIRE_SCREENSHOT_SEARCH" alt="Search panel screenshot" width="80%">
</div>

<br>

### Results Modal

<!-- Descrivi:
- sintesi dati
- tabs
- valori principali
- trend e fonti -->

<div align="center">
  <img src="INSERIRE_SCREENSHOT_RESULTS" alt="Results modal screenshot" width="80%">
</div>

<br>

### Settings

<!-- Descrivi:
- cambio lingua
- about
- eventuali info progetto -->

<div align="center">
  <img src="INSERIRE_SCREENSHOT_SETTINGS" alt="Settings screenshot" width="80%">
</div>

<hr>
<hr>

## Trace Summary

<!-- Inserisci qui una sintesi della traccia Start2Impact. -->

- [ ] Date range selection.
- [ ] Country / State selection and CO evaluation.
- [ ] Latitude / Longitude selection and CO evaluation.
- [ ] API integration.
- [ ] Responsive UI.
- [ ] Clear and maintainable project structure.
- [ ] Error and loading state management.

<hr>
<hr>

## Additional Features

<!-- Elenca qui ciò che hai aggiunto oltre alla traccia base. -->

- [ ] Interactive 3D globe.
- [ ] Place search with geocoding.
- [ ] Country search with predefined coordinates.
- [ ] OpenAQ + Open-Meteo fallback/completion logic.
- [ ] Six-month air quality trend.
- [ ] Multi-language interface.
- [ ] Animated UI overlays.
- [ ] Detailed source tab.
- [ ] Responsive layout for multiple devices and orientations.

<hr>
<hr>

## Future Improvements

<!-- Elenca qui idee future senza dilungarti troppo. -->

- [ ] Add more countries.
- [ ] Improve station selection logic.
- [ ] Add map visualization inside results.
- [ ] Add historical comparison between years.
- [ ] Add user-selected pollutants.
- [ ] Improve accessibility.
- [ ] Add PWA support.
- [ ] Add persistent user preferences.

<hr>
<hr>

## Resources

- [React Documentation](https://react.dev/)
- [Next.js Documentation](https://nextjs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Three.js Documentation](https://threejs.org/docs/)
- [React Three Fiber Documentation](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
- [Drei Documentation](https://github.com/pmndrs/drei)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [OpenAQ API Documentation](https://docs.openaq.org/)
- [Open-Meteo Air Quality API Documentation](https://open-meteo.com/en/docs/air-quality-api)
- [Mapbox Documentation](https://docs.mapbox.com/)
- [i18next Documentation](https://www.i18next.com/)
- [MDN Web Docs](https://developer.mozilla.org/)

<hr>
<hr>

## Demo

[Project URL](INSERIRE_LINK_VERCEL)

<br>
<p><a href="#begin">&#9650; Back to summary</a></p>

<hr>
<hr>

## License

Distributed under MIT License.

<br>
<p><a href="#begin">&#9650; Back to summary</a></p>

<hr>
<hr>

## Contacts

Alex<br>
[GitHub](https://github.com/Icarus1989)<br>
[LinkedIn](https://www.linkedin.com/in/alex-valente-018586156/)<br>

<br>
<p><a href="#begin">&#9650; Back to summary</a></p>

<hr>
<hr>
