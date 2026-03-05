-- ============================================================
-- Klimaportal Heinsberg  --  Seed Data
-- 002_seed.sql
-- ============================================================

-- ─── blog_posts ─────────────────────────────────────────────
INSERT INTO blog_posts (id, date, author, author_role, tag, title, excerpt, read_time, color, image, paragraphs, pull_quote, pull_quote_author, display_order) VALUES
(
  'solar-boom',
  '12. Februar 2025',
  'Martin Schröder',
  'Klimaschutzmanager',
  'Energie',
  'Warum Heinsberg beim Solarausbau alle überholt',
  'Die Zahl der Solaranlagen im Kreis hat sich seit 2020 fast vervierfacht. Was steckt hinter diesem Erfolg — und was können andere Kommunen davon lernen?',
  '6 Min.',
  '#2d6a4f',
  'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop',
  ARRAY[
    'Als der Kreis Heinsberg 2020 den Klimanotstand erklärte, war die Ausgangslage ernüchternd: Gerade einmal 320 Photovoltaik-Anlagen standen auf den Dächern der Region. Heute sind es über 1.200 — ein Zuwachs von fast 300 Prozent in nur vier Jahren.',
    'Der Schlüssel zum Erfolg war eine Kombination aus drei Faktoren: Erstens senkte die Verwaltung die bürokratischen Hürden drastisch. Wo früher Wochen vergingen, dauert die Genehmigung einer Dachanlage heute im Schnitt drei Tage. Zweitens wurde ein Förderprogramm aufgelegt, das Balkonkraftwerke mit bis zu 200 Euro bezuschusst — ein niedrigschwelliger Einstieg, der besonders Mieter anspricht.',
    'Drittens spielte die Energiepreiskrise 2022 dem Ausbau in die Karten. Die Nachfrage nach Eigenversorgung explodierte, und der Kreis war vorbereitet: Beratungsstellen wurden aufgestockt, Handwerksbetriebe vernetzt, Sammelbestellungen organisiert. Das Ergebnis: In den Spitzenmonaten wurden bis zu 60 Anlagen pro Woche installiert.',
    'Besonders beeindruckend ist der Boom bei Balkonkraftwerken. Seit der Vereinfachung der Anmeldepflicht wurden 489 Stecker-Solargeräte registriert. Die durchschnittliche Anlagengröße auf Einfamilienhäusern beträgt mittlerweile 8,5 kWp — genug, um den Großteil des Eigenbedarfs zu decken.'
  ],
  'Wir haben bewiesen, dass Klimaschutz keine Frage des Budgets ist, sondern des politischen Willens.',
  'Martin Schröder, Klimaschutzmanager',
  0
),
(
  'radschnellweg',
  '28. Januar 2025',
  'Lisa Bergmann',
  'Verkehrsplanerin',
  'Mobilität',
  'Der Radschnellweg RS1: Ein Jahr nach der Eröffnung',
  'Seit einem Jahr verbindet der Radschnellweg RS1 Heinsberg mit Erkelenz. Die Zahlen zeigen: Das Projekt hat die Mobilität in der Region grundlegend verändert.',
  '5 Min.',
  '#1a5276',
  'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&h=600&fit=crop',
  ARRAY[
    'Ein Jahr ist es her, dass der Radschnellweg RS1 zwischen Heinsberg und Erkelenz eröffnet wurde. 22 Kilometer, breit genug für Überholvorgänge, beleuchtet, wintergeräumt — ein Premiumprodukt für Radfahrer. Die Bilanz nach zwölf Monaten übertrifft alle Erwartungen.',
    'Durchschnittlich 1.800 Fahrten pro Tag werden auf der Strecke gezählt. An Spitzentagen sind es über 3.000. Die Zahl der Radpendler auf dieser Route hat sich verdreifacht. Besonders in den Morgenstunden zwischen 7 und 9 Uhr ist der RS1 zu einer echten Pendlerautobahn geworden.',
    'Die Auswirkungen reichen über die reine Mobilität hinaus. Entlang der Strecke haben sich drei neue Fahrradwerkstätten angesiedelt. Die Grundstückspreise in den anliegenden Ortschaften sind um durchschnittlich 4 Prozent gestiegen. Und die lokalen Gastronomiebetriebe verzeichnen spürbar mehr Laufkundschaft.',
    'Für 2025 stehen bereits die nächsten Projekte an: Die Verlängerung nach Geilenkirchen und der Bau von überdachten E-Bike-Ladestationen an fünf Knotenpunkten. Der RS1 ist nicht nur ein Radweg — er ist der Beweis, dass gute Infrastruktur Verhalten ändert.'
  ],
  'Ein Kilometer Radweg ersetzt 180.000 Autokilometer pro Jahr. Die Rechnung geht auf.',
  'Lisa Bergmann, Verkehrsplanerin',
  1
),
(
  'buerger-energie',
  '15. Januar 2025',
  'Thomas Wilke',
  'Vorstandsvorsitzender BEG',
  'Gemeinschaft',
  'Bürgerenergiegenossenschaft knackt 3.000-Mitglieder-Marke',
  'Die Bürgerenergiegenossenschaft Heinsberg wächst schneller als je zuvor. Was als kleine Initiative begann, ist zu einer der größten Genossenschaften in NRW geworden.',
  '4 Min.',
  '#6b4f36',
  'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=800&h=600&fit=crop',
  ARRAY[
    'Es begann 2019 mit 47 Gründungsmitgliedern in einem Hinterzimmer des Rathauses. Heute zählt die Bürgerenergiegenossenschaft (BEG) Heinsberg über 3.200 Mitglieder und ist damit eine der größten ihrer Art in Nordrhein-Westfalen. Eine Erfolgsgeschichte, die zeigt: Klimaschutz funktioniert, wenn Menschen ihn selbst in die Hand nehmen.',
    'Das Geschäftsmodell ist einfach: Jedes Mitglied erwirbt mindestens einen Anteil für 500 Euro. Das gesammelte Kapital fließt in Solaranlagen auf öffentlichen Gebäuden, Ladesäulen und Nahwärmenetze. Die Rendite liegt stabil bei 3,5 Prozent — mehr als jedes Sparbuch, und das Geld arbeitet lokal.',
    'Aktuell betreibt die BEG 34 Solaranlagen auf Schulen, Sporthallen und Rathäusern mit einer Gesamtleistung von 4,2 MWp. Dazu kommen 12 öffentliche Ladesäulen und ein Nahwärmenetz in der Innenstadt, das 120 Haushalte versorgt.',
    'Das Besondere: Die BEG ist mehr als ein Finanzinstrument. Sie organisiert monatliche Informationsabende, betreibt eine Energieberatung und vernetzt Handwerksbetriebe mit Hausbesitzern. Jedes Mitglied hat eine Stimme — unabhängig von der Zahl der Anteile.'
  ],
  'Wenn 3.000 Menschen investieren, entsteht etwas Größeres als eine Solaranlage. Es entsteht Verantwortung.',
  'Thomas Wilke, Vorstandsvorsitzender BEG',
  2
),
(
  'hitzeaktionsplan',
  '3. Januar 2025',
  'Dr. Anna Mertens',
  'Gesundheitsamt',
  'Gesundheit',
  'Hitzeaktionsplan: Was wir aus dem Sommer 2024 gelernt haben',
  'Der vergangene Sommer brachte neue Temperaturrekorde. Der Hitzeaktionsplan des Kreises hat sich bewährt — doch die kommenden Jahre werden noch heißer.',
  '7 Min.',
  '#8b4513',
  'https://images.unsplash.com/photo-1504370805625-d32c54b16100?w=800&h=600&fit=crop',
  ARRAY[
    'Am 29. Juli 2024 wurden in Heinsberg 39,2 Grad Celsius gemessen — ein neuer Rekord. Drei Wochen lang lagen die Temperaturen durchgehend über 30 Grad. Für den Kreis war es der erste echte Stresstest des Hitzeaktionsplans, der im Frühjahr verabschiedet worden war.',
    'Die Bilanz: Das System hat funktioniert. Die Frühwarnung per App erreichte 28.000 Bürger. Zwölf klimatisierte Schutzräume in öffentlichen Gebäuden wurden von insgesamt 4.500 Personen genutzt. Mobile Trinkwasserstationen an 20 Standorten verteilten 35.000 Liter Wasser. Kein einziger Hitzetoter wurde registriert.',
    'Dennoch zeigten sich Schwachstellen. Die Versorgung von Pflegeheimen muss verbessert werden — zwei Einrichtungen meldeten Kapazitätsprobleme bei der Kühlung. Die Kommunikation in Fremdsprachen war unzureichend. Und der öffentliche Nahverkehr musste den Betrieb zeitweise einschränken, weil Oberleitungen überhitzten.',
    'Für 2025 werden die Maßnahmen deutlich ausgeweitet: 500 neue Stadtbäume als natürliche Schattenspender, Trinkbrunnen an allen Spielplätzen und eine Kooperation mit Apotheken als dezentrale Hitzeschutz-Anlaufstellen. Der Sommer kommt — und Heinsberg ist besser vorbereitet als je zuvor.'
  ],
  'Hitze ist der unsichtbare Killer. Prävention rettet Leben — und kostet einen Bruchteil der Folgeschäden.',
  'Dr. Anna Mertens, Gesundheitsamt',
  3
);


