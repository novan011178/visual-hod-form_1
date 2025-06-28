// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
});

// Initialize Form
function initializeForm() {
    // Set tanggal hari ini sebagai default
    setCurrentDate();
    
    // Setup form validation
    setupFormValidation();
    
    // Setup form submission
    setupFormSubmission();
    
    // Setup input enhancements
    setupInputEnhancements();
    
    // Setup toggle functionality
    setupToggleFunctionality();
}

// Setup Toggle Functionality
function setupToggleFunctionality() {
    // Pastikan container dimulai dalam keadaan tersembunyi
    document.getElementById('containerKosong').style.display = 'none';
    document.getElementById('containerIsi').style.display = 'none';
    
    // Add global function for toggle
    window.toggleRejectSection = function(section) {
        console.log('Toggle called for section:', section); // Debug log
        
        const container = document.getElementById(`container${section.charAt(0).toUpperCase() + section.slice(1)}`);
        const icon = document.getElementById(`icon${section.charAt(0).toUpperCase() + section.slice(1)}`);
        
        console.log('Container:', container, 'Icon:', icon); // Debug log
        
        if (!container || !icon) {
            console.error('Container atau icon tidak ditemukan');
            return;
        }
        
        if (container.style.display === 'none' || container.style.display === '') {
            container.style.display = 'block';
            container.classList.add('show');
            icon.textContent = '▲';
            icon.classList.add('rotated');
            console.log('Menu dibuka'); // Debug log
        } else {
            container.style.display = 'none';
            container.classList.remove('show');
            icon.textContent = '▼';
            icon.classList.remove('rotated');
            console.log('Menu ditutup'); // Debug log
        }
    };
    
    // Test function
    console.log('Toggle function setup completed');
}

// Set Current Date and Time
function setCurrentDate() {
    const now = new Date();
    const dateString = now.toISOString().split('T')[0];
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    // Set tanggal
    document.getElementById('tanggal').value = dateString;
    
    // Set jam dengan logika smart selection
    const jamSelect = document.getElementById('jam');
    let closestTime = '';
    
    // Round to nearest 30 minutes
    if (currentMinute < 15) {
        closestTime = String(currentHour).padStart(2, '0') + ':00';
    } else if (currentMinute < 45) {
        closestTime = String(currentHour).padStart(2, '0') + ':30';
    } else {
        const nextHour = (currentHour + 1) % 24;
        closestTime = String(nextHour).padStart(2, '0') + ':00';
    }
    
    // Set jam yang paling dekat
    if (jamSelect.querySelector(`option[value="${closestTime}"]`)) {
        jamSelect.value = closestTime;
    }
}

// Setup Form Validation
function setupFormValidation() {
    const form = document.getElementById('rejectForm');
    const inputs = form.querySelectorAll('input[required], select[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearError);
    });
    
    // Add validation for reject sections
    setupRejectValidation();
}

