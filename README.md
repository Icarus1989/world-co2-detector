<div align="center">
  <h1><i>World CO Detector</i></h1>
</div>

<div align="center">
  <h3>Progetto Finale Front-End / LifeStyle</h3>
</div>

**Questa é una Web App creata come progetto per il completamento del Progetto finale del Master Front End Developer di _Start2Impact_**.

<hr>
<hr>

## Progetto:

<p align="center">
<img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/Icarus1989/world-co2-detector?style=flat-square">
<img alt="GitHub commit activity" src="https://img.shields.io/github/commit-activity/m/Icarus1989/world-co2-detector"> 
<img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/Icarus1989/world-co2-detector">
<img alt="GitHub language count" src="https://img.shields.io/github/languages/count/Icarus1989/world-co2-detector">
<img alt="GitHub top language" src="https://img.shields.io/github/languages/top/Icarus1989/world-co2-detector">
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
            <li><a href="#ai-usage">AI Usage</a></li>
            <li><a href="#host">Host</a></li>
            <li><a href="#conclusions">Conclusions</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#trace-summary">Trace Summary</a></li>
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
  <img src="https://i.ibb.co/XkfSDXTK/WCODCover.jpg" alt="World Carbon Monoxide Detector preview" width="90%">
</div>

### Intro

Questo è il progetto finale del mio percorso nel master da Front End Developer di Start2Impact, un connubio, che penso si possa definire unico, delle conoscenze acquisite in anni tra i vari corsi ed il mio percorso di apprendimento personale, che mi ha portato a realizzare un’app tanto semplice nell’utilizzo quanto articolata nella costruzione delle sue singole parti.

<hr>

### Main Features

Quest’app serve per determinare il livello di monossido di carbonio presente nell’aria di una determinata zona selezionata, sia essa una città, un paese o ricercata tramite coordinate geografiche.
Oltre a questo viene fatta una rilevazione più ampia degli inquinanti, si può osservare un grafico dell’andamento di crescita di questi negli ultimi sei mesi, potendo anche personalizzare l’app in una tra quattro lingue a scelta.
Ho cercato di mantenere l’interfaccia iniziale semplice e basilare, in modo quasi opposto rispetto agli altri progetti fatti, ma comunque cercando di mantenere un impatto visivo capace di stupire fin dal primo impatto.

<hr>

### Air Quality Data

Per ottenere dei dati completi, sia per quanto riguarda il monossido di carbonio (CO) sia per gli altri inquinanti più comuni (PM2.5, PM10, NO2, O3 e SO2) ho dovuto utilizzare due fonti di dati, OpenAQ e Open-Meteo. Data la combinazione dei risultati delle due per ogni ricerca si avrà un livello completo di informazioni per le principali città del mondo, ed un ventaglio abbastanza vasto per quanto riguarda le altre zone, in base alla disponibilità di sensori utilizzati dalle fonti. L'eventuale assenza totale di dati da OpenAQ verrà sopperita da Open-Meteo, fonte con dati che coprono zone più vaste, anche se a volte meno precisi rispetto alla prima.

> [!NOTE]
> Tutte le API Keys sono state resettate e cambiate dalla fase di sviluppo a quella di produzione.

<hr>

### Search System

Il pannello di ricerca attivabile tramite un semplice button permette di richiedere informazioni attraverso l’inserimento del nome della località, coordinate geografiche o tramite una veloce selezione di Paesi preimpostata.
Oltre a questo è possibile selezionare un range temporale per la ricerca. Una volta effettuata una ricerca, verrà aggiunto al Globo tridimensionale un indicatore in corrispondenza delle coordinate risultanti, che rimarrà fino alla successiva.

<hr>

### 3D Globe

Ho voluto dare a questo progetto un significato profondo e per nulla nascosto, anzi ben visibile fin da subito: un mondo diviso in singoli Stati, riunito dopo le rotture e rinsaldato con filamenti d’oro, come un vaso giapponese riparato con la tecnica kintsugi, che conferisce nuova bellezza e ancora più valore ad un oggetto rotto in precedenza.

Ho dovuto spingere oltre il mio limite e ampliare di molto le mie conoscenze per creare un insieme di mesh tridimensionali utilizzando Three.js, per generare ogni singolo paese del mondo, senza un modello in 3D ottenuto da applicazioni di disegno apposite ma utilizzando ed elaborando i dati dei confini dei singoli Paesi, ed è stata una sfida appassionante.