-- ─── events ─────────────────────────────────────────────────
-- Using the fuller descriptions from Events.tsx where they differ from Blog.tsx
INSERT INTO events (id, title, description, date, end_date, location, category, image, link, heins_app, display_order) VALUES
(
  'stadtradeln-2026',
  'STADTRADELN Heinsberg 2026',
  'Drei Wochen lang möglichst viele Alltagswege mit dem Fahrrad zurücklegen. Heinsberg radelt gemeinsam für den Klimaschutz — jeder Kilometer zählt!',
  '01. Mai 2026',
  '21. Mai 2026',
  'Gesamtes Stadtgebiet',
  'stadtradeln',
  'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&h=400&fit=crop',
  'https://www.stadtradeln.de',
  true,
  0
),
(
  'garten-2026',
  'Gartenprämierung 2026',
  'Der jährliche Wettbewerb für die schönsten und nachhaltigsten Gärten in Heinsberg. Melden Sie Ihren Garten an und gewinnen Sie tolle Preise!',
  '15. Juni 2026',
  '15. August 2026',
  'Stadtgebiet Heinsberg',
  'gartenprämierung',
  'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop',
  NULL,
  true,
  1
),
(
  'workshop-solar',
  'Workshop: Balkonkraftwerke',
  'Praktischer Workshop zur Installation und Nutzung von Balkonkraftwerken. Experten zeigen Ihnen Schritt für Schritt den Weg zur eigenen Solaranlage.',
  '22. März 2026',
  NULL,
  'VHS Heinsberg, Raum 204',
  'workshop',
  'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop',
  NULL,
  false,
  2
),
(
  'pflanzboerse',
  'Pflanzen- und Saatgutbörse',
  'Tauschen und verschenken Sie Pflanzen, Saatgut und Gartengeräte. Gemeinsam für mehr Biodiversität in unseren Gärten.',
  '12. April 2026',
  NULL,
  'Marktplatz Heinsberg',
  'allgemein',
  'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=600&h=400&fit=crop',
  NULL,
  false,
  3
),
(
  'klimatag',
  'Heinsberger Klimatag',
  'Ein Tag voller Aktionen, Vorträge und Mitmach-Angebote rund um den Klimaschutz. Für Familien, Schulklassen und alle Interessierten.',
  '20. September 2026',
  NULL,
  'Stadtpark Heinsberg',
  'allgemein',
  'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&h=400&fit=crop',
  NULL,
  true,
  4
);


