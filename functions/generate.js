export async function onRequest() {
  const SECRET = "secret123";
  const ts = Date.now().toString();
  const token = Math.random().toString(36).substring(2);

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const sigBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(ts)
  );

  const sig = [...new Uint8Array(sigBuffer)]
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");

  return new Response(
    `https://yourname.pages.dev/jnk?ts=${ts}&sig=${sig}&token=${token}`
  );
}
