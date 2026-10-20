document.addEventListener('DOMContentLoaded', () => {
    // 1. Element Selectors
    const appBody = document.getElementById('appBody');
    const accessibilityBtn = document.getElementById('accessibilityBtn');
    
    const searchInput = document.getElementById('searchInput');
    const serviceCards = document.querySelectorAll('.service-card');
    
    const toggleChatBtn = document.getElementById('toggleChatBtn');
    const closeChatBtn = document.getElementById('closeChatBtn');
    const chatWindow = document.getElementById('chatWindow');
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    const chatBody = document.getElementById('chatBody');

    const modalSSO = document.getElementById('modalSSO');
    const openSSOBtn = document.getElementById('openSSOBtn');
    const closeSSOBtn = document.getElementById('closeSSOBtn');
    const ssoForm = document.getElementById('ssoForm');

    const laporForm = document.getElementById('laporForm');

    // 2. Event Listeners & Functions

    // Toggle Mode Aksesibilitas (Kontras Tinggi)
    accessibilityBtn?.addEventListener('click', () => {
        appBody.classList.toggle('high-contrast');
    });

    // Toggle Window Chatbot AI
    const toggleChat = () => {
        chatWindow.classList.toggle('hidden');
    };

    toggleChatBtn?.addEventListener('click', toggleChat);
    closeChatBtn?.addEventListener('click', toggleChat);

    // Modal SSO Handler
    const openModalSSO = () => modalSSO.classList.remove('hidden');
    const closeModalSSO = () => modalSSO.classList.add('hidden');

    openSSOBtn?.addEventListener('click', openModalSSO);
    closeSSOBtn?.addEventListener('click', closeModalSSO);

    ssoForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Login berhasil!');
        closeModalSSO();
    });

    // Filter Pencarian Layanan Real-time
    searchInput?.addEventListener('keyup', () => {
        const query = searchInput.value.toLowerCase();

        serviceCards.forEach(card => {
            const text = card.innerText.toLowerCase();
            card.style.display = text.includes(query) ? 'block' : 'none';
        });
    });

    // Penanganan Pengiriman Chatbot AI
    chatForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = chatInput.value.trim();

        if (!text) return;

        // Tambah Pesan User
        chatBody.innerHTML += 
            <div class="bg-gray-200 text-gray-800 p-3 rounded-xl max-w-[85%] ml-auto text-right">
                ${text}
            </div>
        ;

        chatInput.value = '';
        chatBody.scrollTop = chatBody.scrollHeight;

        // Respon Otomatis Bot
        setTimeout(() => {
            let response = "Terima kasih. Silakan pilih menu terkait atau gunakan pencarian di atas untuk petunjuk lebih rinci.";
            const lowerText = text.toLowerCase();

            if (lowerText.includes('ktp')) {
                response = "Untuk pengurusan KTP, Anda bisa memilih menu Kependudukan & Sipil > Cetak Ulang E-KTP dengan menyiapkan KK asli.";
            } else if (lowerText.includes('pajak') || lowerText.includes('pbb')) {
                response = "Pembayaran PBB dapat dilakukan langsung secara online melalui menu Pajak & Retribusi menggunakan QRIS atau Transfer Bank.";
            }

            chatBody.innerHTML += 
                <div class="bg-blue-100 text-blue-900 p-3 rounded-xl max-w-[85%]">
                    ${response}
                </div>
            ;
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 600);
    });

    // Penanganan Form Pengaduan (E-Lapor)
    laporForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const ticketNum = Math.floor(100000 + Math.random() * 900000);
        alert("Laporan Anda berhasil dikirim! Nomor Tiket Pengaduan: #GOV-" + ticketNum);
        laporForm.reset();
    });
});

// Fungsi Buka & Tutup Modal
function openModal() {
  document.getElementById('loginModal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('loginModal').classList.add('hidden');
}

// Callback setelah pengguna berhasil login via Google SSO
function handleCredentialResponse(response) {
  // response.credential berisi ID Token (JWT) dari Google
  console.log("Encoded JWT ID token: " + response.credential);
  
  // Contoh penanganan sederhana:
  alert("Login SSO Berhasil!");
  closeModal();
  
  // Di aplikasi nyata, kirim token ini ke server/backend kamu untuk diverifikasi:
  /*
  fetch('/api/auth/google', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: response.credential })
  });
  */
}

// Handling Login Manual
function handleManualLogin(event) {
  event.preventDefault();
  alert("Login Manual Berhasil!");
  closeModal();
}