-- ─── funding_programs ───────────────────────────────────────
INSERT INTO funding_programs (id, title, description, amount, deadline, category, tag, color, bg_color, image, display_order) VALUES
(
  'solar',
  'Solaranlagen-Förderung',
  'Zuschuss für PV-Anlagen und Balkonkraftwerke auf privaten Wohngebäuden.',
  'Bis zu 2.000 €',
  '31.12.2026',
  'Energie',
  'Privat & Gewerbe',
  '#2d6a4f',
  '#f0f0ec',
  'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=1000&fit=crop',
  0
),
(
  'daemmung',
  'Gebäudedämmung',
  'Energetische Sanierung: Fassaden-, Dach- und Kellerdeckendämmung.',
  'Bis zu 5.000 €',
  '31.12.2026',
  'Gebäude',
  'Bestandsgebäude',
  '#2d6a4f',
  '#f0f0ec',
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=1000&fit=crop',
  1
),
(
  'lastenrad',
  'Lastenrad-Prämie',
  'Zuschuss für Lastenfahrräder und E-Lastenräder.',
  'Bis zu 1.000 €',
  '30.09.2026',
  'Mobilität',
  'Privat & Gewerbe',
  '#2d6a4f',
  '#f0f0ec',
  'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&h=1000&fit=crop',
  2
),
(
  'gruendach',
  'Dach- & Fassadenbegrünung',
  'Begrünungsmaßnahmen für besseres Stadtklima und Biodiversität.',
  'Bis zu 3.000 €',
  '31.12.2026',
  'Natur',
  'Alle Gebäudetypen',
  '#2d6a4f',
  '#f0f0ec',
  'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=1000&fit=crop',
  3
);


-- ─── projects ───────────────────────────────────────────────
INSERT INTO projects (id, title, description, status, category, image, start_date, blog_id, display_order) VALUES
(
  'solaroffensive',
  'Solaroffensive Heinsberg',
  'Ausbau der Photovoltaik auf öffentlichen Gebäuden und Förderung von Balkonkraftwerken für Privathaushalte. Ziel: 2.000 neue Anlagen bis 2027.',
  'laufend',
  'Energie',
  'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop',
  'Januar 2024',
  'solar-boom',
  0
),
(
  'radschnellweg',
  'Radschnellweg RS1',
  'Verbindung Heinsberg–Erkelenz über einen modernen Radschnellweg. Sicheres, schnelles Radfahren für Pendler und Alltagsverkehr.',
  'laufend',
  'Mobilität',
  'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&h=400&fit=crop',
  'März 2023',
  'radschnellweg',
  1
),
(
  'stadtbegruenung',
  'Stadtbegrünung & Klimaoasen',
  'Schaffung von Grünflächen, Pocket Parks und begrünten Fassaden im Innenstadtbereich. Für bessere Luft und mehr Lebensqualität.',
  'geplant',
  'Natur',
  'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop',
  'Sommer 2026',
  NULL,
  2
),
(
  'ladeinfrastruktur',
  'Ausbau Ladeinfrastruktur',
  'Installation von 25 neuen Schnellladestationen im Stadtgebiet in Kooperation mit regionalen Energieversorgern.',
  'laufend',
  'Mobilität',
  'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&h=400&fit=crop',
  'Oktober 2024',
  NULL,
  3
);


