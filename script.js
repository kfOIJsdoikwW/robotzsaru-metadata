const VALID_CODE = "05010/1142/2026.bü.";
const DEBUG_CODE = "1";

function processLogin() {
    const input = document.getElementById('access-code');
    const msg = document.getElementById('status-msg');
    const container = document.getElementById('main-container');

    if (input.value.trim() === VALID_CODE || input.value.trim() === DEBUG_CODE) {
        msg.innerText = "AZONOSÍTÁS SIKERES...";
        msg.style.color = "var(--success-green)";
        input.style.borderColor = "var(--success-green)";
        
        setTimeout(() => {
            document.getElementById('login-section').classList.add('hidden');
            document.getElementById('loading-screen').classList.remove('hidden');
            document.getElementById('loading-screen').style.display = 'flex';
            
            setTimeout(() => {
                document.getElementById('loading-screen').style.display = 'none';
                document.getElementById('evidence-section').classList.remove('hidden');
            }, 2600);
        }, 800);
    } else {
        msg.innerText = "HOZZÁFÉRÉS MEGTAGADVA!";
        msg.style.color = "var(--error-red)";
        container.classList.add('error-shake');
        setTimeout(() => container.classList.remove('error-shake'), 500);
    }
}

function toggleDetails() {
    const details = document.getElementById('personal-data');
    details.style.display = (details.style.display === 'block') ? 'none' : 'block';
}

function toggleDigitalFiles() {
    const gallery = document.getElementById('digital-gallery');
    gallery.style.display = (gallery.style.display === 'block') ? 'none' : 'block';
}

function accessDenied() {
    const lockedBox = document.getElementById('locked-files');
    const container = document.getElementById('main-container');
    const evidenceTitle = document.querySelector("#evidence-section h2");
    const chatBox = document.getElementById('system-chat');
    const chatMsg = document.getElementById('chat-message');

    // 1. Pirosra váltás
    lockedBox.style.borderColor = "var(--error-red)";
    lockedBox.style.color = "var(--error-red)";
    lockedBox.style.background = "rgba(255, 0, 0, 0.1)";
    evidenceTitle.style.color = "var(--error-red)";
    evidenceTitle.style.borderColor = "var(--error-red)";

    // 2. Chatbox megjelenítése és üzenet beírása
    chatBox.classList.remove('hidden');
    chatMsg.innerText = "RENDSZERÜZENET: Jogosultság megtagadva! (Err. #0012)";
    chatMsg.style.color = "var(--error-red)";

    // 3. Rázkódás
    container.classList.add('error-shake');
    setTimeout(() => container.classList.remove('error-shake'), 500);

    // 4. Visszaállítás 3 másodperc múlva
    setTimeout(() => {
        lockedBox.style.borderColor = "var(--police-blue)";
        lockedBox.style.color = "var(--police-blue)";
        lockedBox.style.background = "rgba(0,0,0,0.5)";
        
        evidenceTitle.style.color = "var(--police-blue)";
        evidenceTitle.style.borderColor = "var(--police-blue)";
        
        chatBox.classList.add('hidden');
    }, 10000);
}

// Gyanúsított adatok
const suspectsData = [
    { name: "Kovács Márk", dob: "1995.05.12.", img: "gyan1.png", id: "BK-4421" },
    { name: "Szabó Luca", dob: "1998.11.02.", img: "gyan2.png", id: "BK-8890" },
    { name: "Horváth Tamás", dob: "1987.02.25.", img: "gyan3.png", id: "BK-1123" },
    { name: "Nagy Erzsébet", dob: "2001.08.19.", img: "gyan4.png", id: "BK-5564" },
    { name: "Balogh Péter", dob: "1992.12.30.", img: "gyan5.png", id: "BK-9901" }
];

function toggleSuspects() {
    const container = document.getElementById('suspects-list-container');
    const grid = document.getElementById('suspects-grid');
    
    if (container.classList.contains('hidden')) {
        grid.innerHTML = ''; // Alaphelyzet
        suspectsData.forEach((s, index) => {
            const div = document.createElement('div');
            div.className = 'suspect-item';
            div.style.animationDelay = `${index * 0.1}s`;
            div.onclick = () => openSuspectOverlay(s);
            div.innerHTML = `
                <img src="${s.img}" onerror="this.src='https://via.placeholder.com/150/050a14/00d4ff?text=IMAGE'">
                <h5>${s.name}</h5>
                <p>${s.dob}</p>
            `;
            grid.appendChild(div);
        });
        container.classList.remove('hidden');
    } else {
        container.classList.add('hidden');
    }
}

