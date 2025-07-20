// Audio Manager
class AudioManager {
  constructor() {
    this.glitchMusic = document.getElementById("glitch-music");
    this.voiceover = document.getElementById("voiceover");
    this.pageTurn = document.getElementById("page-turn");
    
    this.toggleMusicBtn = document.getElementById("toggle-music");
    this.toggleVoiceBtn = document.getElementById("toggle-voice");
    
    this.musicEnabled = true;
    this.voiceEnabled = true;
    this.experienceStarted = false;
    
    this.init();
  }

  init() {
    // Set initial volumes
    if (this.glitchMusic) this.glitchMusic.volume = 0.3;
    if (this.voiceover) this.voiceover.volume = 0.7;
    if (this.pageTurn) this.pageTurn.volume = 0.5;

    // Add event listeners
    this.toggleMusicBtn?.addEventListener("click", () => this.toggleMusic());
    this.toggleVoiceBtn?.addEventListener("click", () => this.toggleVoice());

    // Handle audio loading errors gracefully
    this.setupErrorHandling();
    
    // Create synthetic audio if files don't exist
    this.createSyntheticAudio();
  }

  setupErrorHandling() {
    [this.glitchMusic, this.voiceover, this.pageTurn].forEach(audio => {
      if (audio) {
        audio.addEventListener('error', (e) => {
          console.log('Audio file not found, using synthetic audio');
        });
      }
    });
  }

  createSyntheticAudio() {
    // Create synthetic background music using Web Audio API
    if (!this.glitchMusic?.src || this.glitchMusic?.error) {
      this.createSyntheticMusic();
    }
    
    // Create synthetic page turn sound
    if (!this.pageTurn?.src || this.pageTurn?.error) {
      this.createSyntheticPageTurn();
    }
  }

  createSyntheticMusic() {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Create ethereal ambient layers for portal travel
      const createAmbientLayer = (frequency, volume = 0.08, type = 'sine') => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        const filter = audioContext.createBiquadFilter();
        const reverb = audioContext.createConvolver();
        
        oscillator.type = type;
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        
        // Soft low-pass filter for warmth
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1200, audioContext.currentTime);
        filter.Q.setValueAtTime(0.5, audioContext.currentTime);
        
