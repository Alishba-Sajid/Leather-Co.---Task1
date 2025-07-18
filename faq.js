document.addEventListener('DOMContentLoaded', function () {
  
   
   // FAQ toggle - only one open at a time
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      faqQuestions.forEach(q => {
        if (q !== question) {
          q.classList.remove('active');
          q.nextElementSibling.style.display = 'none';
        }
      });
      const answer = question.nextElementSibling;
      const isOpen = answer.style.display === 'block';

      if (isOpen) {
        answer.style.display = 'none';
        question.classList.remove('active');
      } else {
        answer.style.display = 'block';
        question.classList.add('active');
      }
    });
  });
});