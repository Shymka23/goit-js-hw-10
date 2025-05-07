const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

// Об'єкт для зберігання даних форми
const formData = {
  email: '',
  message: '',
};

// Завантаження даних з localStorage при завантаженні сторінки
function loadFormData() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);
      formData.email = parsedData.email || '';
      formData.message = parsedData.message || '';

      form.elements.email.value = formData.email.trim();
      form.elements.message.value = formData.message.trim();
    } catch (error) {
      console.error('Помилка при парсингу даних з localStorage:', error);
    }
  }
}

// Збереження даних у localStorage
function saveFormData() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      email: formData.email.trim(),
      message: formData.message.trim(),
    })
  );
}

// Обробник події input
function handleInput(event) {
  const { name, value } = event.target;
  formData[name] = value;
  saveFormData();
}

// Обробник події submit
function handleSubmit(event) {
  event.preventDefault();

  // Перевірка на заповненість полів
  if (!formData.email.trim() || !formData.message.trim()) {
    alert('Fill please all fields');
    return;
  }

  // Виведення даних у консоль
  console.log('Form data:', {
    email: formData.email.trim(),
    message: formData.message.trim(),
  });

  // Очищення даних
  localStorage.removeItem(STORAGE_KEY);
  formData.email = '';
  formData.message = '';
  form.reset();
}

// Ініціалізація
loadFormData();
form.addEventListener('input', handleInput);
form.addEventListener('submit', handleSubmit);
