export function copyStylesToIFrame(
  targetDocument: Document,
  sourceDocument: Document
) {
  Array.from(sourceDocument.styleSheets).forEach((styleSheet) => {
    if (styleSheet.cssRules) {
      try {
        const newStyleEl = targetDocument.createElement('style');
        newStyleEl.textContent = Array.from(styleSheet.cssRules)
          .map((cssRule) => cssRule.cssText)
          .join('\n');
        targetDocument.head.appendChild(newStyleEl);
      } catch (e) {
        // Some browsers do not allow accessing cssRules for external stylesheets
        console.warn('Error while accessing cssRules:', e);
      }
    }
  });
}
