import { ref, watch } from 'vue'

const theme = ref(localStorage.getItem('portfolio_theme') || 'default')
const layout = ref(localStorage.getItem('portfolio_layout') || 'quantum')
const isDark = ref(localStorage.getItem('portfolio_mode') !== 'light')

function applyTheme() {
    if (theme.value === 'default') {
        document.documentElement.removeAttribute('data-theme')
    } else {
        document.documentElement.setAttribute('data-theme', theme.value)
    }
}

function applyLayout() {
    document.body.setAttribute('data-layout', layout.value)
}

function applyMode() {
    if (isDark.value) {
        document.body.classList.remove('light-mode')
    } else {
        document.body.classList.add('light-mode')
    }
}

export function useTheme() {
    // Apply on first call
    applyTheme()
    applyLayout()
    applyMode()

    function setTheme(name) {
        theme.value = name
        localStorage.setItem('portfolio_theme', name)
        applyTheme()
    }

    function setLayout(name) {
        layout.value = name
        localStorage.setItem('portfolio_layout', name)
        applyLayout()
    }

    function toggleMode() {
        isDark.value = !isDark.value
        localStorage.setItem('portfolio_mode', isDark.value ? 'dark' : 'light')
        applyMode()
    }

    return { theme, layout, isDark, setTheme, setLayout, toggleMode }
}
