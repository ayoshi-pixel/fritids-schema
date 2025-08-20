function addTidRad() {
  const tbody = document.getElementById("schema-body");
  const rad = document.createElement("tr");

  // Vecka-dropdown
  let html = `<td>
    <select class="vecka">
      ${Array.from({ length: 52 }, (_, i) => `<option>Vecka ${i + 1}</option>`).join("")}
    </select>
  </td>`;

  // Tid-input
  html += `<td><input type="time"></td>`;

  // Dagar och aktiviteter
  const dagar = ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag"];
  dagar.forEach(() => {
    html += `
      <td>
        <select>
          <option value="">Välj aktivitet</option>
          <option>🎮 Spel</option>
          <option>📚 Läsa</option>
          <option>🎵 Musik</option>
          <option>🎨 Måla</option>
          <option>⚽ Sport</option>
          <option>🧑‍🤝‍🧑 Samling</option>
          <option>🍎 Mellanmål</option>
          <option>🎬 Film</option>
          <option>🧩 Pussel</option>
          <option>🎲 Brädspel</option>
          <option>🎤 Karaoke</option>
          <option>🧘‍♀️ Yoga</option>
          <option>🕺 Dans</option>
          <option>🧑‍🍳 Matlagning</option>
          <option>📖 Berättande</option>
          <option>🌳 Naturutflykt</option>
          <option>🎉 Fest</option>
          <option>🛠️ Hantverk</option>
          <option>🎭 Teater</option>
          <option>🥪 Mellanmål</option>
        </select>
      </td>
    `;
  });

  rad.innerHTML = html;
  tbody.appendChild(rad);
}

function sparaSchema() {
    const schema = [];
    document.querySelectorAll("#schema-body tr").forEach(rad => {
        const tid = rad.querySelector("input[type='time']").value;
        const aktiviteter = Array.from(rad.querySelectorAll("select")).map(sel => sel.value);
        schema.push({ tid, aktiviteter });
    });

    fetch("/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(schema)
    }).then(res => res.json()).then(data => {
        alert("✅ Schema sparat!");
    });
}