-- ─── charging_stations ──────────────────────────────────────
INSERT INTO charging_stations (id, name, address, lat, lng, type, power, connectors, operator, status, amenities) VALUES
(
  '1',
  'Rathaus Heinsberg',
  'Apfelstr. 60, 52525 Heinsberg',
  51.0637, 6.0990,
  'ac', '22 kW', 2,
  'Stadtwerke Heinsberg',
  'active',
  ARRAY['Parkplatz', '24h']
),
(
  '2',
  'Marktplatz Heinsberg',
  'Hochstr., 52525 Heinsberg',
  51.0620, 6.0965,
  'both', '50 kW', 4,
  'EnBW',
  'active',
  ARRAY['Parkplatz', 'Einkaufsmöglichkeiten']
),
(
  '3',
  'Bahnhof Erkelenz',
  'Bahnhofstr. 12, 41812 Erkelenz',
  51.0796, 6.3164,
  'dc', '150 kW', 3,
  'IONITY',
  'active',
  ARRAY['Parkplatz', '24h', 'Bahnhofsnähe']
),
(
  '4',
  'Geilenkirchen Zentrum',
  'Konrad-Adenauer-Str. 5, 52511 Geilenkirchen',
  50.9668, 6.1187,
  'ac', '22 kW', 2,
  'Stadtwerke Geilenkirchen',
  'active',
  ARRAY['Parkplatz']
),
(
  '5',
  'Rathaus Hückelhoven',
  'Rathausplatz 1, 41836 Hückelhoven',
  51.0540, 6.2262,
  'ac', '22 kW', 2,
  'NEW AG',
  'active',
  ARRAY['Parkplatz', 'Überdacht']
),
(
  '6',
  'Wassenberg Altstadt',
  'Roermonder Str. 25, 41849 Wassenberg',
  51.0998, 6.1536,
  'ac', '11 kW', 2,
  'Stadtwerke Heinsberg',
  'active',
  ARRAY['Parkplatz']
),
(
  '7',
  'Wegberg Stadtzentrum',
  'Rathausplatz, 41844 Wegberg',
  51.1418, 6.2808,
  'both', '50 kW', 4,
  'EnBW',
  'active',
  ARRAY['Parkplatz', '24h', 'Einkaufsmöglichkeiten']
),
(
  '8',
  'Übach-Palenberg',
  'Carlstr. 50, 52531 Übach-Palenberg',
  50.9178, 6.1204,
  'ac', '22 kW', 2,
  'NEW AG',
  'active',
  ARRAY['Parkplatz']
),
(
  '9',
  'Selfkant Gewerbegebiet',
  'Am Rathaus 5, 52538 Selfkant',
  51.0067, 5.8720,
  'dc', '100 kW', 2,
  'Allego',
  'active',
  ARRAY['Parkplatz', '24h']
),
(
  '10',
  'Gangelt Innenstadt',
  'Sittarder Str. 20, 52538 Gangelt',
  50.9936, 5.9936,
  'ac', '22 kW', 2,
  'Stadtwerke Heinsberg',
  'active',
  ARRAY['Parkplatz']
),
(
  '11',
  'Waldfeucht',
  'Hauptstr. 8, 52525 Waldfeucht',
  51.0729, 5.9745,
  'ac', '11 kW', 1,
  'Stadtwerke Heinsberg',
  'active',
  ARRAY[]::text[]
),
(
  '12',
  'RS1 Knotenpunkt Oberbruch',
  'Am Radschnellweg, 52525 Heinsberg-Oberbruch',
  51.0460, 6.1250,
  'ac', '22 kW', 2,
  'Kreis Heinsberg',
  'active',
  ARRAY['E-Bike Ladestation', 'Radweg']
),
(
  '13',
  'RS1 Knotenpunkt Randerath',
  'Am Radschnellweg, 41836 Randerath',
  51.0580, 6.2400,
  'ac', '22 kW', 2,
  'Kreis Heinsberg',
  'planned',
  ARRAY['E-Bike Ladestation', 'Radweg']
),
(
  '14',
  'Krankenhaus Heinsberg',
  'Schafhausener Str. 40, 52525 Heinsberg',
  51.0685, 6.1050,
  'dc', '150 kW', 4,
  'IONITY',
  'planned',
  ARRAY['Parkplatz', '24h', 'Überdacht']
),
(
  '15',
  'Gewerbepark Erkelenz-Süd',
  'An der A46, 41812 Erkelenz',
  51.0650, 6.3250,
  'dc', '300 kW', 6,
  'Tesla Supercharger',
  'planned',
  ARRAY['Parkplatz', '24h', 'Autobahnnähe']
);


