// --- SYSTEM INITIALIZATION ---
window.onload = function() {
    // 1. Simulate Loading Protocols (Biometric Scan Effect)
    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
        speak("Identity Verified. System Active.");
        checkBattery();
    }, 2000);
};

// --- VOICE AI ---
function speak(text) {
    if ('speechSynthesis' in window) {
        let msg = new SpeechSynthesisUtterance(text);
        msg.rate = 1; 
        msg.pitch = 1.1;
        window.speechSynthesis.speak(msg);
    }
}

// --- BATTERY STATUS ---
function checkBattery() {
    if(navigator.getBattery) {
        navigator.getBattery().then(function(battery) {
            document.getElementById('batteryLevel').innerHTML = 
                `<i class="fas fa-battery-half"></i> ${Math.round(battery.level * 100)}%`;
        });
    }
}

// --- EMERGENCY PROTOCOL (THE MAIN MAGIC) ---
function activateEmergency() {
    speak("Emergency Protocol Initiated.");
    
    // 1. Show Map Container (Looks Real)
    document.getElementById('mapContainer').classList.remove('hidden');

    // 2. Start the "Fake" Background Process
    let timerInterval;
    Swal.fire({
        title: 'CONNECTING TO SATELLITE...',
        html: 'Triangulating GPS Coordinates... <b></b>%',
        timer: 3000, // 3 Seconds ka drama
        timerProgressBar: true,
        background: '#0a0e17',
        color: '#00f3ff',
        didOpen: () => {
            Swal.showLoading();
            const b = Swal.getHtmlContainer().querySelector('b');
            timerInterval = setInterval(() => {
                b.textContent = Math.floor(Math.random() * 100);
            }, 100);
        },
        willClose: () => {
            clearInterval(timerInterval);
        }
    }).then((result) => {
        // 3. Step 2: Locating Police
        locateServices();
    });
}

function locateServices() {
    // Fake Processing Steps
    speak("Locating Nearest Emergency Services.");
    
    Swal.fire({
        title: 'SEARCHING NEARBY...',
        html: `
            <div style="text-align:left; font-family:monospace; color:#fff;">
                <p><i class="fas fa-check" style="color:#00f3ff"></i> GPS LOCKED: 23.0225° N, 72.5714° E</p>
                <p><i class="fas fa-spinner fa-spin" style="color:orange"></i> PINGING POLICE CONTROL (1.2 KM)...</p>
                <p><i class="fas fa-spinner fa-spin" style="color:orange"></i> PINGING CITY HOSPITAL (3.5 KM)...</p>
            </div>
        `,
        timer: 2500,
        showConfirmButton: false,
        background: '#0a0e17'
    }).then(() => {
        // 4. FINAL SUCCESS MESSAGE
        finalSuccess();
    });
}

function finalSuccess() {
    speak("Alert Sent Successfully. Help is on the way.");
    
    Swal.fire({
        icon: 'success',
        title: 'EMERGENCY ALERT SENT!',
        html: `
            <p style="color:#aaa">Details sent to:</p>
            <ul style="text-align:left; color:#fff;">
                <li><b style="color:#ff0055">POLICE (112):</b> DISPATCHED</li>
                <li><b style="color:#00f3ff">HOSPITAL:</b> AMBULANCE NOTIFIED</li>
                <li><b style="color:#00f3ff">FAMILY:</b> SMS DELIVERED</li>
            </ul>
        `,
        confirmButtonText: 'OK',
        confirmButtonColor: '#00f3ff',
        background: '#0a0e17',
        color: '#fff'
    });

    // OPTIONAL: Asliyat mein "Call" khol dena background mein (Safety ke liye)
    // window.location.href = "tel:112";
}

function showError() {
    Swal.fire({
        icon: 'error',
        title: 'GPS ERROR',
        text: 'Signal weak. Switching to SMS Mode.',
        background: '#0a0e17', color: '#fff'
    });
    offlineMode();
}

// --- OFFLINE MODE ---
function offlineMode() {
    window.location.href = "sms:112?body=HELP! Emergency at current location.";
}

// --- DOCTOR LOGIN (SAME AS BEFORE) ---
async function showLogin() {
    const { value: password } = await Swal.fire({
        title: 'MEDICAL PERSONNEL ONLY',
        input: 'password',
        inputLabel: 'Enter Government ID',
        inputPlaceholder: 'Unique ID',
        confirmButtonText: 'VERIFY',
        confirmButtonColor: '#00f3ff',
        background: '#0a0e17', color: '#fff',
        inputAttributes: { autocapitalize: 'off', autocorrect: 'off' }
    });

    if (password === "9565418581") {
        speak("Identity Verified. Unlocking Medical Records.");
        document.getElementById('publicInterface').style.display = 'none';
        document.getElementById('medicalData').classList.remove('hidden');
        
        Swal.fire({
            icon: 'success', title: 'ACCESS GRANTED',
            text: 'Patient Record: Altamas Ansari',
            timer: 1500, showConfirmButton: false,
            background: '#0a0e17', color: '#fff'
        });
    } else {
        speak("Access Denied.");
        Swal.fire({
            icon: 'error', title: 'ACCESS DENIED',
            background: '#0a0e17', color: '#fff'
        });
    }
}
    
