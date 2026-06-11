import fetch from 'node-fetch';

async function test() {
  try {
    const res = await fetch("https://storage-unless-sublease.ngrok-free.dev/webhook/dfbc64e8-4424-4d14-ae0f-8f600b990beb", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true"
      },
      body: JSON.stringify({ nome: "Test", whatsapp: "123", email: "test@test.com" })
    });
    console.log(res.status);
    console.log(await res.text());
  } catch (e) {
    console.error(e);
  }
}
test();