// Setup Reject Validation
function setupRejectValidation() {
    console.log('Setting up reject validation...');
    
    // Debug: Log semua element yang ada
    const allInputs = document.querySelectorAll('.jumlah-input');
    console.log('Found jumlah inputs:', allInputs.length);
    
    // Force enable semua input untuk testing
    allInputs.forEach((input, index) => {
        console.log(`Input ${index}:`, input.id, input.disabled);
        input.disabled = false; // Force enable semua input
        input.style.display = 'block';
        input.style.visibility = 'visible';
        input.style.opacity = '1';
        input.removeAttribute('disabled');
    });
    
    // Setup checkbox functionality for reject kosong
    const rejectKosongCheckboxes = document.querySelectorAll('input[name="rejectKosong"]');
    console.log('Found rejectKosong checkboxes:', rejectKosongCheckboxes.length);
    
    rejectKosongCheckboxes.forEach((checkbox, index) => {
        console.log(`Checkbox ${index}:`, checkbox.id);
        
        checkbox.addEventListener('change', function() {
            console.log('Checkbox changed:', this.id, this.checked);
            
            // Cari input dengan berbagai cara
            let jumlahInput = null;
            
            // Method 1: Kapitalisasi ID
            const capitalizedId = 'jumlah' + this.id.charAt(0).toUpperCase() + this.id.slice(1);
            jumlahInput = document.getElementById(capitalizedId);
            
            if (!jumlahInput) {
                // Method 2: Langsung dengan ID asli
                jumlahInput = document.getElementById('jumlah' + this.id);
            }
            
            console.log('Found input:', jumlahInput ? jumlahInput.id : 'NOT FOUND');
            
            if (jumlahInput) {
                if (this.checked) {
                    jumlahInput.disabled = false;
                    jumlahInput.removeAttribute('disabled');
                    jumlahInput.setAttribute('required', 'required');
                    jumlahInput.min = '1';
                    jumlahInput.value = '1';
                    jumlahInput.style.backgroundColor = '#ffffff';
                    jumlahInput.style.border = '2px solid #1e40af';
                    jumlahInput.focus();
                    console.log('Input enabled and focused');
                } else {
                    jumlahInput.disabled = true;
                    jumlahInput.removeAttribute('required');
                    jumlahInput.value = '';
                    jumlahInput.min = '0';
                    jumlahInput.style.backgroundColor = '#f3f4f6';
                    jumlahInput.style.border = '2px solid #d1d5db';
                    console.log('Input disabled');
                }
            }
        });
    });
    
    // Setup checkbox functionality for reject isi
    const rejectIsiCheckboxes = document.querySelectorAll('input[name="rejectIsi"]');
    console.log('Found rejectIsi checkboxes:', rejectIsiCheckboxes.length);
    
    rejectIsiCheckboxes.forEach((checkbox, index) => {
        console.log(`Isi Checkbox ${index}:`, checkbox.id);
        
        checkbox.addEventListener('change', function() {
            console.log('Isi Checkbox changed:', this.id, this.checked);
            
            // Cari input dengan berbagai cara
            let jumlahInput = null;
            
            // Method 1: Kapitalisasi ID
            const capitalizedId = 'jumlah' + this.id.charAt(0).toUpperCase() + this.id.slice(1);
            jumlahInput = document.getElementById(capitalizedId);
            
            if (!jumlahInput) {
                // Method 2: Langsung dengan ID asli
                jumlahInput = document.getElementById('jumlah' + this.id);
            }
            
            console.log('Found isi input:', jumlahInput ? jumlahInput.id : 'NOT FOUND');
            
            if (jumlahInput) {
                if (this.checked) {
                    jumlahInput.disabled = false;
                    jumlahInput.removeAttribute('disabled');
                    jumlahInput.setAttribute('required', 'required');
                    jumlahInput.min = '1';
                    jumlahInput.value = '1';
                    jumlahInput.style.backgroundColor = '#ffffff';
                    jumlahInput.style.border = '2px solid #1e40af';
                    jumlahInput.focus();
                    console.log('Isi Input enabled and focused');
                } else {
                    jumlahInput.disabled = true;
                    jumlahInput.removeAttribute('required');
                    jumlahInput.value = '';
                    jumlahInput.min = '0';
                    jumlahInput.style.backgroundColor = '#f3f4f6';
                    jumlahInput.style.border = '2px solid #d1d5db';
                    console.log('Isi Input disabled');
                }
            }
        });
    });
    
    // Auto-check checkbox when number is entered directly
    allInputs.forEach(input => {
        input.addEventListener('input', function() {
            console.log('Input changed:', this.id, this.value);
            
            // Cari checkbox yang sesuai
            const checkboxId = this.id.replace('jumlah', '').toLowerCase();
            let checkbox = document.getElementById(checkboxId);
            
            if (!checkbox) {
                // Coba format lain
                const originalId = this.id.replace('jumlah', '');
                checkbox = document.getElementById(originalId.charAt(0).toLowerCase() + originalId.slice(1));
            }
            
            if (checkbox && this.value && parseInt(this.value) > 0) {
                checkbox.checked = true;
                this.disabled = false;
                console.log('Auto-checked checkbox for:', checkbox.id);
            } else if (checkbox && (!this.value || parseInt(this.value) === 0)) {
                checkbox.checked = false;
                console.log('Auto-unchecked checkbox for:', checkbox.id);
            }
        });
        
        // Prevent negative values and non-numeric input
        input.addEventListener('keydown', function(e) {
            if (e.key === '-' || e.key === 'e' || e.key === 'E' || e.key === '+') {
                e.preventDefault();
            }
        });
        
        // Test click handler
        input.addEventListener('click', function() {
            console.log('Input clicked:', this.id, 'Disabled:', this.disabled);
            if (this.disabled) {
                console.log('Input is disabled, trying to enable...');
                this.disabled = false;
                this.removeAttribute('disabled');
            }
        });
    });
    
    console.log('Reject validation setup completed');
}

