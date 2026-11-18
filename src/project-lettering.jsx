const heroGlyphs = {
  F: [586, 74], I: [820, 30], L: [753, 65], O: [331, 89],
  P: [255, 79], R: [425, 79], T: [504, 80],
};

const drawnGlyphs = {
  A: [94, 'M3 104C12 89 16 71 23 53L43 2H61L79 64C84 81 87 94 93 104H65C66 94 62 78 59 68H28C24 81 22 94 24 104ZM30 62H57L46 20Z'],
  B: [81, 'M3 3H42C63 3 76 13 76 29C76 41 66 50 55 53C71 56 79 65 79 78C79 94 66 104 43 104H3C9 75 9 32 3 3ZM28 9C25 20 25 37 26 49H36C48 49 56 41 56 29C56 16 50 9 38 9ZM26 55C25 72 26 88 28 98H39C52 98 59 90 59 77C59 63 50 55 36 55Z'],
  C: [80, 'M73 6L76 36C66 16 55 6 43 6C26 6 20 23 21 49C23 75 34 96 52 96C64 96 72 88 79 75C74 94 63 106 44 106C17 106 3 86 3 55C3 25 20 1 46 1C57 1 66 6 73 6Z'],
  D: [88, 'M3 3H39C70 3 87 22 87 51C87 83 68 104 39 104H3C9 75 10 32 3 3ZM28 10C25 36 25 73 29 97H38C57 97 67 81 67 52C67 25 56 9 38 9Z'],
  E: [73, 'M3 3H71L65 33C60 18 49 9 29 9C26 21 26 37 27 49C41 49 50 43 58 34V69C49 59 40 55 27 55C26 71 27 87 29 98C48 98 60 88 69 72L65 104H3C9 77 10 31 3 3Z'],
  G: [87, 'M77 7L78 36C69 17 57 6 44 6C27 6 20 24 22 51C24 78 35 100 52 100C57 100 61 99 65 96V73C65 66 64 59 59 54H85C82 61 81 68 81 77V94C70 102 58 106 44 106C18 106 3 87 3 56C3 25 21 1 46 1C59 1 67 7 77 7Z'],
  M: [111, 'M3 104C10 81 12 34 8 3H32L57 68L80 3H104C99 31 101 75 109 104H82C86 83 85 41 83 19L53 104H48L17 22C15 46 16 82 25 104Z'],
  N: [90, 'M3 104C10 78 11 30 5 3H29L74 78C75 53 75 22 68 3H89C82 25 81 74 85 104H66L17 23C15 49 16 86 24 104Z'],
  Q: [93, 'M50 1C77 1 91 23 87 50C84 71 76 86 64 95C74 104 82 109 92 110C77 119 62 112 51 102C47 104 42 106 38 106C12 106-2 86 2 58C6 28 23 1 50 1ZM51 6C33 6 20 51 22 79C23 92 29 101 38 101C42 101 45 99 48 96C44 91 41 86 39 80C46 82 51 84 55 87C64 71 68 46 66 28C65 15 60 6 51 6Z'],
  S: [74, 'M66 7V36C58 19 48 6 33 6C22 6 16 12 16 21C16 31 25 37 41 45C61 54 72 64 72 80C72 96 58 106 37 106C24 106 13 101 5 101L3 69C13 88 25 101 40 101C50 101 57 94 57 85C57 74 47 68 30 60C12 51 3 42 3 27C3 12 15 1 35 1C48 1 59 7 66 7Z'],
  U: [85, 'M2 3H30C25 20 25 41 25 64C25 86 31 98 46 98C61 98 70 87 70 66C70 34 70 18 63 3H84C78 19 77 40 77 67C77 92 64 106 42 106C18 106 7 92 7 67C7 41 8 20 2 3Z'],
  Y: [91, 'M2 3H31C30 14 34 26 41 42L50 61L61 38C68 23 71 13 68 3H90C79 15 73 27 66 42L52 70C51 82 52 93 55 104H27C32 93 33 82 32 69L18 38C12 24 7 12 2 3Z'],
  Z: [79, 'M9 3H77L25 98C47 98 62 91 77 70L72 104H1L53 9C32 9 19 17 7 34Z'],
};

export function ProjectLettering({ title }) {
  const words = title.toUpperCase().trim().split(/\s+/);
  if (words.some(word => [...word].some(letter => !heroGlyphs[letter] && !drawnGlyphs[letter]))) {
    return <span className="project-title">{title}</span>;
  }

  return <span className="project-title project-lettering">
    <span className="sr-only">{title}</span>
    {words.map((word, wordIndex) => {
      let width = 0;
      const glyphs = [...word].map((letter, index) => {
        const x = width;
        const hero = heroGlyphs[letter];
        if (hero) {
          const [origin, advance] = hero;
          width += advance + 4;
          return <use key={index} href={`#hero-letter-${letter.toLowerCase()}`} transform={`translate(${x - origin} -138)`} />;
        }
        const [advance, path] = drawnGlyphs[letter];
        width += advance + 4;
        return <path key={index} d={path} transform={`translate(${x})`} />;
      });
      return <svg key={wordIndex} aria-hidden="true" viewBox={`0 0 ${width} 116`} style={{ width: `${width / 106}em` }} fill="currentColor" fillRule="evenodd">
        {glyphs}
      </svg>;
    })}
  </span>;
}
