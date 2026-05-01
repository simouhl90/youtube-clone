import type { Series, WatchProgress } from '@/types';

// ============================================================
// CineVerse — Premium TV Series Mock Data
// ============================================================

export const series: Series[] = [
  {
    id: 's1',
    title: 'The Last Kingdom',
    poster: 'https://picsum.photos/seed/lastkingdom/400/600',
    backdrop: 'https://picsum.photos/seed/lastkingdombg/1200/680',
    description: 'Set in the late 9th century AD, when Alfred the Great rules over the last kingdom of Wessex. A young Saxon nobleman is captured and raised by Vikings, torn between his loyalties to both sides as the battle for England rages on. This epic saga of war, love, and betrayal follows one man\'s quest to reclaim his birthright and unite a fractured nation against invading forces.',
    genre: ['Drama', 'Action', 'History'],
    year: 2022,
    rating: 9.1,
    ratingCount: 245000,
    maturity: 'TV-MA',
    seasons: [
      {
        number: 1,
        year: '2022',
        episodes: [
          { id: 's1e1', number: 1, title: 'The Awakening', description: 'Young Uhtred witnesses the brutal Saxon defeat and is taken by Danish warlord Earl Ragnar.', duration: '58 min', thumbnail: 'https://picsum.photos/seed/s1e1/320/180', rating: 9.3, airDate: '2022-03-04' },
          { id: 's1e2', number: 2, title: 'Shadow of the Dane', description: 'Uhtred grows up among the Danes and learns their ways, forming bonds that will shape his destiny.', duration: '55 min', thumbnail: 'https://picsum.photos/seed/s1e2/320/180', rating: 9.1, airDate: '2022-03-11' },
          { id: 's1e3', number: 3, title: 'Blood and Oath', description: 'A devastating betrayal forces Uhtred to flee, beginning his long journey back to Bebbanburg.', duration: '61 min', thumbnail: 'https://picsum.photos/seed/s1e3/320/180', rating: 9.4, airDate: '2022-03-18' },
          { id: 's1e4', number: 4, title: 'The Shield Wall', description: 'The great battle begins as Saxon and Danish forces collide on the open fields of Wessex.', duration: '63 min', thumbnail: 'https://picsum.photos/seed/s1e4/320/180', rating: 9.5, airDate: '2022-03-25' },
          { id: 's1e5', number: 5, title: 'King\'s Mercy', description: 'Alfred must decide Uhtred\'s fate as political tensions threaten to tear the kingdom apart.', duration: '56 min', thumbnail: 'https://picsum.photos/seed/s1e5/320/180', rating: 8.9, airDate: '2022-04-01' },
          { id: 's1e6', number: 6, title: 'Two Kings', description: 'The final confrontation as Uhtred must choose between two worlds and two kings.', duration: '68 min', thumbnail: 'https://picsum.photos/seed/s1e6/320/180', rating: 9.6, airDate: '2022-04-08' },
        ],
      },
      {
        number: 2,
        year: '2023',
        episodes: [
          { id: 's2e1', number: 1, title: 'The Exile', description: 'Uhtred is banished from Wessex and must forge new alliances in the frozen North.', duration: '59 min', thumbnail: 'https://picsum.photos/seed/s2e1/320/180', rating: 9.2, airDate: '2023-01-15' },
          { id: 's2e2', number: 2, title: 'Winter\'s Edge', description: 'A harsh winter tests the strength of all factions as supplies run thin.', duration: '57 min', thumbnail: 'https://picsum.photos/seed/s2e2/320/180', rating: 9.0, airDate: '2023-01-22' },
          { id: 's2e3', number: 3, title: 'The False King', description: 'A pretender to the throne emerges, threatening to plunge England into civil war.', duration: '62 min', thumbnail: 'https://picsum.photos/seed/s2e3/320/180', rating: 9.3, airDate: '2023-01-29' },
          { id: 's2e4', number: 4, title: 'Fire and Sword', description: 'The siege of a great fortress brings old enemies face to face once more.', duration: '65 min', thumbnail: 'https://picsum.photos/seed/s2e4/320/180', rating: 9.4, airDate: '2023-02-05' },
          { id: 's2e5', number: 5, title: 'Dawn of Reckoning', description: 'Uhtred rallies his forces for the final push to reclaim his homeland.', duration: '70 min', thumbnail: 'https://picsum.photos/seed/s2e5/320/180', rating: 9.5, airDate: '2023-02-12' },
        ],
      },
    ],
    cast: [
      { name: 'Alexander Drake', role: 'Uhtred of Bebbanburg', photo: 'https://picsum.photos/seed/cast1/100/100' },
      { name: 'Elena Vasquez', role: 'Lady Aethelflaed', photo: 'https://picsum.photos/seed/cast2/100/100' },
      { name: 'Marcus Chen', role: 'Earl Ragnar', photo: 'https://picsum.photos/seed/cast3/100/100' },
      { name: 'Sophie Laurent', role: 'Queen Iseult', photo: 'https://picsum.photos/seed/cast4/100/100' },
      { name: 'James O\'Brien', role: 'Father Beocca', photo: 'https://picsum.photos/seed/cast5/100/100' },
    ],
    status: 'Completed',
    studio: 'Crown Television',
    country: 'United Kingdom',
    language: 'English',
    totalEpisodes: 11,
    featured: true,
    trending: true,
  },
  {
    id: 's2',
    title: 'Neon Shadows',
    poster: 'https://picsum.photos/seed/neonshadows/400/600',
    backdrop: 'https://picsum.photos/seed/neonshadowsbg/1200/680',
    description: 'In a rain-soaked megacity of 2089, a disgraced detective with cybernetic implants uncovers a conspiracy that links the city\'s most powerful corporations to a series of impossible murders. As she digs deeper, she discovers the truth about her own past and a technology that could either save humanity or destroy it forever.',
    genre: ['Sci-Fi', 'Thriller', 'Drama'],
    year: 2024,
    rating: 9.4,
    ratingCount: 312000,
    maturity: 'TV-MA',
    seasons: [
      {
        number: 1,
        year: '2024',
        episodes: [
          { id: 's2e1', number: 1, title: 'Ghost Protocol', description: 'Detective Mira Chen is called to a crime scene where the victim has been killed by their own neural implant.', duration: '54 min', thumbnail: 'https://picsum.photos/seed/ns1e1/320/180', rating: 9.2, airDate: '2024-06-07' },
          { id: 's2e2', number: 2, title: 'Digital Ghosts', description: 'Mira discovers a hidden data trail that leads to the highest levels of Apex Corporation.', duration: '52 min', thumbnail: 'https://picsum.photos/seed/ns1e2/320/180', rating: 9.4, airDate: '2024-06-14' },
          { id: 's2e3', number: 3, title: 'The Breach', description: 'A massive cyberattack paralyzes the city as Mira races against time to find the source.', duration: '58 min', thumbnail: 'https://picsum.photos/seed/ns1e3/320/180', rating: 9.5, airDate: '2024-06-21' },
          { id: 's2e4', number: 4, title: 'Mirror Image', description: 'Mira encounters someone who looks exactly like her and claims to be from the future.', duration: '56 min', thumbnail: 'https://picsum.photos/seed/ns1e4/320/180', rating: 9.6, airDate: '2024-06-28' },
          { id: 's2e5', number: 5, title: 'System Collapse', description: 'The conspiracy unravels as the city descends into chaos and Mira must make an impossible choice.', duration: '65 min', thumbnail: 'https://picsum.photos/seed/ns1e5/320/180', rating: 9.7, airDate: '2024-07-05' },
        ],
      },
    ],
    cast: [
      { name: 'Yuki Tanaka', role: 'Detective Mira Chen', photo: 'https://picsum.photos/seed/cast6/100/100' },
      { name: 'David Morales', role: 'Agent Kade', photo: 'https://picsum.photos/seed/cast7/100/100' },
      { name: 'Aria Blackwell', role: 'Dr. Elara Voss', photo: 'https://picsum.photos/seed/cast8/100/100' },
      { name: 'Leon Frost', role: 'CEO Julian Cross', photo: 'https://picsum.photos/seed/cast9/100/100' },
    ],
    status: 'Airing',
    studio: 'Vision Studios',
    country: 'United States',
    language: 'English',
    totalEpisodes: 5,
    featured: true,
    trending: true,
  },
  {
    id: 's3',
    title: 'Whispers of Seoul',
    poster: 'https://picsum.photos/seed/seoulwhispers/400/600',
    backdrop: 'https://picsum.photos/seed/seoulwhispersbg/1200/680',
    description: 'Two childhood friends from vastly different backgrounds reunite in modern-day Seoul. As they navigate the complexities of love, family expectations, and career ambitions, their bond is tested by secrets that have been buried for over a decade. A deeply emotional K-drama about the ties that bind us.',
    genre: ['Drama', 'Romance'],
    year: 2024,
    rating: 8.8,
    ratingCount: 198000,
    maturity: 'TV-14',
    seasons: [
      {
        number: 1,
        year: '2024',
        episodes: [
          { id: 's3e1', number: 1, title: 'Reunion', description: 'After twelve years apart, Ji-ah and Min-ho cross paths at a mutual friend\'s wedding.', duration: '65 min', thumbnail: 'https://picsum.photos/seed/sw1e1/320/180', rating: 8.7, airDate: '2024-02-10' },
          { id: 's3e2', number: 2, title: 'Unspoken Words', description: 'Old feelings resurface as Ji-ah and Min-ho spend a weekend at their childhood neighborhood.', duration: '63 min', thumbnail: 'https://picsum.photos/seed/sw1e2/320/180', rating: 8.9, airDate: '2024-02-17' },
          { id: 's3e3', number: 3, title: 'The Promise', description: 'A long-forgotten promise comes to light, threatening to destroy both their lives.', duration: '68 min', thumbnail: 'https://picsum.photos/seed/sw1e3/320/180', rating: 9.0, airDate: '2024-02-24' },
          { id: 's3e4', number: 4, title: 'Family Ties', description: 'Both families object to the rekindled relationship, forcing a painful decision.', duration: '66 min', thumbnail: 'https://picsum.photos/seed/sw1e4/320/180', rating: 8.8, airDate: '2024-03-02' },
        ],
      },
    ],
    cast: [
      { name: 'Park Soo-jin', role: 'Yoon Ji-ah', photo: 'https://picsum.photos/seed/cast10/100/100' },
      { name: 'Kim Tae-woo', role: 'Lee Min-ho', photo: 'https://picsum.photos/seed/cast11/100/100' },
      { name: 'Han Seo-yeon', role: 'Choi Eun-bi', photo: 'https://picsum.photos/seed/cast12/100/100' },
      { name: 'Lee Joon-hyuk', role: 'Kang Do-jin', photo: 'https://picsum.photos/seed/cast13/100/100' },
    ],
    status: 'Completed',
    studio: 'Seoul Drama House',
    country: 'South Korea',
    language: 'Korean',
    totalEpisodes: 4,
    featured: true,
    trending: true,
  },
  {
    id: 's4',
    title: 'Obsidian Crown',
    poster: 'https://picsum.photos/seed/obsidiancrown/400/600',
    backdrop: 'https://picsum.photos/seed/obsidiancrownbg/1200/680',
    description: 'In a realm where magic is drawn from precious stones, a young thief discovers she is the heir to an ancient throne. With dark forces closing in and allies she cannot trust, she must master forbidden magic and unite warring kingdoms before the Obsidian Crown falls into the wrong hands.',
    genre: ['Fantasy', 'Action', 'Drama'],
    year: 2023,
    rating: 9.0,
    ratingCount: 276000,
    maturity: 'TV-14',
    seasons: [
      {
        number: 1,
        year: '2023',
        episodes: [
          { id: 's4e1', number: 1, title: 'The Stone Thief', description: 'A street thief in the city of Valdren steals a gem that changes her life forever.', duration: '57 min', thumbnail: 'https://picsum.photos/seed/oc1e1/320/180', rating: 8.9, airDate: '2023-09-15' },
          { id: 's4e2', number: 2, title: 'Awakening', description: 'The stolen gem awakens dormant magic within Lyra, attracting dangerous attention.', duration: '55 min', thumbnail: 'https://picsum.photos/seed/oc1e2/320/180', rating: 9.1, airDate: '2023-09-22' },
          { id: 's4e3', number: 3, title: 'The Five Kingdoms', description: 'Lyra begins her journey across the five warring kingdoms, seeking answers about her past.', duration: '60 min', thumbnail: 'https://picsum.photos/seed/oc1e3/320/180', rating: 9.2, airDate: '2023-09-29' },
          { id: 's4e4', number: 4, title: 'Forbidden Magic', description: 'Lyra discovers a forbidden spell that could turn the tide of war.', duration: '62 min', thumbnail: 'https://picsum.photos/seed/oc1e4/320/180', rating: 9.3, airDate: '2023-10-06' },
          { id: 's4e5', number: 5, title: 'Crown of Shadows', description: 'The truth about the Obsidian Crown is revealed in a shocking season finale.', duration: '68 min', thumbnail: 'https://picsum.photos/seed/oc1e5/320/180', rating: 9.5, airDate: '2023-10-13' },
        ],
      },
      {
        number: 2,
        year: '2024',
        episodes: [
          { id: 's4e6', number: 1, title: 'The Usurper', description: 'With the throne usurped, Lyra must build an army from nothing.', duration: '59 min', thumbnail: 'https://picsum.photos/seed/oc2e1/320/180', rating: 9.1, airDate: '2024-03-01' },
          { id: 's4e7', number: 2, title: 'Stone and Blood', description: 'An ancient ritual demands a terrible sacrifice that could change everything.', duration: '61 min', thumbnail: 'https://picsum.photos/seed/oc2e2/320/180', rating: 9.3, airDate: '2024-03-08' },
          { id: 's4e8', number: 3, title: 'The Dragon\'s Gate', description: 'Lyra ventures into the forbidden realm of dragons to forge a powerful alliance.', duration: '65 min', thumbnail: 'https://picsum.photos/seed/oc2e3/320/180', rating: 9.4, airDate: '2024-03-15' },
        ],
      },
    ],
    cast: [
      { name: 'Freya Lindqvist', role: 'Lyra Stoneheart', photo: 'https://picsum.photos/seed/cast14/100/100' },
      { name: 'Rami Hassan', role: 'Prince Kaelen', photo: 'https://picsum.photos/seed/cast15/100/100' },
      { name: 'Isabella Romano', role: 'Sorceress Morwenna', photo: 'https://picsum.photos/seed/cast16/100/100' },
      { name: 'Omar Farouk', role: 'General Thorne', photo: 'https://picsum.photos/seed/cast17/100/100' },
      { name: 'Mei Lin', role: 'Ambassador Jade', photo: 'https://picsum.photos/seed/cast18/100/100' },
    ],
    status: 'Airing',
    studio: 'Eclipse Entertainment',
    country: 'International',
    language: 'English',
    totalEpisodes: 8,
    featured: false,
    trending: true,
  },
  {
    id: 's5',
    title: 'Midnight Kitchen',
    poster: 'https://picsum.photos/seed/midnightkitchen/400/600',
    backdrop: 'https://picsum.photos/seed/midnightkitchenbg/1200/680',
    description: 'After losing her Michelin-starred restaurant, a brilliant but temperamental chef takes over a failing late-night diner in Tokyo. With a ragtag crew of misfits, she transforms the humble eatery into the city\'s most sought-after underground dining experience, one midnight service at a time.',
    genre: ['Drama', 'Comedy'],
    year: 2024,
    rating: 8.6,
    ratingCount: 142000,
    maturity: 'TV-14',
    seasons: [
      {
        number: 1,
        year: '2024',
        episodes: [
          { id: 's5e1', number: 1, title: 'Burnt Offerings', description: 'Chef Ana arrives at the dingy diner and meets her eccentric new team.', duration: '48 min', thumbnail: 'https://picsum.photos/seed/mk1e1/320/180', rating: 8.5, airDate: '2024-04-05' },
          { id: 's5e2', number: 2, title: 'The First Service', description: 'Opening night is a disaster until an unexpected VIP guest changes everything.', duration: '50 min', thumbnail: 'https://picsum.photos/seed/mk1e2/320/180', rating: 8.7, airDate: '2024-04-12' },
          { id: 's5e3', number: 3, title: 'Secret Menu', description: 'Word spreads about the mysterious midnight menu, drawing both praise and envy.', duration: '52 min', thumbnail: 'https://picsum.photos/seed/mk1e3/320/180', rating: 8.8, airDate: '2024-04-19' },
          { id: 's5e4', number: 4, title: 'Rivalry', description: 'A rival chef opens across the street, sparking an intense culinary competition.', duration: '49 min', thumbnail: 'https://picsum.photos/seed/mk1e4/320/180', rating: 8.6, airDate: '2024-04-26' },
        ],
      },
    ],
    cast: [
      { name: 'Sakura Miyamoto', role: 'Chef Ana', photo: 'https://picsum.photos/seed/cast19/100/100' },
      { name: 'Kenji Watanabe', role: 'Takeshi', photo: 'https://picsum.photos/seed/cast20/100/100' },
      { name: 'Marie Dubois', role: 'Sophie', photo: 'https://picsum.photos/seed/cast21/100/100' },
    ],
    status: 'Completed',
    studio: 'Tokyo Story Co.',
    country: 'Japan',
    language: 'Japanese',
    totalEpisodes: 4,
    featured: false,
    trending: false,
  },
  {
    id: 's6',
    title: 'The White Lotus',
    poster: 'https://picsum.photos/seed/whitelotus2/400/600',
    backdrop: 'https://picsum.photos/seed/whitelotusbg/1200/680',
    description: 'A sharp social satire following the exploits of various guests and employees at an exclusive tropical resort over the course of a transformative week. As secrets surface and alliances shift, the paradise facade begins to crack, revealing the dark comedy of privilege and human nature.',
    genre: ['Drama', 'Comedy', 'Thriller'],
    year: 2023,
    rating: 8.9,
    ratingCount: 389000,
    maturity: 'TV-MA',
    seasons: [
      {
        number: 1,
        year: '2023',
        episodes: [
          { id: 's6e1', number: 1, title: 'Arrivals', description: 'Guests arrive at the exclusive White Lotus resort for what should be a perfect week.', duration: '60 min', thumbnail: 'https://picsum.photos/seed/wl1e1/320/180', rating: 8.8, airDate: '2023-10-20' },
          { id: 's6e2', number: 2, title: 'Crystal Waters', description: 'Underlying tensions surface as the resort\'s pristine image begins to fade.', duration: '58 min', thumbnail: 'https://picsum.photos/seed/wl1e2/320/180', rating: 9.0, airDate: '2023-10-27' },
          { id: 's6e3', number: 3, title: 'Muddy Waters', description: 'A mysterious incident at the spa throws the resort into chaos.', duration: '62 min', thumbnail: 'https://picsum.photos/seed/wl1e3/320/180', rating: 9.2, airDate: '2023-11-03' },
          { id: 's6e4', number: 4, title: 'Departures', description: 'The week ends with revelations that will change everyone forever.', duration: '65 min', thumbnail: 'https://picsum.photos/seed/wl1e4/320/180', rating: 9.4, airDate: '2023-11-10' },
        ],
      },
    ],
    cast: [
      { name: 'Patricia Clarkson', role: 'Victoria', photo: 'https://picsum.photos/seed/cast22/100/100' },
      { name: 'Murray Bartlett', role: 'Armond', photo: 'https://picsum.photos/seed/cast23/100/100' },
      { name: 'Jennifer Coolidge', role: 'Tanya', photo: 'https://picsum.photos/seed/cast24/100/100' },
      { name: 'Connie Britton', role: 'Nicole', photo: 'https://picsum.photos/seed/cast25/100/100' },
    ],
    status: 'Completed',
    studio: 'HBO Original',
    country: 'United States',
    language: 'English',
    totalEpisodes: 4,
    featured: false,
    trending: false,
  },
  {
    id: 's7',
    title: 'Abyss Protocol',
    poster: 'https://picsum.photos/seed/abyssprotocol/400/600',
    backdrop: 'https://picsum.photos/seed/abyssprotocolbg/1200/680',
    description: 'When a deep-sea research station discovers a signal from the ocean floor that predates human civilization, the crew realizes they\'ve awakened something ancient and terrifying. Cut off from the surface and running out of oxygen, they must survive against an intelligence that has waited millions of years to rise.',
    genre: ['Horror', 'Sci-Fi', 'Thriller'],
    year: 2024,
    rating: 8.7,
    ratingCount: 156000,
    maturity: 'TV-MA',
    seasons: [
      {
        number: 1,
        year: '2024',
        episodes: [
          { id: 's7e1', number: 1, title: 'Descent', description: 'The research team reaches the deepest part of the ocean and detects an impossible signal.', duration: '52 min', thumbnail: 'https://picsum.photos/seed/ap1e1/320/180', rating: 8.6, airDate: '2024-05-10' },
          { id: 's7e2', number: 2, title: 'The Signal', description: 'Dr. Reyes decodes the signal and discovers coordinates that lead to a massive structure.', duration: '54 min', thumbnail: 'https://picsum.photos/seed/ap1e2/320/180', rating: 8.8, airDate: '2024-05-17' },
          { id: 's7e3', number: 3, title: 'Contact', description: 'First contact with the entity goes catastrophically wrong, trapping the crew.', duration: '58 min', thumbnail: 'https://picsum.photos/seed/ap1e3/320/180', rating: 9.0, airDate: '2024-05-24' },
          { id: 's7e4', number: 4, title: 'Pressure', description: 'Oxygen levels drop as the entity begins to infiltrate the station\'s systems.', duration: '56 min', thumbnail: 'https://picsum.photos/seed/ap1e4/320/180', rating: 8.9, airDate: '2024-05-31' },
          { id: 's7e5', number: 5, title: 'The Rise', description: 'In a desperate final act, the crew must prevent the entity from reaching the surface.', duration: '63 min', thumbnail: 'https://picsum.photos/seed/ap1e5/320/180', rating: 9.2, airDate: '2024-06-07' },
        ],
      },
    ],
    cast: [
      { name: 'Ana Reyes', role: 'Dr. Elena Reyes', photo: 'https://picsum.photos/seed/cast26/100/100' },
      { name: 'Tom Hardwick', role: 'Captain Brooks', photo: 'https://picsum.photos/seed/cast27/100/100' },
      { name: 'Nadia Petrova', role: 'Dr. Katya Volkov', photo: 'https://picsum.photos/seed/cast28/100/100' },
    ],
    status: 'Completed',
    studio: 'Deep Blue Pictures',
    country: 'United States',
    language: 'English',
    totalEpisodes: 5,
    featured: false,
    trending: true,
  },
  {
    id: 's8',
    title: 'Golden Age',
    poster: 'https://picsum.photos/seed/goldenage/400/600',
    backdrop: 'https://picsum.photos/seed/goldenagebg/1200/680',
    description: 'Set during the 1920s jazz age in Paris, this lavish drama follows three ambitious women from different backgrounds who forge an unlikely alliance to build a fashion empire that challenges the male-dominated industry. Glamour, scandal, and revolution collide in a story of female empowerment.',
    genre: ['Drama', 'History'],
    year: 2024,
    rating: 8.5,
    ratingCount: 134000,
    maturity: 'TV-14',
    seasons: [
      {
        number: 1,
        year: '2024',
        episodes: [
          { id: 's8e1', number: 1, title: 'City of Light', description: 'Three women from different worlds meet at a scandalous Parisian party.', duration: '55 min', thumbnail: 'https://picsum.photos/seed/ga1e1/320/180', rating: 8.4, airDate: '2024-01-12' },
          { id: 's8e2', number: 2, title: 'Silk and Secrets', description: 'The women launch their fashion house while navigating the treacherous Paris elite.', duration: '57 min', thumbnail: 'https://picsum.photos/seed/ga1e2/320/180', rating: 8.6, airDate: '2024-01-19' },
          { id: 's8e3', number: 3, title: 'The Runway', description: 'Their debut fashion show becomes the talk of Paris, attracting dangerous admirers.', duration: '59 min', thumbnail: 'https://picsum.photos/seed/ga1e3/320/180', rating: 8.7, airDate: '2024-01-26' },
        ],
      },
    ],
    cast: [
      { name: 'Camille Rousseau', role: 'Marguerite', photo: 'https://picsum.photos/seed/cast29/100/100' },
      { name: 'Diana Okonkwo', role: 'Adanna', photo: 'https://picsum.photos/seed/cast30/100/100' },
      { name: 'Lena Schmidt', role: 'Hannah', photo: 'https://picsum.photos/seed/cast31/100/100' },
    ],
    status: 'Upcoming',
    studio: 'Lumière Productions',
    country: 'France',
    language: 'French',
    totalEpisodes: 3,
    featured: false,
    trending: false,
  },
  {
    id: 's9',
    title: 'Shadow Detective',
    poster: 'https://picsum.photos/seed/shadowdetective/400/600',
    backdrop: 'https://picsum.photos/seed/shadowdetectivebg/1200/680',
    description: 'A retired police detective who can communicate with the dead is pulled back into service when a serial killer starts leaving messages only the victims can reveal. Each case takes him deeper into a web of corruption that reaches the highest levels of power.',
    genre: ['Mystery', 'Thriller', 'Drama'],
    year: 2023,
    rating: 9.2,
    ratingCount: 287000,
    maturity: 'TV-MA',
    seasons: [
      {
        number: 1,
        year: '2023',
        episodes: [
          { id: 's9e1', number: 1, title: 'The Calling', description: 'Former detective Choi receives a vision that leads him to a body in the Han River.', duration: '64 min', thumbnail: 'https://picsum.photos/seed/sd1e1/320/180', rating: 9.1, airDate: '2023-05-05' },
          { id: 's9e2', number: 2, title: 'Echoes', description: 'The ghost of the victim reveals clues that point to a powerful politician.', duration: '62 min', thumbnail: 'https://picsum.photos/seed/sd1e2/320/180', rating: 9.3, airDate: '2023-05-12' },
          { id: 's9e3', number: 3, title: 'The Whisper Network', description: 'Choi discovers other people with similar abilities, forming an unlikely team.', duration: '60 min', thumbnail: 'https://picsum.photos/seed/sd1e3/320/180', rating: 9.2, airDate: '2023-05-19' },
          { id: 's9e4', number: 4, title: 'Red Herring', description: 'A false lead puts Choi in the crosshairs of the very people he\'s investigating.', duration: '66 min', thumbnail: 'https://picsum.photos/seed/sd1e4/320/180', rating: 9.4, airDate: '2023-05-26' },
          { id: 's9e5', number: 5, title: 'Into the Shadows', description: 'The serial killer\'s true identity is revealed in a devastating climax.', duration: '70 min', thumbnail: 'https://picsum.photos/seed/sd1e5/320/180', rating: 9.6, airDate: '2023-06-02' },
        ],
      },
      {
        number: 2,
        year: '2024',
        episodes: [
          { id: 's9e6', number: 1, title: 'Resurrection', description: 'A new case forces Choi to confront a ghost from his own past.', duration: '65 min', thumbnail: 'https://picsum.photos/seed/sd2e1/320/180', rating: 9.3, airDate: '2024-08-02' },
          { id: 's9e7', number: 2, title: 'The Archive', description: 'Choi discovers a secret archive of unsolved cases connected by a single thread.', duration: '63 min', thumbnail: 'https://picsum.photos/seed/sd2e2/320/180', rating: 9.4, airDate: '2024-08-09' },
          { id: 's9e8', number: 3, title: 'Final Judgment', description: 'The ultimate showdown as Choi faces the mastermind behind decades of murders.', duration: '72 min', thumbnail: 'https://picsum.photos/seed/sd2e3/320/180', rating: 9.5, airDate: '2024-08-16' },
        ],
      },
    ],
    cast: [
      { name: 'Song Kang-ho', role: 'Detective Choi', photo: 'https://picsum.photos/seed/cast32/100/100' },
      { name: 'Bae Suzy', role: 'Officer Park', photo: 'https://picsum.photos/seed/cast33/100/100' },
      { name: 'Yoo Ah-in', role: 'Prosecutor Kim', photo: 'https://picsum.photos/seed/cast34/100/100' },
      { name: 'Han So-hee', role: 'Journalist Lee', photo: 'https://picsum.photos/seed/cast35/100/100' },
    ],
    status: 'Completed',
    studio: 'Seoul Noir Studio',
    country: 'South Korea',
    language: 'Korean',
    totalEpisodes: 8,
    featured: false,
    trending: true,
  },
  {
    id: 's10',
    title: 'Orbit',
    poster: 'https://picsum.photos/seed/orbittv/400/600',
    backdrop: 'https://picsum.photos/seed/orbittvbg/1200/680',
    description: 'When Earth\'s first colony ship goes silent halfway to Proxima Centauri, a rescue mission discovers the passengers haven\'t just survived — they\'ve evolved. The rescuers must grapple with the implications of humanity\'s next stage while facing their own transformation.',
    genre: ['Sci-Fi', 'Drama', 'Mystery'],
    year: 2024,
    rating: 9.3,
    ratingCount: 198000,
    maturity: 'TV-14',
    seasons: [
      {
        number: 1,
        year: '2024',
        episodes: [
          { id: 's10e1', number: 1, title: 'Silent Signal', description: 'The colony ship Prometheus goes dark, and Commander Shaw is sent to investigate.', duration: '55 min', thumbnail: 'https://picsum.photos/seed/or1e1/320/180', rating: 9.2, airDate: '2024-09-06' },
          { id: 's10e2', number: 2, title: 'First Contact', description: 'The rescue team boards Prometheus and finds the colonists... changed.', duration: '58 min', thumbnail: 'https://picsum.photos/seed/or1e2/320/180', rating: 9.4, airDate: '2024-09-13' },
          { id: 's10e3', number: 3, title: 'Evolution', description: 'Shaw discovers the colonists have developed abilities that defy known science.', duration: '60 min', thumbnail: 'https://picsum.photos/seed/or1e3/320/180', rating: 9.5, airDate: '2024-09-20' },
          { id: 's10e4', number: 4, title: 'The Choice', description: 'The crew must decide: return to Earth or join the evolution.', duration: '62 min', thumbnail: 'https://picsum.photos/seed/or1e4/320/180', rating: 9.6, airDate: '2024-09-27' },
        ],
      },
    ],
    cast: [
      { name: 'Idris Okonkwo', role: 'Commander Shaw', photo: 'https://picsum.photos/seed/cast36/100/100' },
      { name: 'Eva Green', role: 'Dr. Nova Chen', photo: 'https://picsum.photos/seed/cast37/100/100' },
      { name: 'Rami Malek', role: 'Prophet', photo: 'https://picsum.photos/seed/cast38/100/100' },
    ],
    status: 'Airing',
    studio: 'Cosmic Pictures',
    country: 'International',
    language: 'English',
    totalEpisodes: 4,
    featured: false,
    trending: true,
  },
  {
    id: 's11',
    title: 'Ember Falls',
    poster: 'https://picsum.photos/seed/emberfalls/400/600',
    backdrop: 'https://picsum.photos/seed/emberfallsbg/1200/680',
    description: 'In a small mountain town hiding a terrible secret, a wildfire threatens to expose decades of buried truths. As the flames close in, the townspeople must confront what they\'ve done — and what they\'re willing to do to survive.',
    genre: ['Thriller', 'Drama', 'Mystery'],
    year: 2024,
    rating: 8.8,
    ratingCount: 167000,
    maturity: 'TV-MA',
    seasons: [
      {
        number: 1,
        year: '2024',
        episodes: [
          { id: 's11e1', number: 1, title: 'Smoke Rising', description: 'The fire begins and so do the questions about what really happened at Ember Lodge.', duration: '52 min', thumbnail: 'https://picsum.photos/seed/ef1e1/320/180', rating: 8.7, airDate: '2024-07-12' },
          { id: 's11e2', number: 2, title: 'Ashes to Ashes', description: 'A body is found in the fire zone, and all evidence points to the town\'s beloved sheriff.', duration: '50 min', thumbnail: 'https://picsum.photos/seed/ef1e2/320/180', rating: 8.9, airDate: '2024-07-19' },
          { id: 's11e3', number: 3, title: 'Flashpoint', description: 'The truth about Ember Falls threatens to destroy the entire community.', duration: '55 min', thumbnail: 'https://picsum.photos/seed/ef1e3/320/180', rating: 9.0, airDate: '2024-07-26' },
        ],
      },
    ],
    cast: [
      { name: 'Sarah Mitchell', role: 'Firefighter Kate', photo: 'https://picsum.photos/seed/cast39/100/100' },
      { name: 'Robert Taylor', role: 'Sheriff Hayes', photo: 'https://picsum.photos/seed/cast40/100/100' },
      { name: 'Mia Chang', role: 'Reporter Lisa', photo: 'https://picsum.photos/seed/cast41/100/100' },
    ],
    status: 'Completed',
    studio: 'Mountain View Films',
    country: 'United States',
    language: 'English',
    totalEpisodes: 3,
    featured: false,
    trending: false,
  },
  {
    id: 's12',
    title: 'Tokyo Drifters',
    poster: 'https://picsum.photos/seed/tokyodrifters/400/600',
    backdrop: 'https://picsum.photos/seed/tokyodriftersbg/1200/680',
    description: 'Three runaway teenagers form an underground racing crew in the neon-lit streets of Tokyo, competing against the city\'s most dangerous drivers. But when they uncover a human trafficking ring operating through the racing scene, the stakes become life and death.',
    genre: ['Action', 'Drama', 'Thriller'],
    year: 2024,
    rating: 8.4,
    ratingCount: 213000,
    maturity: 'TV-MA',
    seasons: [
      {
        number: 1,
        year: '2024',
        episodes: [
          { id: 's12e1', number: 1, title: 'Ignition', description: 'Three strangers meet at an illegal street race and form an instant connection.', duration: '50 min', thumbnail: 'https://picsum.photos/seed/td1e1/320/180', rating: 8.3, airDate: '2024-03-15' },
          { id: 's12e2', number: 2, title: 'Red Line', description: 'The crew enters a high-stakes tournament that draws the attention of the Yakuza.', duration: '52 min', thumbnail: 'https://picsum.photos/seed/td1e2/320/180', rating: 8.5, airDate: '2024-03-22' },
          { id: 's12e3', number: 3, title: 'Drift King', description: 'A legendary drifter offers to train the crew for the championship race.', duration: '54 min', thumbnail: 'https://picsum.photos/seed/td1e3/320/180', rating: 8.6, airDate: '2024-03-29' },
          { id: 's12e4', number: 4, title: 'Nite Shift', description: 'The crew discovers the dark truth behind the racing empire.', duration: '56 min', thumbnail: 'https://picsum.photos/seed/td1e4/320/180', rating: 8.8, airDate: '2024-04-05' },
        ],
      },
    ],
    cast: [
      { name: 'Takeshi Yamamoto', role: 'Kenji', photo: 'https://picsum.photos/seed/cast42/100/100' },
      { name: 'Lisa Park', role: 'Yuna', photo: 'https://picsum.photos/seed/cast43/100/100' },
      { name: 'Carlos Rivera', role: 'Marco', photo: 'https://picsum.photos/seed/cast44/100/100' },
    ],
    status: 'Completed',
    studio: 'Neon Valley Studios',
    country: 'Japan',
    language: 'Japanese',
    totalEpisodes: 4,
    featured: false,
    trending: false,
  },
];