// Validate Individual Field
function validateField(event) {
    const field = event.target;
    const fieldGroup = field.closest('.form-group');
    
    // Remove existing error styling
    fieldGroup.classList.remove('error');
    
    // Check if field is valid
    if (!field.value.trim()) {
        fieldGroup.classList.add('error');
        showFieldError(field, 'Field ini wajib diisi');
        return false;
    }
    
    // Additional validation based on field type
    if (field.type === 'number' && field.value <= 0) {
        fieldGroup.classList.add('error');
        showFieldError(field, 'Jumlah harus lebih dari 0');
        return false;
    }
    
    return true;
}

// Clear Field Error
function clearError(event) {
    const field = event.target;
    const fieldGroup = field.closest('.form-group');
    fieldGroup.classList.remove('error');
    
    const errorMsg = fieldGroup.querySelector('.field-error');
    if (errorMsg) {
        errorMsg.remove();
    }
}

// Show Field Error
function showFieldError(field, message) {
    const fieldGroup = field.closest('.form-group');
    let errorMsg = fieldGroup.querySelector('.field-error');
    
    if (!errorMsg) {
        errorMsg = document.createElement('div');
        errorMsg.className = 'field-error';
        errorMsg.style.color = '#e74c3c';
        errorMsg.style.fontSize = '12px';
        errorMsg.style.marginTop = '5px';
        fieldGroup.appendChild(errorMsg);
    }
    
    errorMsg.textContent = message;
}

// Setup Form Submission
function setupFormSubmission() {
    const form = document.getElementById('rejectForm');
    form.addEventListener('submit', handleFormSubmit);
}

// Handle Form Submit
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Validate all fields
    if (!validateAllFields()) {
        showMessage('error', 'Mohon lengkapi semua field yang wajib diisi');
        return;
    }
    
    // Validate at least one reject type is filled
    if (!validateRejectData()) {
        showMessage('error', 'Minimal satu jenis reject harus diisi');
        return;
    }
    
    // Collect form data
    const formData = collectFormData();
    
    // Submit data to Google Sheets
    submitToGoogleSheets(formData);
}

// Validate Reject Data
function validateRejectData() {
    const rejectKosongData = getCheckedRejectData('rejectKosong');
    const rejectIsiData = getCheckedRejectData('rejectIsi');
    
    // At least one reject type should be filled
    if (rejectKosongData.length === 0 && rejectIsiData.length === 0) {
        return false;
    }
    
    // Validate that checked items have quantities > 0
    let hasError = false;
    
    rejectKosongData.forEach(item => {
        if (!item.jumlah || parseInt(item.jumlah) <= 0) {
            const checkbox = document.getElementById(item.id);
            showFieldError(checkbox, 'Jumlah harus diisi untuk item yang dipilih');
            hasError = true;
        }
    });
    
    rejectIsiData.forEach(item => {
        if (!item.jumlah || parseInt(item.jumlah) <= 0) {
            const checkbox = document.getElementById(item.id);
            showFieldError(checkbox, 'Jumlah harus diisi untuk item yang dipilih');
            hasError = true;
        }
    });
    
    return !hasError;
}

