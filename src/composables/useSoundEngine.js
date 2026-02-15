import { ref } from 'vue'

const audioCtx = ref(null)
const isMuted = ref(true)

export function useSoundEngine() {
    function init() {
        if (!audioCtx.value) {
            audioCtx.value = new (window.AudioContext || window.webkitAudioContext)()
        }
    }

    function toggle() {
        init()
        isMuted.value = !isMuted.value
    }

    function play(type) {
        if (isMuted.value || !audioCtx.value) return
        const ctx = audioCtx.value
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.connect(gain)
        gain.connect(ctx.destination)

        if (type === 'hover') {
            osc.type = 'sine'
            osc.frequency.setValueAtTime(800, ctx.currentTime)
            gain.gain.setValueAtTime(0.03, ctx.currentTime)
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1)
            osc.start(ctx.currentTime)
            osc.stop(ctx.currentTime + 0.1)
        } else if (type === 'click') {
            osc.type = 'square'
            osc.frequency.setValueAtTime(600, ctx.currentTime)
            osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.15)
            gain.gain.setValueAtTime(0.05, ctx.currentTime)
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15)
            osc.start(ctx.currentTime)
            osc.stop(ctx.currentTime + 0.15)
        } else if (type === 'send') {
            osc.type = 'triangle'
            osc.frequency.setValueAtTime(400, ctx.currentTime)
            osc.frequency.linearRampToValueAtTime(1200, ctx.currentTime + 0.2)
            gain.gain.setValueAtTime(0.04, ctx.currentTime)
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25)
            osc.start(ctx.currentTime)
            osc.stop(ctx.currentTime + 0.25)
        }
    }

    return { isMuted, toggle, play }
}
