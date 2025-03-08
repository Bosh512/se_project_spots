export function setButtonText(button, isLoading, loadingText, defaultText) {
  if (isLoading) {
    button.textContent = loadingText;
    console.log(`Setting the text to ${loadingText}`);
  } else {
    button.textContent = defaultText;
  }
}
