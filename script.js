// --- SYSTEM INITIALIZATION ---
window.onload = function() {
    // 1. Simulate Loading Protocols (Biometric Scan Effect)
    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
        speak("Identity Verified. Raksha Setu System Active.");
        checkBattery();
    }, 2500);
};

// --- VOICE AI ---
function speak(text) {
    if ('speechSynthesis' in window) {
        let msg = new SpeechSynthesisUtterance(text);
        msg.rate = 1; 
        msg.pitch = 1.1; // Thoda Robotic tone
        // msg.lang = 'hi-IN'; // Agar Hindi chahiye to ye uncomment karein
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

// --- EMERGENCY PROTOCOL ---
function activateEmergency() {
    speak("Fetching GPS Satellites.");
    
    // Show Map Container
    document.getElementById('mapContainer').classList.remove('hidden');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showMapAndAlert, showError);
    } else {
        showError();
    }
}

function showMapAndAlert(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    // 1. Render Map (Leaflet JS)
    var map = L.map('map').setView([lat, lng], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);
    
    L.marker([lat, lng]).addTo(map).bindPopup('Accident Location Detected').openPopup();

    // 2. High Tech Popup (SweetAlert)
    Swal.fire({
        title: 'EMERGENCY BROADCAST',
        text: 'GPS Locked. Sending coordinates to Control Room...',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'SEND WHATSAPP',
        confirmButtonColor: '#ff0055',
        background: '#0a0e17',
        color: '#fff'
    }).then((result) => {
        if (result.isConfirmed) {
            let msg = `SOS! Critical Accident. Lat: ${lat}, Lng: ${lng}. Need Ambulance immediately.`;
            window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`);
        }
    });
}

function showError() {
    Swal.fire({
        icon: 'error',
        title: 'GPS ERROR',
        text: 'Satellite connection failed. Switching to Offline Mode.',
        background: '#0a0e17', color: '#fff'
    });
    offlineMode();
}

// --- OFFLINE MODE ---
function offlineMode() {
    // REAL SMS TRIGGER
    window.location.href = "sms:112?body=HELP! Emergency at current location. RAKSHA-SETU ALERT.";
}

// --- DOCTOR LOGIN (SECURE) ---
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

    // *** ID VERIFICATION LOGIC ***
    if (password === "9565418581") {
        speak("Identity Verified. Unlocking Medical Records.");
        
        // Hide Public, Show Medical
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
            text: 'Invalid Credentials logged.',
            background: '#0a0e17', color: '#fff'
        });
    }
}