function openSuspectOverlay(suspect) {
    const overlay = document.getElementById('suspect-overlay');
    document.getElementById('overlay-img').src = suspect.img;
    document.getElementById('overlay-name').innerText = suspect.name;
    
    // Filler adatok generálása
    const fillerInfo = `
        <p><strong>Azonosító:</strong> ${suspect.id}</p>
        <p><strong>Születési dátum:</strong> ${suspect.dob}</p>
        <p><strong>DNS Profil:</strong> AT-8842-X9</p>
        <p><strong>Utolsó ismert tartózkodás:</strong> Budapest, VIII. kerület</p>
        <p><strong>Bűncselekmény:</strong> Tiltott szoftver-módosítás, adathalászat.</p>
        <p><strong>Veszélyességi fokozat:</strong> Magas</p>
        <p><strong>Személyleírás:</strong> Közepes testalkat, sötét haj, tetoválás a bal alkaron.</p>
        <p><strong>Megjegyzés:</strong> Ellenállást tanúsíthat az intézkedés során.</p>
        <p>-----------------------------------</p>
        <p style="color:red">FIGYELEM: Az adatok szigorúan bizalmasak!</p>
    `;
    
    document.getElementById('overlay-data').innerHTML = fillerInfo;
    overlay.classList.remove('hidden');
}

function closeSuspectOverlay() {
    document.getElementById('suspect-overlay').classList.add('hidden');
}

// A meglévő processLogin és egyéb függvények változatlanul maradnak...

// --- METAADAT ELEMZŐ FUNKCIÓK ---

// Itt adhatod meg, hogy milyen fájlnevet fogadjon el a rendszer.
// Jelenleg minden fájlt elfogad, aminek a nevében benne van a "titkos" vagy "bizonyitek" szó.
const ACCEPTED_KEYWORDS = ["titkos", "bizonyitek"];

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const statusDiv = document.getElementById('meta-status');
    const card = event.target.closest('.evidence-card');

    // Animált elemzés fázis
    statusDiv.innerText = "Fájl fogadva. EXIF olvasása...";
    statusDiv.style.color = "var(--police-blue)";

    setTimeout(() => {
        const fileNameLower = file.name.toLowerCase();
        
        // Ellenőrizzük, hogy a fájlnév tartalmazza-e az elvárt kulcsszavakat
        const isMatch = ACCEPTED_KEYWORDS.some(keyword => fileNameLower.includes(keyword));

        if (isMatch) {
            // SIKERES ELEMZÉS
            statusDiv.innerText = "Egyezés! Rejtett adatok dekódolása...";
            statusDiv.style.color = "var(--success-green)";
            
            setTimeout(() => {
                openMetaOverlay(file);
                statusDiv.innerText = ""; // Töröljük a státuszt a következő alkalomra
                event.target.value = ""; // Visszaállítjuk az inputot
            }, 1500);

        } else {
            // HIBÁS FÁJL
            statusDiv.innerText = "HIBA: Ismeretlen vagy titkosítatlan fájl.";
            statusDiv.style.color = "var(--error-red)";
            card.classList.add('error-shake');
            
            setTimeout(() => {
                card.classList.remove('error-shake');
            }, 500);
            
            event.target.value = ""; // Visszaállítjuk az inputot
        }
    }, 1500); // 1.5 másodperc gondolkodási idő szimulálása
}

function openMetaOverlay(file) {
    const overlay = document.getElementById('meta-overlay');
    const imgPreview = document.getElementById('meta-img-preview');
    const dataContent = document.getElementById('meta-data-content');

    // Zseniális trükk: A feltöltött fájlt azonnal megmutatjuk a böngésző memóriájából!
    imgPreview.src = URL.createObjectURL(file);

    // Kiszámoljuk a fájlméretet KB-ban, hogy még valósághűbb legyen
    const fileSizeKB = (file.size / 1024).toFixed(2);

    // Filler adatok generálása
    dataContent.innerHTML = `
        <p><strong>Fájlnév:</strong> ${file.name}</p>
        <p><strong>Fájlméret:</strong> ${fileSizeKB} KB</p>
        <p><strong>Eszköz azonosító:</strong> Apple iPhone 14 Pro Max</p>
        <p><strong>Dátum / Idő (Módosított):</strong> 2026.04.10. 23:14:05</p>
        <p><strong>Eredeti GPS Koordináták:</strong> É 47° 29' 52.8", K 19° 2' 24.3"</p>
        <p><strong>Kamera Szoftver:</strong> iOS 17.4.1</p>
        <p>-----------------------------------</p>
        <p style="color: var(--error-red);"><strong>FIGYELEM: STEGANOGRÁFIA DETEKTÁLVA!</strong></p>
        <p><strong>Rejtett csatorna:</strong> LSB (Least Significant Bit)</p>
        <p><strong>Titkosítás:</strong> AES-256</p>
        <p><strong>Kinyert üzenet:</strong></p>
        <p style="color: var(--success-green); font-family: monospace; border: 1px dashed var(--success-green); padding: 5px; margin-top: 5px;">
            "A cuccot áthoztuk a raktárba. Éjfélkor találkozunk. Ne késs."
        </p>
    `;

    overlay.classList.remove('hidden');
}

function closeMetaOverlay() {
    document.getElementById('meta-overlay').classList.add('hidden');
    
    // Memóriaszivárgás elkerülése: töröljük a generált URL-t
    const img = document.getElementById('meta-img-preview');
    if (img.src) {
        URL.revokeObjectURL(img.src);
        img.src = "";
    }
}