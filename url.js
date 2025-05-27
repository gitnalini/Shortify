 const inputURL = document.querySelector(".inputURL");
const shortBtn = document.querySelector(".shortBtn");
const shortenedURL = document.getElementById("shortenedURL");
const loader = document.getElementById("loader");
const copyBtn = document.getElementById("copyBtn");

const fetchURL = async () => {
  const url = inputURL.value.trim();
  if (!url) return;

  shortenedURL.innerText = "";
  copyBtn.style.display = "none";
  loader.style.display = "block";

  const apiURL = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`;

  fetch(apiURL)
    .then(res => res.text())
    .then(data => {
      loader.style.display = "none";
      shortenedURL.innerText = data;
      copyBtn.style.display = "inline-block";
      inputURL.value = ""; // clear input
    })
    .catch(() => {
      loader.style.display = "none";
      shortenedURL.innerText = "An error occurred!";
    });
};

const copyToClipboard = () => {
  const text = shortenedURL.innerText;
  navigator.clipboard.writeText(text);
  alert("Copied to clipboard!");
};

shortBtn.addEventListener("click", fetchURL);
inputURL.addEventListener("keypress", (e) => {
  if (e.key === "Enter") fetchURL();
});
copyBtn.addEventListener("click", copyToClipboard);