-- ─── dashboard_metrics ──────────────────────────────────────
INSERT INTO dashboard_metrics (id, title, category, value, unit, prefix, net_change, net_label, subtitle, chart_data, chart_years, pie_data, highlights, sources, display_order) VALUES
(
  'solar',
  'Solaranlagen',
  'Erneuerbare Energie',
  1247,
  NULL,
  NULL,
  '+290%',
  'Zuwachs seit 2020',
  'Installierte PV-Anlagen',
  '[320, 480, 620, 850, 1247]',
  '["2020", "2021", "2022", "2023", "2024"]',
  '[{"label": "Aufdach", "value": 58}, {"label": "Balkon", "value": 31}, {"label": "Freifläche", "value": 11}]',
  '[{"value": "48,5 MWp", "label": "Gesamtleistung"}, {"value": "+312", "label": "Neue Anlagen 2024"}, {"value": "489", "label": "Balkonkraftwerke"}, {"value": "22%", "label": "Eigenversorgungsquote"}]',
  ARRAY['Marktstammdatenregister', 'Bundesnetzagentur', 'Kreis Heinsberg Energiebericht 2024'],
  0
),
(
  'radwege',
  'Radwege',
  'Nachhaltige Mobilität',
  127,
  'km',
  NULL,
  '+76%',
  'Ausbau seit 2020',
  'Ausgebautes Radwegenetz',
  '[72, 85, 95, 109, 127]',
  '["2020", "2021", "2022", "2023", "2024"]',
  '[{"label": "Pendler", "value": 42}, {"label": "Freizeit", "value": 35}, {"label": "Schulweg", "value": 23}]',
  '[{"value": "18 km", "label": "Neubau 2024"}, {"value": "+34%", "label": "Mehr Radpendler"}, {"value": "2.100", "label": "Stellplätze"}, {"value": "4,2M€", "label": "Investition 2025"}]',
  ARRAY['ADFC Fahrradklimatest', 'Kreis Heinsberg Mobilitätskonzept', 'Straßen.NRW'],
  1
),
(
  'einwohner',
  'Einwohner aktiv',
  'Bürgerbeteiligung',
  38,
  '%',
  NULL,
  '+111%',
  'Anstieg seit 2020',
  'Aktive Teilnahme an Klimaprojekten',
  '[18, 22, 28, 33, 38]',
  '["2020", "2021", "2022", "2023", "2024"]',
  '[{"label": "Energie", "value": 38}, {"label": "Mobilität", "value": 27}, {"label": "Natur", "value": 22}, {"label": "Bildung", "value": 13}]',
  '[{"value": "47", "label": "Aktive Initiativen"}, {"value": "3.200", "label": "Genossenschaftler"}, {"value": "5.000", "label": "Bäume gepflanzt"}, {"value": "28%", "label": "Unter 25 Jahre"}]',
  ARRAY['Bürgerbefragung Kreis Heinsberg 2024', 'Klimaschutzmanagement', 'Ehrenamtsregister'],
  2
),
(
  'emissionen',
  'Emissionen gesenkt',
  'Treibhausgasbilanz',
  18.6,
  'kt',
  '-',
  '-14,2%',
  'Reduktion seit 2019',
  'Kilotonnen CO₂ weniger',
  '[131, 126, 121, 116, 112.4]',
  '["2020", "2021", "2022", "2023", "2024"]',
  '[{"label": "Gebäude", "value": 41}, {"label": "Verkehr", "value": 32}, {"label": "Industrie", "value": 18}, {"label": "Sonstige", "value": 9}]',
  '[{"value": "-14,2%", "label": "Gesamtreduktion"}, {"value": "-21%", "label": "Gebäudesektor"}, {"value": "-8,5%", "label": "Verkehr"}, {"value": "36%", "label": "Weg zum Ziel 2030"}]',
  ARRAY['Treibhausgasbilanz NRW', 'Klimaschutzkonzept Kreis Heinsberg', 'Umweltbundesamt'],
  3
);


