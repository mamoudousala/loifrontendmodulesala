# RealEstateCare - Front-end prototype
Dit prototype is voor een project van RealEstateCare. Zij is actief in het inspecteren van panden. In het prototype kunnen inspecties worden bekeken, daarnaast zijn er features in de vorm van voorbeeldschermen. Hierin kan informatie worden bekeken en vastgelegd.
Voor dit project is gebruik gemaakt van: 
-	React in combinatie met Next.js
-	Tailwind CSS voor styling
-	Een component library t.b.v. standard user-interface elementen
Zoals eerder al aangegeven is de keuze op React gevallen vanwege mijn bestaande kennis en ervaring.
# Functionaliteiten
Het prototype beschikt over de volgende functionaliteiten
-	Gesimuleerd inlogscherm
-	Gesimuleerde Tweestapsverificatie
-	Overzichtelijk inspectiescherm van openstaande en uitgevoerde inspecties
-	Instellingenpagina
-	Kennisbank pagina
-	Navigatie via routing
# Security & usability
Bij het ontwerp is rekening gehouden met de best practices van security en usability op basisniveau. Alle dashboardpagina’s zijn pas beschikbaar na een succesvolle authenticatie. Als hier geen sprake van is wordt de gebruiker automatisch doorgestuurd naar het inlogscherm. 
Tenslotte is input validatie van kracht. Deze maatregel mitigeert potentiele dreigingen als Cross-site scripting en SQL-injection. 
# Bekende beperkingen
Omdat er geen koppeling is met een echte database wordt gebruik gemaakt van kunstmatige data en zijn sommige onderdelen vereenvoudigd. Het doel van het front-end prototype is dan ook om te laten zien dat de webapp gesimuleerd kan worden op functioneel niveau.
# Installatie
1. Installeer de dependencies:
   npm install
2. Start de applicatie:
   npm run dev