// Get Checked Reject Data
function getCheckedRejectData(groupName) {
    const checkboxes = document.querySelectorAll(`input[name="${groupName}"]:checked`);
    const data = [];
    
    checkboxes.forEach(checkbox => {
        const jumlahInput = document.getElementById('jumlah' + checkbox.id.charAt(0).toUpperCase() + checkbox.id.slice(1));
        if (jumlahInput) {
            data.push({
                id: checkbox.id,
                jenis: checkbox.value,
                jumlah: jumlahInput.value
            });
        }
    });
    
    return data;
}

// Validate All Fields
function validateAllFields() {
    const form = document.getElementById('rejectForm');
    const requiredFields = form.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Collect Form Data
function collectFormData() {
    const form = document.getElementById('rejectForm');
    const formData = new FormData(form);
    const data = {};
    
    // Convert FormData to object for basic fields
    for (let [key, value] of formData.entries()) {
        if (!key.startsWith('reject') && !key.startsWith('jumlah')) {
            data[key] = value;
        }
    }
    
    // Collect reject data
    const rejectKosongData = getCheckedRejectData('rejectKosong');
    const rejectIsiData = getCheckedRejectData('rejectIsi');
    
    // Calculate totals
    let totalKosong = 0;
    let totalIsi = 0;
    
    // Process reject kosong data
    const kosongDetails = [];
    rejectKosongData.forEach(item => {
        const jumlah = parseInt(item.jumlah) || 0;
        totalKosong += jumlah;
        kosongDetails.push(`${item.jenis}: ${jumlah}`);
        data[`${item.id}_checked`] = true;
        data[`jumlah_${item.id}`] = jumlah;
    });
    
    // Process reject isi data
    const isiDetails = [];
    rejectIsiData.forEach(item => {
        const jumlah = parseInt(item.jumlah) || 0;
        totalIsi += jumlah;
        isiDetails.push(`${item.jenis}: ${jumlah}`);
        data[`${item.id}_checked`] = true;
        data[`jumlah_${item.id}`] = jumlah;
    });
    
    // Add summary data
    data.totalRejectKosong = totalKosong;
    data.totalRejectIsi = totalIsi;
    data.totalReject = totalKosong + totalIsi;
    data.rejectKosongDetails = kosongDetails.join('; ');
    data.rejectIsiDetails = isiDetails.join('; ');
    data.rejectSummary = [
        totalKosong > 0 ? `Kosong: ${totalKosong} PC (${kosongDetails.join(', ')})` : '',
        totalIsi > 0 ? `Isi: ${totalIsi} PC (${isiDetails.join(', ')})` : ''
    ].filter(item => item).join(' | ');
    
    // Add additional data
    data.timestamp = new Date().toLocaleString('id-ID');
    data.id = generateUniqueId();
    
    return data;
}

// Generate Unique ID
function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Submit to Google Sheets - REAL IMPLEMENTATION
function submitToGoogleSheets(data) {
    const submitBtn = document.querySelector('.submit-btn');
    
    // Show loading state
    showLoadingState(submitBtn);
    
    // GANTI URL INI DENGAN WEB APP URL ANDA SETELAH DEPLOY GOOGLE APPS SCRIPT
    const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzLxDz8Peasb1i8S3l30eES2vPLnDUlhmXzuYxyTIqZT6KV7z9Izf6bIStcnORf2aM/exec';
    
    fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        // Hide loading state
        hideLoadingState(submitBtn);
        
        if (result.status === 'success') {
            // Show success message
            showMessage('success', 'Data berhasil disimpan ke Google Sheets!');
            
            // Reset form
            resetForm();
            
            // Log success
            console.log('Data berhasil disimpan:', result);
        } else {
            // Show error message
            showMessage('error', 'Gagal menyimpan data: ' + result.message);
            console.error('Error dari server:', result);
        }
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
    })
    .catch(error => {
        // Hide loading state
        hideLoadingState(submitBtn);
        
        // Show error message
        showMessage('error', 'Terjadi kesalahan koneksi. Silakan coba lagi.');
        
        // Log error for debugging
        console.error('Error koneksi:', error);
        
        // Fallback: save to localStorage for demo
        saveToLocalStorage(data);
    });
}

