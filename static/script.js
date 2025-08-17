const aktiviteterList = ["", "📱 iPad", "💻 IKT", "⚽ Fotbollsplan", "🚌 Utflykt", "🧍‍♀️🧍‍♂️ Samling", "🌳 Utelek", "🎨 Måla", "📚 Läxa", "🎵 Musik", "💃 Dans", "🎲 Spel", "🎬 Film", "🧱 Bygga", "📖 Läsning", "✂️ Pyssel", "😴 Vila", "🥪 Mellanmål"];

document.addEventListener("DOMContentLoaded", async () => {
  const tbody = document.querySelector("#schema-tabell tbody");
  const addRowBtn = document.getElementById("addRowBtn");
  const sparaBtn = document.getElementById("sparaBtn");

  async function laddaSchema() {
    const res = await fetch("/api/aktiviteter");
    const data = await res.json();
    tbody.innerHTML = "";
    data.forEach(rad => skapaRad(rad));
  }

  function skapaRad(radData={}) {
    const tr = document.createElement("tr");
    const tidCell = document.createElement("td");
    const tidInput = document.createElement("input");
    tidInput.type = "text";
    tidInput.value = radData.tid || "";
    tidCell.appendChild(tidInput);
    tr.appendChild(tidCell);

    ["mandag","tisdag","onsdag","torsdag","fredag"].forEach(dag=>{
      const td = document.createElement("td");
      const select = document.createElement("select");
      aktiviteterList.forEach(a=>{
        const opt = document.createElement("option");
        opt.textContent = a;
        if(a===radData.namn) opt.selected=true;
        select.appendChild(opt);
      });
      td.appendChild(select);
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  }

  addRowBtn.addEventListener("click", ()=>skapaRad());

  sparaBtn.addEventListener("click", async ()=>{
    const rows=[];
    tbody.querySelectorAll("tr").forEach(tr=>{
      const rad={ tid: tr.querySelector("td input").value };
      ["mandag","tisdag","onsdag","torsdag","fredag"].forEach((dag,i)=>{
        rad[dag]=tr.querySelectorAll("td select")[i].value;
        rad["namn"]=tr.querySelectorAll("td select")[i].value;
      });
      rows.push(rad);
    });
    await fetch("/api/aktiviteter", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(rows) });
    alert("✅ Schemat sparat!");
  });

  laddaSchema();
});

function laddaNerPDF() {
  const element = document.getElementById('schema-tabell');
  html2pdf().set({ margin:0.5, filename:'fritidsschema.pdf', image:{type:'jpeg', quality:0.98}, html2canvas:{scale:2}, jsPDF:{unit:'in', format:'letter', orientation:'portrait'} }).from(element).save();
}
