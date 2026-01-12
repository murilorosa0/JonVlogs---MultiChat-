const TWITCH_CHANNEL = 'jonvlogs'; // JonVlogs Twitch Channel
const DEFAULT_YT_ID = ''; // Placeholder

const twitchContainer = document.getElementById('twitch-container');
const youtubeContainer = document.getElementById('youtube-container');
const ytInput = document.getElementById('yt-video-id');
const updateBtn = document.getElementById('update-btn');

function getTwitchEmbedUrl() {
  const hostname = window.location.hostname || 'localhost';
  // Note: 'parent' is required for Twitch embeds. 
  // We add common localhost variants and an empty logic handle? 
  // Twitch requires exact parent matching.
  // For local development on Vite (default port 5173), we need to handle that.
  
  // Strategy: Add the current hostname as parent.
  return `https://www.twitch.tv/embed/${TWITCH_CHANNEL}/chat?parent=${hostname}&darkpopout`;
}

function getYouTubeEmbedUrl(videoId) {
  const hostname = window.location.hostname || 'localhost';
  return `https://www.youtube.com/live_chat?v=${videoId}&embed_domain=${hostname}&dark_theme=1`;
}

function init() {
  // Render Twitch Chat
  const twitchFrame = document.createElement('iframe');
  twitchFrame.src = getTwitchEmbedUrl();
  twitchContainer.appendChild(twitchFrame);

  // Initial YouTube setup (check URL params)
  const params = new URLSearchParams(window.location.search);
  const ytParam = params.get('ytId');
  if (ytParam) {
    ytInput.value = ytParam;
    updateYouTubeChat(ytParam);
  }
}

function updateYouTubeChat(videoId) {
  youtubeContainer.innerHTML = '';
  if (!videoId) {
      youtubeContainer.innerHTML = '<div class="placeholder-msg">Insira um ID de Live válido</div>';
      return;
  }
  
  const ytFrame = document.createElement('iframe');
  ytFrame.src = getYouTubeEmbedUrl(videoId);
  youtubeContainer.appendChild(ytFrame);
}

updateBtn.addEventListener('click', () => {
  const id = ytInput.value.trim();
  if (id) {
    // Update URL without reload
    const url = new URL(window.location);
    url.searchParams.set('ytId', id);
    window.history.pushState({}, '', url);
    updateYouTubeChat(id);
  }
});

// Init on load
init();
