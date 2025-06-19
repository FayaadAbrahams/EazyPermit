

window.addEventListener("load", (event) => {
  const openFormBtn = document.getElementById('openFormBtn');
  const choiceForm = document.getElementById('choiceForm');
  const landingPage = document.querySelector('.landing-page-container');
  const optionsBox = document.querySelector('.choice-form .options');
  const closeBtnPopUp = document.querySelector('.close-btn-popup');

  if (!openFormBtn || !choiceForm || !landingPage || !optionsBox ) return;

  openFormBtn.addEventListener('click', () => {
    choiceForm.style.display = 'flex';
    landingPage.classList.add('blur');
  });

  choiceForm.addEventListener('click', (e) => {
    if (!optionsBox.contains(e.target)) {
      choiceForm.style.display = 'none';
      landingPage.classList.remove('blur');
    }
  });

  closeBtnPopUp.addEventListener('click', () => {
    choiceForm.style.display = 'none';
    landingPage.classList.remove('blur');
  });


  const chatbotToggler = document.querySelector(".chatbot-toggler");
  const closeBtn = document.querySelector(".close-btn");
  const chatbox = document.querySelector(".chatbox");
  const chatInput = document.querySelector(".chat-input textarea");
  const sendChatBtn = document.querySelector(".chat-input span");
  let userMessage = null;
  const inputInitHeight = chatInput.scrollHeight;
  // API configuration
  const API_KEY = "PASTE-YOUR-API-KEY"; // Your API key here
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
  const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; // return chat <li> element
  }
  const generateResponse = async (chatElement) => {
    const messageElement = chatElement.querySelector("p");
    // Define the properties and message for the API request
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          role: "user",
          parts: [{ text: userMessage }]
        }]
      }),
    }
    // Send POST request to API, get response and set the reponse as paragraph text
    try {
      const response = await fetch(API_URL, requestOptions);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error.message);

      // Get the API response text and update the message element
      messageElement.textContent = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, '$1');
    } catch (error) {
      // Handle error
      messageElement.classList.add("error");
      messageElement.textContent = error.message;
    } finally {
      chatbox.scrollTo(0, chatbox.scrollHeight);
    }
  }
  const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;
    // Clear the input textarea and set its height to default
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;
    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    setTimeout(() => {
      // Display "Thinking..." message while waiting for the response
      const incomingChatLi = createChatLi("Thinking...", "incoming");
      chatbox.appendChild(incomingChatLi);
      chatbox.scrollTo(0, chatbox.scrollHeight);
      generateResponse(incomingChatLi);
    }, 600);
  }
  chatInput.addEventListener("input", () => {
    // Adjust the height of the input textarea based on its content
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
  });
  chatInput.addEventListener("keydown", (e) => {
    // If Enter key is pressed without Shift key and the window 
    // width is greater than 800px, handle the chat
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
      e.preventDefault();
      handleChat();
    }
  });
  sendChatBtn.addEventListener("click", handleChat);
  closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
  chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
})

// export { runLandingPage, dashboard };
