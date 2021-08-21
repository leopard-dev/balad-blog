import { findAll } from "highlight-words-core";

const highlightText = (textToHighlight: string, searchWords: string[]) => {
  const chunks = findAll({
    searchWords,
    textToHighlight,
  });

  const highlightedText = chunks
    .map((chunk: any) => {
      const { end, highlight, start } = chunk;
      const text = textToHighlight.substr(start, end - start);
      if (highlight) {
        return `<mark>${text}</mark>`;
      } else {
        return text;
      }
    })
    .join("");

  return highlightedText;
};

export default highlightText;