        // Gentle fade in
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 4);
        
        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        return { oscillator, gainNode, filter, frequency: frequency };
      };

      // Create pad layers for portal ambience
      const createPad = (baseFreq, volume = 0.06) => {
        const oscillator1 = audioContext.createOscillator();
        const oscillator2 = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        const filter = audioContext.createBiquadFilter();
        
        oscillator1.type = 'sine';
        oscillator2.type = 'triangle';
        oscillator1.frequency.setValueAtTime(baseFreq, audioContext.currentTime);
        oscillator2.frequency.setValueAtTime(baseFreq * 1.005, audioContext.currentTime); // Slight detune for richness
        
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, audioContext.currentTime);
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 6);
        
        oscillator1.connect(filter);
        oscillator2.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        return { oscillator1, oscillator2, gainNode, filter };
      };

      this.syntheticMusic = {
        context: audioContext,
        layers: [],
        pads: [],
        start: () => {
          if (audioContext.state === 'suspended') {
            audioContext.resume();
          }
          
          // Deep ambient foundation (very low frequencies)
          const baseLayers = [
            { freq: 32.7, vol: 0.04, type: 'sine' },    // C1 - Deep foundation
            { freq: 65.4, vol: 0.05, type: 'sine' },    // C2 - Low warmth
            { freq: 98.0, vol: 0.04, type: 'triangle' }, // G2 - Harmonic
            { freq: 130.8, vol: 0.03, type: 'sine' }    // C3 - Mid foundation
          ];
          
          baseLayers.forEach((layer, index) => {
            const ambientLayer = createAmbientLayer(layer.freq, layer.vol, layer.type);
            ambientLayer.oscillator.start();
            this.syntheticMusic.layers.push(ambientLayer);
          });
          
          // Ethereal pad layers (higher frequencies for atmosphere)
          const padFreqs = [261.6, 329.6, 392.0]; // C4, E4, G4 - Major triad
          padFreqs.forEach((freq, index) => {
            const pad = createPad(freq, 0.03 + index * 0.01);
            pad.oscillator1.start();
            pad.oscillator2.start();
            this.syntheticMusic.pads.push(pad);
          });
          
          // Subtle modulation for organic feel
          setInterval(() => {
            if (this.syntheticMusic.layers.length === 0) return;
            
            this.syntheticMusic.layers.forEach((layer, index) => {
              const time = audioContext.currentTime;
              const slowWave = Math.sin(time * 0.05 + index * 0.7) * 0.01;
              const baseVol = [0.04, 0.05, 0.04, 0.03][index] || 0.03;
              layer.gainNode.gain.setValueAtTime(baseVol + slowWave, time);
              
              // Subtle frequency modulation for movement
              const freqMod = Math.sin(time * 0.03 + index * 1.2) * 0.5;
              layer.oscillator.frequency.setValueAtTime(layer.frequency + freqMod, time);
            });
            
            // Modulate pad layers too
            this.syntheticMusic.pads.forEach((pad, index) => {
              const time = audioContext.currentTime;
              const breathe = Math.sin(time * 0.08 + index * 0.5) * 0.008;
              const baseVol = 0.03 + index * 0.01;
              pad.gainNode.gain.setValueAtTime(baseVol + breathe, time);
            });
          }, 200);
        },
        stop: () => {
          this.syntheticMusic.layers.forEach(layer => {
            try {
              layer.oscillator.stop();
            } catch (e) {}
          });
          this.syntheticMusic.pads.forEach(pad => {
            try {
              pad.oscillator1.stop();
              pad.oscillator2.stop();
            } catch (e) {}
          });
          this.syntheticMusic.layers = [];
          this.syntheticMusic.pads = [];
        }
      };
    } catch (error) {
      console.log('Web Audio API not supported');
    }
  }

  createSyntheticPageTurn() {
    this.syntheticPageTurn = () => {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        const filter = audioContext.createBiquadFilter();
        
        oscillator.type = 'white';
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
        
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(1000, audioContext.currentTime);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.3);
      } catch (error) {
        console.log('Could not create synthetic page turn sound');
      }
    };
  }

  startExperience() {
    if (this.experienceStarted) return;
    this.experienceStarted = true;

    // Don't auto-start music - let user control it
    console.log('Experience started - music controls available');

    // Don't auto-start voiceover - let user control it
    console.log('Voiceover controls available');
  }

  startSyntheticMusic() {
    if (this.syntheticMusic && this.musicEnabled) {
      this.syntheticMusic.start();
    }
  }

  toggleMusic() {
    this.musicEnabled = !this.musicEnabled;
    this.toggleMusicBtn.classList.toggle("muted", !this.musicEnabled);

    if (this.musicEnabled) {
      if (this.experienceStarted) {
        if (this.glitchMusic && !this.glitchMusic.error) {
          this.glitchMusic.play().catch(() => this.startSyntheticMusic());
        } else {
          this.startSyntheticMusic();
        }
      }
    } else {
      if (this.glitchMusic) this.glitchMusic.pause();
      if (this.syntheticMusic) this.syntheticMusic.stop();
    }
  }

  toggleVoice() {
    this.voiceEnabled = !this.voiceEnabled;
    this.toggleVoiceBtn.classList.toggle("muted", !this.voiceEnabled);

    if (this.voiceover) {
      if (this.voiceEnabled) {
        if (this.experienceStarted) {
          this.voiceover.play().catch(() => {
            console.log('Could not play voiceover');
          });
        }
      } else {
        this.voiceover.pause();
      }
    }
  }

  playPageTurn() {
    if (this.pageTurn && !this.pageTurn.error) {
      this.pageTurn.currentTime = 0;
      this.pageTurn.play().catch(() => {
        if (this.syntheticPageTurn) {
          this.syntheticPageTurn();
        }
      });
    } else if (this.syntheticPageTurn) {
      this.syntheticPageTurn();
    }
  }
}

// Initialize audio manager
window.audioManager = new AudioManager();