// Show Loading State
function showLoadingState(button) {
    button.disabled = true;
    button.innerHTML = '<span class="loading"></span>Menyimpan ke Google Sheets...';
}

// Hide Loading State
function hideLoadingState(button) {
    button.disabled = false;
    button.innerHTML = '💾 Simpan Data Reject';
}

// Show Message
function showMessage(type, message) {
    const successMsg = document.getElementById('successMessage');
    const errorMsg = document.getElementById('errorMessage');
    
    // Hide all messages first
    successMsg.style.display = 'none';
    errorMsg.style.display = 'none';
    
    // Show appropriate message
    if (type === 'success') {
        successMsg.textContent = message;
        successMsg.style.display = 'block';
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            successMsg.style.display = 'none';
        }, 5000);
    } else if (type === 'error') {
        errorMsg.textContent = message;
        errorMsg.style.display = 'block';
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            errorMsg.style.display = 'none';
        }, 5000);
    }
}

// Reset Form
function resetForm() {
    const form = document.getElementById('rejectForm');
    form.reset();
    
    // Set current date and time again
    setCurrentDate();
    
    // Clear any error states
    const errorGroups = form.querySelectorAll('.form-group.error');
    errorGroups.forEach(group => {
        group.classList.remove('error');
    });
    
    const errorMessages = form.querySelectorAll('.field-error');
    errorMessages.forEach(msg => {
        msg.remove();
    });
    
    // Reset reject section requirements and disable all jumlah inputs
    const jumlahInputs = document.querySelectorAll('.jumlah-input');
    jumlahInputs.forEach(input => {
        input.removeAttribute('required');
        input.min = '0';
        input.disabled = true;
        input.value = '';
    });
    
    // Uncheck all checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Close all reject sections
    document.getElementById('containerKosong').style.display = 'none';
    document.getElementById('containerIsi').style.display = 'none';
    document.getElementById('iconKosong').textContent = '▼';
    document.getElementById('iconIsi').textContent = '▼';
    document.getElementById('iconKosong').classList.remove('rotated');
    document.getElementById('iconIsi').classList.remove('rotated');
}

// Save to LocalStorage (fallback)
function saveToLocalStorage(data) {
    try {
        let savedData = JSON.parse(localStorage.getItem('rejectData') || '[]');
        savedData.push(data);
        localStorage.setItem('rejectData', JSON.stringify(savedData));
        
        console.log('Data tersimpan di localStorage sebagai fallback:', savedData);
        showMessage('success', 'Data disimpan lokal (offline mode)');
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

// Setup Input Enhancements
function setupInputEnhancements() {
    // Auto capitalize nama
    const nameInputs = document.querySelectorAll('#spv, #petugas');
    nameInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            // Capitalize first letter of each word
            e.target.value = e.target.value.replace(/\b\w/g, l => l.toUpperCase());
        });
    });
    
    // Format number input for reject counts
    const numberInputs = document.querySelectorAll('.jumlah-input');
    numberInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            // Remove non-numeric characters
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        });
    });
    
    // Setup keyboard shortcuts
    setupKeyboardShortcuts();
}

// Setup Keyboard Shortcuts
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl + S to save
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            document.getElementById('rejectForm').requestSubmit();
        }
        
        // Escape to clear form
        if (e.key === 'Escape') {
            resetForm();
        }
    });
}