Partendo da ore di studio della documentazione ufficiale, passando attraverso risultati che arrivavano a bloccare fisicamente il computer usato per lo sviluppo e mi costringevano allo stop per l’eccessivo riscaldamento. Dopo centinaia di esempi, tentativi e soluzioni non applicabili, sono arrivato prima al modello dell’Europa, poi alla prima metà del globo, fino a una soluzione stabile, visivamente impattante e meno pesante per il dispositivo.
Creando appositamente e singolarmente ogni singola texture usata nei vari livelli della parte sferica che rappresenta i mari e gli oceani, ho potuto ottenere l'effetto finale che vedrete.

> [!TIP]
> **Nota sulle prestazioni:** il modello tridimensionale del globo è uno degli elementi centrali del progetto e utilizza mesh, texture e dati geografici complessi. Nonostante le ottimizzazioni applicate, dispositivi più datati o con risorse hardware limitate potrebbero mostrare prestazioni inferiori, soprattutto durante il caricamento iniziale e l’interazione con il globo.

<hr>

### Results and Data Visualization

Cominciata la ricerca, verrà mostrato un puntatore nel globo tridimensionale alle coordinate della ricerca, subito dopo verrà visualizzato un modal con i risultati caricati, con una scheda per sintesi, una per i dati degli inquinanti nel dettaglio, una per il grafico con l’andamento degli scorsi sei mesi e l’ultima per le fonti dati utilizzate ed un avviso all'utente nel caso di mancanza di dati dalle fonti.
Per inserire un tocco visivamente piacevole in più ai risultati ottenuti, e mettermi ulteriormente alla prova, ho voluto rendere lo sfondo del modal dei risultati un’effettiva mappa della zona cercata, ottenuta utilizzando l’API di Mapbox. La ritengo un'API di media difficoltà, dalla forte possibilità di personalizzazione, ma che soffre come molte altre di una documentazione troppo spesso non chiara e / o non del tutto completa e ben organizzata.

<hr>

### Internationalization

Fornendo la possibilità di cambiare lingua dell’interfaccia, menu e delle varie parti dell’app tramite i18next con relative utilities per le traduzioni, ho cercato di rendere gradevole e fruibile l’esperienza ad un numero maggiore di persone.
Per cambiare lingua basta accedere alle impostazioni tramite il button dedicato nella parte in alto a destra della Home dell'app. Le lingue disponibili sono Italiano, Inglese, Tedesco ed Olandese.

<hr>

### Responsive Design

Creata con un approccio mobile-first, l’app è utilizzabile in una vasta gamma di formati di dispositivi: smartphone, tablet e desktop, comprese le modalità landscape dei dispositivi portatili.

<hr>

### Error Handling

Nell’eventualità di errori di caricamento dei dati delle API, verrà visualizzato un breve messaggio testuale nel modal dei risultati, fornendo delle indicazioni sintetiche ma abbastanza esplicative sul problema e sull’origine di questo.

<hr>

<hr>

### AI Usage

Ho provato ad utilizzare ChatGPT per il debug ed il refactor di alcuni punti di quest'app e per tentare di colmare le innumerevoli lacune della documentazione di Three.js.

È stata interessante come esperienza in generale, penso proprio per lo stacco temporale di alcuni mesi tra la fase iniziale di questo progetto e quella finale. Nonostante abbia visto dei significativi miglioramenti, ed in fase di debug o in caso di ricerca di errori con TypeScript, si sia rivelato molto utile, soprattutto di recente, trovo comunque che in quanto a comprensione del contesto dei modelli tridimensionali ed alla loro creazione tramite codice, che penso comprenda anche una certa parte artistica o di immaginazione, e al trovare soluzioni realmente, almeno in parte, nuove, questo risulti ancora lacunoso e più orientato a fornire un tentativo di risposta, più che una reale soluzione.
Complice forse il fatto che l'ambiente di Three.js a mio parere è ancora piuttosto frammentato a livello di documentazione e, forse di conseguenza, di esempi specifici.

<hr>

### Host

Data la sua semplicità d’uso con una web app creata con Next.js e dato che lo avevo utilizzato precedentemente per lo scorso progetto, ho voluto optare per Vercel per l’hosting di questo progetto.

<hr>

### Conclusions

