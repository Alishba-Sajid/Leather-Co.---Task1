document.addEventListener("DOMContentLoaded", function () {
document.querySelectorAll('.footer-dropdown .dropdown-toggle').forEach(toggle => {
toggle.addEventListener('click', function (e) {
e.preventDefault();

 const parentLi = this.closest('.footer-dropdown');
 const arrow = this.querySelector('.arrow');
 const isOpen = parentLi.classList.contains('open');

 // Close all other dropdowns
 document.querySelectorAll('.footer-dropdown').forEach(drop => {
 drop.classList.remove('open');
 const otherArrow = drop.querySelector('.arrow');
 if (otherArrow) otherArrow.textContent = '˅';
});

// Toggle current dropdown
if (!isOpen) {
 parentLi.classList.add('open');
 if (arrow) arrow.textContent = 'X';
 } else {
 parentLi.classList.remove('open');
 if (arrow) arrow.textContent = '˅';
   }
  });
 });
});