import { ref } from 'vue'
import { GoogleGenAI } from '@google/genai'

const isOpen = ref(false)
const messages = ref([
    {
        role: 'bot',
        html: `<p>Hello! I'm Tushar's AI assistant powered by Google Gemini. 🤖 I can answer questions about his <strong>Experience</strong>, <strong>Skills</strong>, <strong>Projects</strong>, or <strong>Contact</strong> info!</p>`
    }
])

const SYSTEM_INSTRUCTION = `You are an AI assistant for Tushar Kanti Parial's portfolio website. Answer questions about his professional background, skills, and experience.

# PROFESSIONAL SUMMARY
Tushar is a Senior Software Engineer with 7+ years of experience specializing in scalable system architecture, Laravel, microservices, and DevOps. He builds resilient digital ecosystems that deliver measurable impact.

# CURRENT ROLE
- Position: Senior Software Engineer at DocOnline (Feb 2022 - Present, Hyderabad)
- Responsibilities:
  * Spearheaded integration of new modules and RESTful APIs across distributed systems using Service-Oriented Architecture (SOA)
  * Architected and tuned databases to enhance speed, reliability, and data integrity for high-volume transactions
  * Drove significant optimizations across codebase resulting in measurable improvements in application performance
  * Collaborated with cross-functional teams to refine product requirements and deliver user-focused, market-ready solutions
  * Mentored junior developers and enforced best practices in coding standards and documentation
- Tech: Laravel, VueJs, Microservices, Code Review, Leadership

# PREVIOUS EXPERIENCE
1. Software Engineer at GetUnion (Nov 2019 - Feb 2022)
   - Developed cross-platform mobile apps using Framework7 (Cordova) and Firebase
   - Worked on Progressive Web Applications (PWAs) using MERN Stack
   - Developed FinTech mobile applications using Flutter, NodeJs
   - Tech: Hybrid Mobile App, Node.js, Flutter, Vuejs, Firebase, MERN

2. PHP Web Developer at Ayodhya Webosoft (Jun 2018 - Nov 2019)
   - Developed backend solutions using Core PHP, CodeIgniter, and Laravel
   - Managed complex MySQL database designs and optimized SQL queries
   - Built android applications utilizing Framework7 and Cordova
   - Single Page Applications (SPAs) using Vuejs
   - Tech: Codeigniter, MySQL, Framework7, AWS, Vuejs, Cordova

# SKILLS
Backend & Infrastructure: Laravel, MySQL, Docker, Microservices, AWS, Node.js, MongoDB, REST API, Python, System Design
Frontend & Tools: Vue.js, React.js, Flutter, Git, CI/CD, Agile, TypeScript, Linux

# EDUCATION
- Bachelor of Engineering in Computer Science (2014-2018) from Chhattisgarh Swami Vivekanand Technical University
- Higher Secondary in Mathematics (2013-2014) from Shakuntala Vidyalaya, Ram Nagar

# CERTIFICATIONS & AWARDS
- Post Graduate Program in DevOps from Purdue University (Apr 2023)
- Generative AI Foundations by upGrad & Microsoft (Aug 2025)
- Flutter Developer by Edureka & Udemy (Aug 2025)
- Node.js Certification Training by Edureka (Aug 2023)
- Certificate of Appreciation from DocOnline for outstanding contribution to system stability and API performance (Apr 2023)
- Team Kudos from DocOnline for collaborative excellence and mentoring junior developers (Apr 2023)

# KEY PROJECTS
1. Module Development & Optimization at DocOnline - Streamlining codebases, boosting performance, designing secure RESTful APIs
2. Intelligent RAG Chatbot - Python + LangChain AI chatbot with PDF upload and context-aware answers
3. Hybrid PWA Solution - Progressive Web App using Cordova, Framework7, Firebase, Vue.js
4. Cross-Platform Invoice App - FinTech invoice discounting app using Flutter and Node.js
5. E-Commerce DB Optimization - Reduced query execution time by 40% with Docker & Ansible CI/CD
6. Real-time Social Chat - Laravel 5.4 + Vue.js Facebook-style chat (college capstone)
7. Enterprise Software Suite - Bespoke websites and Android apps for Ayodhya Webosoft clients
8. e-Library System - Dual version (Core PHP + WordPress) library management

# CONTACT
- Email: tkparial1@gmail.com
- Location: Hyderabad, India
- LinkedIn: https://linkedin.com/in/tushar-kanti-parial
- GitHub: https://github.com/tusharthe

# LANGUAGES
English, Hindi, Bengali

When answering:
1. Be friendly and professional
2. Keep responses concise but informative (2-3 sentences max unless asked for details)
3. Focus on the specific question asked
4. Reference actual details from the knowledge base above
5. If asked about something not in the knowledge base, politely say you don't have that information
6. Use markdown formatting in responses (bold, lists, etc.)
`