-- ─── metric_details ─────────────────────────────────────────
INSERT INTO metric_details (id, metric_id, headline, lead, paragraphs, pull_quote, pull_quote_author) VALUES
(
  'solar-detail',
  'solar',
  'Wie Heinsberg zur Solar-Hochburg wurde',
  'Der Kreis Heinsberg hat seine installierte Solarkapazität seit 2020 fast vervierfacht. Ein Zusammenspiel aus Förderprogrammen, vereinfachter Bürokratie und wachsendem Umweltbewusstsein treibt den Ausbau voran.',
  ARRAY[
    'Als der Kreis Heinsberg 2020 den Klimanotstand erklärte, standen gerade einmal 320 Photovoltaik-Anlagen auf den Dächern der Region. Heute, vier Jahre später, sind es fast viermal so viele. Ein Erfolg, der auf mehreren Säulen ruht: Die kommunale Solaroffensive fördert Balkonkraftwerke mit bis zu 200 Euro, die Genehmigungsverfahren wurden radikal vereinfacht, und die Energiepreiskrise hat das Interesse der Bürger an Eigenversorgung massiv gesteigert.',
    'Besonders bemerkenswert ist der Boom bei Balkonkraftwerken. Seit der Vereinfachung der Anmeldepflicht 2023 wurden 489 Stecker-Solargeräte registriert — Tendenz steigend. Die durchschnittliche Anlagengröße auf Einfamilienhäusern beträgt 8,5 kWp, genug um den Großteil des Eigenbedarfs zu decken.',
    'Die Gesamtleistung aller Anlagen erreicht mittlerweile 48,5 Megawatt-Peak. Das entspricht dem jährlichen Strombedarf von etwa 14.500 Haushalten. Jede einzelne Anlage spart durchschnittlich 4,2 Tonnen CO₂ pro Jahr — zusammen ergibt das eine Einsparung von über 5.200 Tonnen jährlich.',
    'Für 2025 plant der Kreis den nächsten großen Schritt: Die Solarpflicht für Neubauten und eine Verdopplung der Fördermittel für Bestandsgebäude. Das Ziel: 2.000 Anlagen bis Ende des Jahres.'
  ],
  'Jede Anlage auf unseren Dächern ist ein Stück Unabhängigkeit — von fossilen Energien und von steigenden Preisen.',
  'Klimaschutzmanager, Kreis Heinsberg'
),
(
  'radwege-detail',
  'radwege',
  'Die stille Revolution auf zwei Rädern',
  'Das Radwegenetz im Kreis Heinsberg wächst Jahr für Jahr. Mit 127 Kilometern ausgebauter Strecke hat sich die Fahrradinfrastruktur seit 2020 um 76 Prozent vergrößert — und verändert die Mobilitätsgewohnheiten tausender Pendler.',
  ARRAY[
    '127 Kilometer — so lang ist das Netz an sicheren, gut ausgebauten Radwegen, das den Kreis Heinsberg heute durchzieht. 2020 waren es noch 72 Kilometer. Der Ausbau folgt einem klaren Plan: Zuerst die Verbindungen zwischen den Ortsteilen, dann die Anbindung an den ÖPNV, zuletzt der Komfort.',
    'Das Herzstück ist der Radschnellweg RS1, der Heinsberg auf 22 Kilometern mit Erkelenz verbindet. Breit genug für Überholvorgänge, beleuchtet, wintergeräumt — ein echtes Premiumprodukt. Seit seiner Eröffnung hat sich die Zahl der Radpendler auf dieser Strecke verdreifacht.',
    'An allen acht Bahnhöfen im Kreisgebiet stehen jetzt gesicherte Fahrradparkplätze zur Verfügung. E-Bike-Ladestationen an 15 Standorten machen auch längere Strecken komfortabel. Die durchschnittliche tägliche Nutzung aller Radwege stieg seit 2020 um 45 Prozent.',
    'Für 2025 sind weitere 4,2 Millionen Euro für den Radwegebau eingeplant. Schwerpunkt: Die letzten Lücken im innerstädtischen Netz schließen und den Anschluss an die Nachbarkreise verbessern.'
  ],
  'Ein Kilometer Radweg ersetzt 180.000 Autokilometer pro Jahr. Das ist nicht nur Klimaschutz — das ist messbare Lebensqualität.',
  'Verkehrsplanerin, Kreis Heinsberg'
),
(
  'einwohner-detail',
  'einwohner',
  'Wenn eine ganze Region aufwacht',
  'Fast vier von zehn Einwohnern im Kreis Heinsberg engagieren sich aktiv in Klimaschutzprojekten. Was 2020 mit einer Handvoll Initiativen begann, ist zu einer breiten Bewegung geworden, die alle Altersgruppen erfasst.',
  ARRAY[
    '38 Prozent — mehr als jeder dritte Einwohner im Kreis Heinsberg beteiligt sich mittlerweile aktiv an Klimaschutzprojekten. 2020 lag diese Zahl noch bei 18 Prozent. Der Wandel kam nicht über Nacht, sondern durch beharrliche Arbeit von unten: Nachbarschaftsinitiativen, die sich um Gemeinschaftsgärten kümmern, Bürgerenergiegenossenschaften, die in Solarparks investieren, Schulprojekte, die den Nachwuchs sensibilisieren.',
    'Die Bürgerenergiegenossenschaft Heinsberg zählt über 3.200 Mitglieder und ist damit eine der größten in Nordrhein-Westfalen. Sie betreibt Solaranlagen auf öffentlichen Gebäuden, finanziert Ladesäulen und berät Hausbesitzer bei der energetischen Sanierung. Jedes Mitglied ist gleichzeitig Investor und Profiteur der Energiewende.',
    'Besonders ermutigend: Der Anteil junger Menschen unter 25 liegt bei 28 Prozent. Programme wie "Heinsberg pflanzt" — bei dem bereits 5.000 Bäume gesetzt wurden — erreichen Familien und Schulklassen gleichermaßen. Die monatlichen Klimawerkstätten ziehen durchschnittlich 85 Teilnehmer an.',
    'Das Klimaschutzmanagement des Kreises setzt bewusst auf niedrigschwellige Angebote: Repair-Cafés, Tauschbörsen, gemeinsames Urban Gardening. Die Botschaft: Klimaschutz beginnt im Alltag, nicht im Rathaus.'
  ],
  'Klimaschutz funktioniert nur, wenn er von den Menschen getragen wird. Die Zahlen zeigen: Heinsberg hat das verstanden.',
  'Landrat Kreis Heinsberg'
),
(
  'emissionen-detail',
  'emissionen',
  'Der lange Abstieg der Emissionskurve',
  'Der Kreis Heinsberg hat seine CO₂-Emissionen seit dem Referenzjahr 2019 um 18,6 Kilotonnen gesenkt — ein Rückgang von 14,2 Prozent. Die größten Fortschritte kommen aus dem Gebäudesektor, doch die ambitionierten Klimaziele erfordern noch deutlich mehr.',
  ARRAY[
    '131 Kilotonnen CO₂ — so viel stieß der Kreis Heinsberg 2020 noch aus. Heute sind es 112,4 Kilotonnen. 18,6 Kilotonnen weniger, das klingt nach einer Zahl auf dem Papier. In der Realität bedeutet es: Tausende sanierte Gebäude, Hunderte abgeschaltete Ölheizungen, eine komplett elektrifizierte Busflotte.',
    'Den größten Beitrag leistet der Gebäudesektor mit einem Rückgang von 21 Prozent. Die Umstellung auf Wärmepumpen, die energetische Sanierung von Altbauten und die Solarthermie auf Neubauten zeigen Wirkung. Allein die Schließung des letzten regionalen Kohlekraftwerks ersparte der Atmosphäre 8.400 Tonnen CO₂ jährlich.',
    'Im Verkehrssektor ist der Fortschritt mit minus 8,5 Prozent langsamer, aber messbar. Die Elektrifizierung des ÖPNV reduziert die Emissionen um 3.200 Tonnen pro Jahr. Die LED-Umrüstung der gesamten Straßenbeleuchtung spart weitere 420 Tonnen. Kleinvieh, das sich summiert.',
    'Doch der Weg ist noch weit: Das Ziel lautet minus 65 Prozent bis 2030 gegenüber 1990. Aktuell hat Heinsberg 36 Prozent dieses Weges zurückgelegt. Die nächste große Herausforderung: Der Industriesektor, der bislang nur marginal beigetragen hat.'
  ],
  'Jede nicht ausgestoßene Tonne CO₂ ist ein Gewinn für kommende Generationen. Aber wir müssen das Tempo verdreifachen.',
  'Umweltamt Kreis Heinsberg'
);