Questo progetto é stato lungo da sviluppare, purtroppo interrotto e poi ripreso, ma finalmente concluso. Passando da un periodo utilizzando React Native non è stato immediato riprendere il filo logico di tutto, ma il risultato mi sembra in linea con ciò che immaginavo all'inizio.
Ora finalmente arrivare alla fine, al di là del risultato, rappresenta un traguardo che ritenevo necessario per me stesso.
Spero possa trasmettervi delle emozioni e, magari, essere utile a qualcuno. Ho amato ogni istante di questo progetto, dai primi risultati visivi agli errori non rilevati ed invisibili, dai momenti nei quali le soluzioni sembravano essere vicine a quelli di fallimento che parevano distanziare l'orizzonte. Ogni istante é stato fondamentale, perché mi ha portato a possedere conoscenze che prima non avevo e mi ha aperto e reso reali possibilità che prima solo immaginavo.

<hr>
<hr>

## Usage

### Home

La Home Page dell'app presenta immediatamente il pianeta terra sotto forma artistica, ruotabile lungo un unico asse per non sovraccaricare in termini di risorse i vari dispositivi. Oltre a questo vi saranno due button: uno per aprire il Search Panel per cominciare una ricerca ed uno per le impostazioni dell'app.

<div align="center">
  <img src="https://i.ibb.co/PsjDhYjW/Screenshot-2026-07-06-alle-17-05-28.png" alt="Home screenshot" width="80%">
</div>

<br>

### Search Panel

Il pannello di ricerca permette di effettuare un'interrogazione alle API tramite nome della località, coordinate geografiche o tramite una selezione di Paesi predefinita. Oltre a questo vi è la possibilità di modificare il lasso temporale dentro il quale vengono ottenuti i dati.

<div align="center">
  <img src="https://i.ibb.co/rKhqcpMs/Screenshot-2026-07-06-alle-17-05-23.png" alt="Search panel screenshot" width="80%">
</div>

<br>

### Results Modal

Dopo aver avviato la ricerca apparirà un modal con al suo interno quattro sezioni:

- una scheda con una sintesi rapida dei dati ottenuti con il monossido di carbonio, richiesta principale della consegna del progetto, in prima vista
- una per i dati degli inquinanti CO, PM2.5, PM10, NO2, O3 e SO2 nel dettaglio con numero di campioni analizzati
- una per il grafico con l’andamento del livello degli inquinanti, selezionabili nella parte superiore, degli scorsi sei mesi
- l’ultima per le fonti dati utilizzate ed un avviso all'utente nel caso di mancanza di dati dalla fonte primaria, OpenAQ, che verrà sopperita dalla secondaria, Open-Meteo, sia in caso di risultati parziali che in totale assenza di dati.

Per inserire un tocco visivamente piacevole in più ai risultati ottenuti ho voluto rendere lo sfondo del modal dei risultati un’effettiva mappa della zona cercata, ottenuta utilizzando l’API di Mapbox.

<div align="center">
  <img src="https://i.ibb.co/WNf03wxG/Screenshot-2026-07-06-alle-17-06-56.png" alt="Results modal screenshot" width="80%">
</div>

<br>

### Settings

Il pannello delle impostazioni, apribile dalla Home page con il tasto apposito, permette di accedere ad un modal About contenente i link di contatto ed a un secondo modal che consente tramite quattro buttons di modificare la lingua della UI dell'app.

<div align="center">
  <img src="https://i.ibb.co/0y5MdqVh/Screenshot-2026-07-06-alle-17-10-19.png" alt="Settings screenshot" width="40%">
</div>

<hr>
<hr>

## Trace Summary

Traccia originale del progetto:

Sviluppa l'interfaccia di un'applicazione web, creando una web app che interagisca con le API e implementando un CSS solido, scalabile e facilmente mantenibile.

Per chi lavorerai
App per visualizzare le emissioni di monossido di carbonio

Requisiti:

- Selezione di data di inizio e fine
- Selezione dello Stato e valutazione del monossido di carbonio
- Selezione di latitudine e longitudine (puoi usare due campi testo) e valutazione del monossido di carbonio
  UI e UX semplice e facile da usare
- Struttura dell’app organizzata e comprensibile
- Design responsive

Bonus:

- Dato uno Stato, visualizza un grafico con le emissioni di monossido di carbonio degli ultimi 6 mesi; per creare il grafico puoi utilizzare qualsiasi libreria grafica trovi disponibile online.

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

[Project URL](https://world-co2-detector.vercel.app/)

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