let ai = null

// Initialize Gemini API with latest SDK
const apiKey = import.meta.env.VITE_GEMINI_API_KEY
if (apiKey && apiKey !== 'YOUR_GEMINI_API_KEY_HERE') {
    try {
        ai = new GoogleGenAI({ apiKey: apiKey })
        console.log('✅ GoogleGenAI initialized successfully!')
    } catch (error) {
        console.error('Failed to initialize Gemini API:', error)
    }
} else {
    console.warn('⚠️ API key not configured or is placeholder')
}

export function useChatbot() {
    function toggleChat() {
        isOpen.value = !isOpen.value
    }

    async function sendMessage(userInput) {
        if (!userInput.trim()) return

        // Add user message
        messages.value.push({
            role: 'user',
            html: `<p>${escapeHtml(userInput)}</p>`
        })

        // Check if API is configured
        if (!ai) {
            messages.value.push({
                role: 'bot',
                html: `<p style="color: var(--color-secondary);">⚠️ Google Gemini API is not configured. Please add your API key to the <code>.env</code> file.</p><p style="margin-top: 0.5rem; font-size: 0.85rem; opacity: 0.8;">Get a free API key from <a href="https://aistudio.google.com/apikey" target="_blank" style="color: var(--color-primary);">Google AI Studio</a></p>`
            })
            return
        }

        // Add typing indicator
        const typingIndex = messages.value.length
        messages.value.push({
            role: 'bot',
            html: `<p style="opacity: 0.6;"><em>Thinking...</em></p>`
        })

        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: SYSTEM_INSTRUCTION + '\n\nUser question: ' + userInput,
                config: {
                    maxOutputTokens: 1500,
                    temperature: 0.7,
                }
            })

            // Replace typing indicator with actual response
            const htmlResponse = convertMarkdownToHTML(response.text)
            messages.value[typingIndex] = {
                role: 'bot',
                html: htmlResponse
            }
        } catch (error) {
            console.error('Gemini API error:', error)
            messages.value[typingIndex] = {
                role: 'bot',
                html: `<p style="color: var(--color-secondary);">❌ Sorry, I encountered an error. Please try again.</p><p style="font-size: 0.85rem; opacity: 0.7; margin-top: 0.5rem;">${escapeHtml(error.message)}</p>`
            }
        }
    }

    // Escape HTML to prevent XSS
    function escapeHtml(text) {
        const div = document.createElement('div')
        div.textContent = text
        return div.innerHTML
    }

    // Basic markdown to HTML converter
    function convertMarkdownToHTML(text) {
        let html = text
            // Bold
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            // Italic
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            // Code blocks
            .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
            // Inline code
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            // Links
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" style="color: var(--color-primary); text-decoration: underline;">$1</a>')
            // Line breaks to paragraphs
            .split('\n\n')
            .map(para => {
                // Handle lists
                if (para.includes('\n* ') || para.includes('\n- ')) {
                    const items = para.split('\n').filter(line => line.trim().startsWith('* ') || line.trim().startsWith('- '))
                        .map(line => line.replace(/^[\*\-]\s+/, ''))
                        .map(item => `<li>${item}</li>`)
                        .join('')
                    return `<ul>${items}</ul>`
                }
                return `<p>${para}</p>`
            })
            .join('')

        return html
    }

    return {
        isOpen,
        messages,
        toggleChat,
        sendMessage
    }
}
