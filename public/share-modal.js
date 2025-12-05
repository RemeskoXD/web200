/**
 * Safe execution wrapper to prevent "Cannot read properties of null" errors.
 * This fixes the issue where auto-generated scripts crash the React app
 * by trying to access elements before they are rendered.
 */
document.addEventListener('DOMContentLoaded', function() {
    // Safely attempt to find elements. If they don't exist, these variables will be null.
    const shareBtn = document.getElementById('share-btn');
    const modal = document.getElementById('modal');
    const closeBtn = document.getElementById('close-btn');

    // Only add event listeners if BOTH the button and the modal exist
    if (shareBtn && modal) {
        shareBtn.addEventListener('click', function() {
            modal.style.display = 'block';
        });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }

    // Safety check for window click event
    if (modal) {
        window.addEventListener('click', function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        });
    }
});