-- ─── tips ───────────────────────────────────────────────────
INSERT INTO tips (icon_key, title, front_text, savings, image, stats, details, fact, display_order) VALUES
(
  'bike',
  'Mobilität umdenken',
  'Nachhaltige Fortbewegung',
  '~2,5t CO₂/Jahr',
  'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&q=80',
  '[{"label": "CO₂ Einsparung", "value": "2,5t", "sub": "pro Jahr"}, {"label": "Kosten gespart", "value": "1.800€", "sub": "pro Jahr"}, {"label": "Fitness Bonus", "value": "+40%", "sub": "Aktivität"}]',
  ARRAY[
    'Kurzstrecken unter 5km zu Fuß oder mit dem Rad',
    'Jeder Kilometer ohne Auto spart ca. 150g CO₂',
    'Öffentliche Verkehrsmittel statt Zweitwagen',
    'Fahrgemeinschaften für den Arbeitsweg bilden',
    'E-Bikes als Alternative für längere Strecken'
  ],
  'Der Verkehrssektor verursacht 20% der deutschen CO₂-Emissionen. Schon 3x/Woche Radfahren statt Autofahren macht einen spürbaren Unterschied.',
  0
),
(
  'home',
  'Zuhause dämmen',
  'Energieeffizienz im Heim',
  '~1,8t CO₂/Jahr',
  'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80',
  '[{"label": "Energie gespart", "value": "50%", "sub": "Heizkosten"}, {"label": "Förderung", "value": "45.000€", "sub": "KfW max."}, {"label": "Amortisation", "value": "8-12", "sub": "Jahre"}]',
  ARRAY[
    'Wärmedämmung senkt Energieverbrauch um bis zu 50%',
    'KfW-Förderungen bis zu 45.000€ möglich',
    'Fenster-Austausch spart sofort Heizkosten',
    'Smarte Thermostate senken den Verbrauch um 15%',
    'Kellerdecke und Dachboden zuerst dämmen'
  ],
  '35% der Energie in deutschen Haushalten geht durch schlechte Dämmung verloren. Schon die Dämmung der obersten Geschossdecke spart 15% Heizenergie.',
  1
),
(
  'leaf',
  'Regional und saisonal',
  'Bewusste Ernährung',
  '~0,8t CO₂/Jahr',
  'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&q=80',
  '[{"label": "CO₂ Einsparung", "value": "0,8t", "sub": "pro Jahr"}, {"label": "Transportweg", "value": "-90%", "sub": "regional"}, {"label": "Bio-Anteil", "value": "34%", "sub": "in Heinsberg"}]',
  ARRAY[
    'Ein vegetarischer Tag/Woche spart erheblich CO₂',
    'Regionale Produkte vermeiden lange Transportwege',
    'Saisonales Obst & Gemüse statt Gewächshaus-Ware',
    'Lebensmittelverschwendung um 50% reduzieren',
    'Wochenmärkte in Heinsberg unterstützen'
  ],
  'Ein Kilogramm Rindfleisch verursacht 13kg CO₂ — das entspricht einer Autofahrt von 60km. Pflanzliche Alternativen brauchen 90% weniger Ressourcen.',
  2
),
(
  'sun',
  'Solarenergie nutzen',
  'Eigenen Strom erzeugen',
  '~0,6t CO₂/Jahr',
  'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80',
  '[{"label": "Eigenproduktion", "value": "600", "sub": "kWh/Jahr"}, {"label": "Einstiegspreis", "value": "300€", "sub": "Balkonkraftwerk"}, {"label": "Amortisation", "value": "3-5", "sub": "Jahre"}]',
  ARRAY[
    'Balkonkraftwerke ab 300€ möglich',
    'Bis zu 600kWh Strom pro Jahr selbst erzeugen',
    'Anmeldung beim Netzbetreiber vereinfacht',
    'Amortisation in 3-5 Jahren',
    'Förderung durch Stadt Heinsberg verfügbar'
  ],
  'Deutschland hatte 2024 über 4 Millionen Solaranlagen. Ein Balkonkraftwerk mit 800W erzeugt genug Strom für Kühlschrank + Waschmaschine eines Jahres.',
  3
),
(
  'droplet',
  'Wasser sparen',
  'Grundwasser schützen',
  '~15.000L/Jahr',
  'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=600&q=80',
  '[{"label": "Wasser gespart", "value": "15k", "sub": "Liter/Jahr"}, {"label": "Kosten", "value": "-120€", "sub": "pro Jahr"}, {"label": "Grundwasser", "value": "+8%", "sub": "Regeneration"}]',
  ARRAY[
    'Regenwasser in Tonnen oder Zisternen sammeln',
    'Durchflussregler an Wasserhähnen montieren',
    'Rasen seltener bewässern — Trockenrasen nutzen',
    'Duschen statt Baden spart 120L pro Mal',
    'Grauwasser-Systeme für Gartenbewässerung'
  ],
  'Jeder Deutsche verbraucht durchschnittlich 125 Liter Wasser pro Tag. Mit einfachen Maßnahmen lässt sich das auf unter 90 Liter senken.',
  4
);