// Indexes
export const seriesMap = new Map(series.map((s) => [s.id, s]));

export function getSeriesById(id: string): Series | undefined {
  return seriesMap.get(id);
}

export function getFeaturedSeries(): Series[] {
  return series.filter((s) => s.featured);
}

export function getTrendingSeries(): Series[] {
  return series.filter((s) => s.trending);
}

export function getSeriesByGenre(genre: string): Series[] {
  return series.filter((s) => s.genre.includes(genre));
}

export function searchSeries(query: string): Series[] {
  const q = query.toLowerCase();
  return series.filter(
    (s) =>
      s.title.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.genre.some((g) => g.toLowerCase().includes(q)) ||
      s.cast.some((c) => c.name.toLowerCase().includes(q))
  );
}

export function getTopSeries(limit = 10): Series[] {
  return [...series].sort((a, b) => b.rating - a.rating).slice(0, limit);
}

export function getNewEpisodes(): Series[] {
  return series.filter((s) => s.status === 'Airing').slice(0, 10);
}

export function getRecentlyAdded(): Series[] {
  return [...series].sort((a, b) => b.year - a.year).slice(0, 10);
}

// Default continue watching data
export const defaultContinueWatching: WatchProgress[] = [
  { seriesId: 's1', seasonNumber: 1, episodeNumber: 3, progress: 65 },
  { seriesId: 's2', seasonNumber: 1, episodeNumber: 2, progress: 40 },
  { seriesId: 's4', seasonNumber: 2, episodeNumber: 1, progress: 80 },
  { seriesId: 's9', seasonNumber: 2, episodeNumber: 2, progress: 25 },
];
