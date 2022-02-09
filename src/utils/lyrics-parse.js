const parseExp = /\[(\d{2}):(\d{2}).(\d{2,3})\]/;

function parseLyrics(lyricsStr) {
  const arrLyricsStr = lyricsStr.split('\n');
  const lyrics = [];

  arrLyricsStr.forEach((line) => {
    if (line) {
      const timeRes = parseExp.exec(line);
      const time =
        Number(timeRes[1] * 60 * 1000) +
        Number(timeRes[2] * 1000) +
        Number(timeRes[3].length === 2 ? timeRes[3] * 10 : timeRes[3]);
      const content = line.replace(parseExp, '').trim();
      lyrics.push({ time, content });
    }
  });
  return lyrics;
}

export { parseLyrics };