// Utility Functions
const utils = {
    // Format date to Indonesian format
    formatDate: function(date) {
        return new Date(date).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },
    
    // Get current shift based on time
    getCurrentShift: function() {
        const jamSelect = document.getElementById('jam');
        const timeValue = jamSelect.value;
        
        if (timeValue) {
            const hour = parseInt(timeValue.split(':')[0]);
            
            if (hour >= 6 && hour < 15) {
                return 'Shift 1 (06:00-14:00)';
            } else if (hour >= 15 && hour < 23) {
                return 'Shift 2 (15:00-22:00)';
            } else {
                return 'Shift 3 (23:00-06:00)';
            }
        }
        
        // Fallback to current time if no time input
        const now = new Date();
        const hour = now.getHours();
        
        if (hour >= 6 && hour < 15) {
            return 'Shift 1 (06:00-14:00)';
        } else if (hour >= 15 && hour < 23) {
            return 'Shift 2 (15:00-22:00)';
        } else {
            return 'Shift 3 (23:00-06:00)';
        }
    },
    
    // Export data to CSV
    exportToCSV: function() {
        const data = JSON.parse(localStorage.getItem('rejectData') || '[]');
        if (data.length === 0) {
            alert('Tidak ada data untuk diekspor');
            return;
        }
        
        const headers = ['Tanggal', 'Jam', 'Line', 'Shift', 'Total Reject', 'Reject Summary', 'SPV', 'Petugas', 'Keterangan'];
        const csvContent = [
            headers.join(','),
            ...data.map(row => [
                row.tanggal,
                row.jam,
                row.line,
                row.shift,
                row.totalReject,
                `"${row.rejectSummary}"`,
                row.spv,
                row.petugas,
                row.keterangan || ''
            ].join(','))
        ].join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `reject_data_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    },
    
    // Test connection to Google Sheets
    testConnection: function() {
        const testData = {
            tanggal: new Date().toISOString().split('T')[0],
            jam: '14:30',
            line: 'Line R.Bardi',
            shift: 'Shift 1 (06:00-14:00)',
            spv: 'Test SPV',
            petugas: 'Test Petugas',
            keterangan: 'Test koneksi sistem',
            totalReject: 1,
            rejectSummary: 'Test Connection',
            timestamp: new Date().toLocaleString('id-ID'),
            id: 'test-' + Date.now()
        };
        
        submitToGoogleSheets(testData);
    }
};

// Auto-suggest current shift based on time selection
document.addEventListener('DOMContentLoaded', function() {
    const shiftSelect = document.getElementById('shift');
    const jamSelect = document.getElementById('jam');
    
    // Function to update shift based on time
    function updateShiftBasedOnTime() {
        const currentShift = utils.getCurrentShift();
        shiftSelect.value = currentShift;
    }
    
    // Set default shift based on current time
    setTimeout(updateShiftBasedOnTime, 500);
    
    // Update shift when time selection changes
    jamSelect.addEventListener('change', updateShiftBasedOnTime);
    
    // Add visual feedback for time selection
    jamSelect.addEventListener('change', function() {
        const selectedTime = this.value;
        if (selectedTime) {
            this.style.background = 'rgba(30, 64, 175, 0.05)';
            this.style.borderColor = '#1e40af';
            
            // Reset after 1 second
            setTimeout(() => {
                this.style.background = '';
                this.style.borderColor = '';
            }, 1000);
        }
    });
});

// Add export button (optional)
function addUtilityButtons() {
    const container = document.querySelector('.form-container');
    
    // Export button
    const exportBtn = document.createElement('button');
    exportBtn.type = 'button';
    exportBtn.className = 'submit-btn';
    exportBtn.style.background = 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
    exportBtn.style.marginTop = '10px';
    exportBtn.innerHTML = '📊 Export Data ke CSV';
    exportBtn.addEventListener('click', utils.exportToCSV);
    
    // Test connection button
    const testBtn = document.createElement('button');
    testBtn.type = 'button';
    testBtn.className = 'submit-btn';
    testBtn.style.background = 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)';
    testBtn.style.marginTop = '10px';
    testBtn.innerHTML = '🔧 Test Koneksi Google Sheets';
    testBtn.addEventListener('click', utils.testConnection);
    
    container.appendChild(exportBtn);
    container.appendChild(testBtn);
}

// Uncomment line below to add utility buttons
// addUtilityButtons();