export async function revalidateMessages() {
  const url = new URL(window.location.toString());

  const html = await fetch(url.toString(), {
    method: "GET",
  }).then((res) => res.text());

  const p = new DOMParser();
  const doc = p.parseFromString(html, "text/html");
  document
    .querySelector("#messages-list")!
    .replaceWith(doc.querySelector("#messages-list")!);
}
