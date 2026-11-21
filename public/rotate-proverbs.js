(() => {
  const intervalMilliseconds = 15000;

  function parseProverbs(text) {
    const lines = text.replace(/\r/g, '').split('\n');
    const proverbs = [];
    let current = null;
    let readingFrench = false;

    for (const line of lines) {
      const wolofMatch = line.match(/^(\d+)\.\s*(.*)$/);

      if (wolofMatch) {
        if (current) {
          proverbs.push(current);
        }

        current = { wolof: wolofMatch[2].trim(), french: [] };
        readingFrench = true;
        continue;
      }

      if (!current) {
        continue;
      }

      if (line.trim() === '') {
        continue;
      }

      if (readingFrench) {
        current.french.push(line.trim());
      }
    }

    if (current) {
      proverbs.push(current);
    }

    return proverbs.map((proverb) => ({
      wolof: proverb.wolof,
      french: proverb.french.join(' ').replace(/\s+/g, ' ').trim(),
    })).filter((proverb) => proverb.wolof && proverb.french);
  }

  async function startRotation() {
    const element = document.getElementById('wolof-french-proverb');
    if (!element) {
      return;
    }

    try {
      const response = await fetch('/Prvrb.txt');
      if (!response.ok) {
        throw new Error(`Unable to load Prvrb.txt: ${response.status}`);
      }

      const proverbs = parseProverbs(await response.text());
      if (!proverbs.length) {
        return;
      }

      let index = 0;

      const updateProverb = () => {
        const proverb = proverbs[index];
        element.textContent = `${proverb.wolof}\n${proverb.french}`;
        index = (index + 1) % proverbs.length;
      };

      updateProverb();
      window.setInterval(updateProverb, intervalMilliseconds);
    } catch (error) {
      console.error(error);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startRotation);
  } else {
    startRotation();
  }
})();
