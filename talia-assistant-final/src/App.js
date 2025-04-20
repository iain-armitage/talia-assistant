import React, { useState } from "react";

function App() {
  const [openaiKey, setOpenaiKey] = useState("");
  const [elevenLabsKey, setElevenLabsKey] = useState("");
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const sendMessage = async () => {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openaiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      setResponse("Error: " + (err?.error?.message || "Unknown error"));
      return;
    }

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || "No reply.";
    setResponse(reply);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Talia Lawson - AI Assistant</h1>
      <div>
        <label>OpenAI API Key: </label>
        <input value={openaiKey} onChange={(e) => setOpenaiKey(e.target.value)} />
      </div>
      <div>
        <label>ElevenLabs API Key: </label>
        <input value={elevenLabsKey} onChange={(e) => setElevenLabsKey(e.target.value)} />
      </div>
      <textarea
        rows="4"
        cols="50"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask Talia something..."
      />
      <button onClick={sendMessage}>Send</button>
      <p><strong>Response:</strong> {response}</p>
    </div>
  );
}

export default App;
