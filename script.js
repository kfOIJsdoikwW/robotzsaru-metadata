const VALID_CODE = "01080/5521/2026.bü.";
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
            // Belépés elrejtése, töltés megjelenítése
            document.getElementById('login-section').classList.add('hidden');
            document.getElementById('loading-screen').classList.remove('hidden');
            
            setTimeout(() => {
                // Töltés elrejtése, adatok megjelenítése
                document.getElementById('loading-screen').classList.add('hidden');
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

// --- EGYEDI MODAL KEZELŐ FÜGGVÉNYEK ---
function showCustomModal(title, message, type, confirmCallback) {
    const modal = document.getElementById('custom-modal');
    const titleEl = document.getElementById('modal-title');
    const messageEl = document.getElementById('modal-message');
    const buttonsEl = document.getElementById('modal-buttons');
    const modalBox = modal.querySelector('.modal-box');

    titleEl.innerText = title;
    messageEl.innerHTML = message.replace(/\n/g, '<br><br>'); 

    if (type === 'warning') {
        modalBox.classList.remove('modal-error');
        modalBox.style.borderColor = "var(--police-blue)";
        buttonsEl.innerHTML = `
            <button class="modal-btn btn-cancel" onclick="closeCustomModal()">MÉGSEM</button>
            <button class="modal-btn btn-confirm" id="modal-confirm-btn">FOLYTATÁS</button>
        `;
        document.getElementById('modal-confirm-btn').onclick = () => {
            closeCustomModal();
            if (confirmCallback) confirmCallback();
        };
    } else if (type === 'error') {
        modalBox.classList.add('modal-error');
        modalBox.style.borderColor = "var(--police-red)";
        modalBox.classList.add('error-shake'); 
        setTimeout(() => modalBox.classList.remove('error-shake'), 500);

        buttonsEl.innerHTML = `
            <button class="modal-btn btn-confirm" onclick="closeCustomModal()">TUDOMÁSUL VETTEM</button>
        `;
    }

    modal.classList.remove('hidden');
}

function closeCustomModal() {
    document.getElementById('custom-modal').classList.add('hidden');
}

// --- AZ ÁTÍRT JELSZÓFELFEDŐ FÜGGVÉNY ---
function viewPassword(element, platform) {
    if (platform === 'X') {
        showCustomModal(
            "BIZTONSÁGI FIGYELMEZTETÉS",
            "Az X (Twitter) hozzáférési adatok megtekintése naplózásra kerül a szerveren.\nBiztosan folytatni kívánja az érzékeny adat dekódolását?",
            "warning",
            () => {
                element.textContent = "Orvosleszekjanem22 és (QXOOD, QXOOD, QXOOD, QXOOD)";
                element.style.color = "var(--success-green)";
                element.style.background = "rgba(0, 255, 136, 0.1)";
                element.onclick = null; 
                element.style.cursor = "default";
            }
        );
    } else {
        showCustomModal(
            "RENDSZERÜZENET (Err. #0992)",
            "A kért platform jelszava nem található az A.K.T.A. központi adatbázisában. Titkosítás feltörése sikertelen.",
            "error"
        );
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

    lockedBox.style.borderColor = "var(--error-red)";
    lockedBox.style.color = "var(--error-red)";
    lockedBox.style.background = "rgba(255, 0, 0, 0.1)";
    evidenceTitle.style.color = "var(--error-red)";
    evidenceTitle.style.borderColor = "var(--error-red)";

    chatBox.classList.remove('hidden');
    chatMsg.innerText = "RENDSZERÜZENET: Jogosultság megtagadva! (Err. #0012)";
    chatMsg.style.color = "var(--error-red)";

    container.classList.add('error-shake');
    setTimeout(() => container.classList.remove('error-shake'), 500);

    setTimeout(() => {
        lockedBox.style.borderColor = "var(--police-blue)";
        lockedBox.style.color = "var(--police-blue)";
        lockedBox.style.background = "rgba(0,0,0,0.5)";
        
        evidenceTitle.style.color = "var(--police-blue)";
        evidenceTitle.style.borderColor = "var(--police-blue)";
        
        chatBox.classList.add('hidden');
    }, 10000);
}

// --- KIBŐVÍTETT GYANÚSÍTOTT ADATBÁZIS ---
const suspectsData = [
    { 
        name: "Kovács Márk", 
        dob: "1995.05.12.", 
        img: "gyan1.png", 
        id: "BK-4421",
        dns: "AT-8842-X9",
        location: "Budapest, X. kerület",
        crime: "Fegyveres rablás, súlyos testi sértés",
        prior: "Többszörösen visszaeső erőszakos bűncselekmények.",
        danger: "KÜLÖNÖSEN MAGAS (Fegyverrel rendelkezhet!)",
        description: "Erős testalkat, kopasz, tetoválás a nyakán.",
        note: "Rendkívül erőszakos, az intézkedés során fokozott óvatosság indokolt!",
        phone: "Iphone 15 Pro Max",
        phoneImei: "58328234793824432"
    },
    { 
        name: "Szabó Luca", 
        dob: "1998.11.02.", 
        img: "gyan2.png", 
        id: "BK-8890",
        dns: "XY-1122-Z0",
        location: "Miskolc, belváros",
        crime: "Kábítószer-kereskedelem, terjesztés",
        prior: "Elítélve kábítószer-kereskedelemért (2022).",
        danger: "Közepes",
        description: "Alacsony, barna haj, feltűnő piercingek.",
        note: "Feltételezett elosztó a helyi hálózatban.",
        phone: "Iphone 14 Pro Max",
        phoneImei: "863124590123456"
    },
    { 
        // Ő A TÉNYLEGES ELKÖVETŐ
        name: "Horváth Tamás", 
        dob: "1987.02.25.", 
        img: "gyan3.png", 
        id: "BK-1123",
        dns: "HT-9931-Q1",
        location: "Budapest, VIII. kerület",
        crime: "Orgazdaság, illegális áru rejtegetése",
        prior: "Garázdaság (2024)",
        danger: "Közepes",
        description: "Közepes testalkat, borostás, gyakran visel sapkát.",
        note: "Jelenleg is megfigyelés alatt áll.",
        phone: "Iphone 14 Pro Max",
        phoneImei: "358921128749001" // EZ MATCHEL A METAADATTAL!
    },
    { 
        name: "Gucsek Martin", 
        dob: "2001.08.19.", 
        img: "gyan4.png", 
        id: "BK-5564",
        dns: "NE-4455-L8",
        location: "Debrecen, külváros",
        crime: "Kiskorú veszélyeztetése",
        prior: "Elítélve gyermekvédelmi ügyben (2023).",
        danger: "Alacsony",
        description: "Átlagos testalkat, szőke haj.",
        note: "Gyámhatósági eljárás és távoltartási végzés van érvényben.",
        phone: "Samsung Galaxy A50",
        phoneImei: "N/A"
    },
    { 
        name: "Balogh Péter", 
        dob: "1992.12.30.", 
        img: "gyan5.png", 
        id: "BK-9901",
        dns: "BP-7711-W3",
        location: "Győr, ipartelep",
        crime: "Gazdasági csalás, sikkasztás",
        prior: "Pénzmosás (2021)",
        danger: "Alacsony",
        description: "Magas, vékony, elegáns öltözet.",
        note: "Fehérgalléros bűnöző, külföldi szervereket használhat.",
        phone: "Iphone 16 Pro Max",
        phoneImei: "990123551234901"
    }
];

function toggleSuspects() {
    const container = document.getElementById('suspects-list-container');
    const grid = document.getElementById('suspects-grid');
    
    if (container.classList.contains('hidden')) {
        grid.innerHTML = ''; 
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
    
    // Piros szín adása a "Veszélyességi fokozat"-nak, ha KÜLÖNÖSEN MAGAS
    const dangerStyle = suspect.danger.includes("MAGAS") ? "color: var(--error-red); font-weight: bold;" : "";

    const fillerInfo = `
        <p><strong>Azonosító:</strong> ${suspect.id}</p>
        <p><strong>Születési dátum:</strong> ${suspect.dob}</p>
        <p><strong>DNS Profil:</strong> ${suspect.dns}</p>
        <p><strong>Utolsó ismert tartózkodás:</strong> ${suspect.location}</p>
        <p>-----------------------------------</p>
        <p><strong>Bűncselekmény:</strong> ${suspect.crime}</p>
        <p><strong>Előélet (Ítéletek):</strong> ${suspect.prior}</p>
        <p><strong>Veszélyességi fokozat:</strong> <span style="${dangerStyle}">${suspect.danger}</span></p>
        <p><strong>Személyleírás:</strong> ${suspect.description}</p>
        <p><strong>Használt mobilkészülék:</strong> ${suspect.phone}</p>
        <p><strong>Megjegyzés:</strong> ${suspect.note}</p>
        <p>-----------------------------------</p>
        <p><strong>Lefoglalt mobil (IMEI):</strong> <span style="color: #ffcc00; font-weight: bold; letter-spacing: 1px;">${suspect.phoneImei}</span></p>
        <p style="color:red; margin-top: 10px;">FIGYELEM: Az adatok szigorúan bizalmasak!</p>
    `;
    
    document.getElementById('overlay-data').innerHTML = fillerInfo;
    overlay.classList.remove('hidden');
}

function closeSuspectOverlay() {
    document.getElementById('suspect-overlay').classList.add('hidden');
}

// --- METAADAT ELEMZŐ FUNKCIÓK ---

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const statusDiv = document.getElementById('meta-status');
    const card = event.target.closest('.evidence-card');

    statusDiv.innerText = "Fájl fogadva. EXIF olvasása...";
    statusDiv.style.color = "var(--police-blue)";

    // A kép betöltése a memóriába a felbontás ellenőrzéséhez
    const img = new Image();
    img.onload = function() {
        const width = this.width;
        const height = this.height;

        // Várakozás szimulálása a drámai hatás kedvéért
        setTimeout(() => {
            // Itt ellenőrizzük a pontos 1625x789-es felbontást
            if (width === 1625 && height === 789) {
                statusDiv.innerText = "Egyezés! Rejtett adatok dekódolása...";
                statusDiv.style.color = "var(--success-green)";
                
                setTimeout(() => {
                    openMetaOverlay(file);
                    statusDiv.innerText = ""; 
                    event.target.value = ""; 
                }, 1500);

            } else {
                statusDiv.innerText = "HIBA: Ismeretlen vagy titkosítatlan fájl.";
                statusDiv.style.color = "var(--error-red)";
                card.classList.add('error-shake');
                
                setTimeout(() => {
                    card.classList.remove('error-shake');
                }, 500);
                
                event.target.value = ""; 
            }
        }, 1500);
        
        URL.revokeObjectURL(this.src); // Memória felszabadítása
    };

    img.onerror = function() {
        // Ha valaki nem képfájlt tölt fel (pl. PDF-et), azt is lekezeljük
        setTimeout(() => {
            statusDiv.innerText = "HIBA: Ismeretlen vagy titkosítatlan fájl.";
            statusDiv.style.color = "var(--error-red)";
            card.classList.add('error-shake');
            
            setTimeout(() => {
                card.classList.remove('error-shake');
            }, 500);
            
            event.target.value = ""; 
        }, 1500);
        URL.revokeObjectURL(this.src);
    };

    img.src = URL.createObjectURL(file);
}

function openMetaOverlay(file) {
    const overlay = document.getElementById('meta-overlay');
    const imgPreview = document.getElementById('meta-img-preview');
    const dataContent = document.getElementById('meta-data-content');

    imgPreview.src = URL.createObjectURL(file);
    const fileSizeKB = (file.size / 1024).toFixed(2);

    dataContent.innerHTML = `
        <p><strong>Fájlnév:</strong> ${file.name}</p>
        <p><strong>Fájlméret:</strong> ${fileSizeKB} KB</p>
        <p><strong>Fájl Hash (SHA-256):</strong> <span style="font-size: 0.7rem; color: #888;">7d3a8b...9f42</span></p>
        <p>-----------------------------------</p>
        <p style="color: var(--police-blue); font-weight: bold;">ESZKÖZ ÉS HÁLÓZATI ADATOK</p>
        <p><strong>Készülék modell:</strong> Apple iPhone 14 Pro Max</p>
        <p><strong>Eszköz azonosító (IMEI):</strong> <span style="color: #ffcc00; font-weight: bold; letter-spacing: 1px;">358921128749001</span></p>
        <p><strong>Hálózati MAC cím:</strong> 4A:F2:B1:09:C3:7E</p>
        <p><strong>Rögzítéskori IP cím:</strong> 89.134.12.45</p>
        <p><strong>Helyi hálózat (SSID):</strong> "Vodafon 5G"</p>
        <p>-----------------------------------</p>
        <p style="color: var(--police-blue); font-weight: bold;">FÉNYKÉPEZÉSI METAADATOK (EXIF)</p>
        <p><strong>Dátum / Idő (Létrehozva):</strong> 2026.04.04. 23:14:05</p>
        <p><strong>Eredeti GPS Koordináták:</strong> É 47° 29' 52.8", K 19° 2' 24.3"</p>
        <p><strong>Kamera beállítások:</strong> 24mm f/1.78, 1/60 sec, ISO 400</p>
        <p><strong>Kamera Szoftver:</strong> iOS 17.4.1 (Build 21E236)</p>
        <p>-----------------------------------</p>
        <p style="color: var(--error-red);"><strong>FIGYELEM: STEGANOGRÁFIA DETEKTÁLVA!</strong></p>
        <p><strong>Rejtett csatorna:</strong> LSB (Least Significant Bit)</p>
        <p><strong>Titkosítás:</strong> AES-256</p>
        <p><strong>Kinyert üzenet:</strong></p>
        <p style="color: var(--success-green); font-family: monospace; border: 1px dashed var(--success-green); padding: 5px; margin-top: 5px;">
            "É 47° 29' 52.8", K 19° 2' 24.3"
        </p>
    `;

    overlay.classList.remove('hidden');
}

function closeMetaOverlay() {
    document.getElementById('meta-overlay').classList.add('hidden');
    
    const img = document.getElementById('meta-img-preview');
    if (img.src) {
        URL.revokeObjectURL(img.src);
        img.src = "";
    }
}