-- ─── milestones ─────────────────────────────────────────────
INSERT INTO milestones (year, title, description, status, color, display_order) VALUES
('2020', 'Klimanotstand erklärt', 'Heinsberg verpflichtet sich zu konkreten Maßnahmen.', 'done', '#2d6a4f', 0),
('2021', 'Solaroffensive', '1.000 neue PV-Anlagen auf privaten & öffentlichen Dächern.', 'done', '#40916c', 1),
('2022', 'Radwegenetz', '45km neue Radwege verbinden alle Ortsteile.', 'done', '#52b788', 2),
('2023', 'Grünes Rathaus', 'Kommunale Gebäude 100% erneuerbar.', 'done', '#74c69d', 3),
('2025', '50% Erneuerbare', 'Windkraft, Geothermie & Eigenversorgung.', 'active', '#2d6a4f', 4),
('2030', 'Klimaneutral', 'Vollständige Klimaneutralität für Heinsberg.', 'future', '#b7e4c7', 5);


-- ─── facts ──────────────────────────────────────────────────
INSERT INTO facts (content, display_order) VALUES
('Die globale Durchschnittstemperatur ist um 1,1°C gestiegen', 0),
('Der Meeresspiegel steigt um 3,6mm pro Jahr', 1),
('Deutschland emittiert 746 Mio. Tonnen CO₂ jährlich', 2),
('Wälder absorbieren ca. 30% des menschlichen CO₂', 3),
('Erneuerbare decken 48,5% des deutschen Stroms', 4),
('Nur 17% des weltweiten Plastikmülls werden recycelt', 5),
('2023 war das heißeste Jahr seit Beginn der Aufzeichnungen', 6),
('Wasserknappheit betrifft 2 Milliarden Menschen weltweit', 7);
