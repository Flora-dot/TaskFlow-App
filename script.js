const themeBtn = document.getElementById('theme-btn'); //Theme Button
const themeList = document.getElementById('theme-list')

// Show themes list
function setThemeList() {
   if (themeList.style.display === 'none') {
    themeList.style.display = 'flex'
    alert('worked')
   } else {
    themeList.style.display = 'none'
   }
}

themeBtn.addEventListener('click', setThemeList())