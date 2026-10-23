const ITUNES_API = "https://itunes.apple.com/search";
const FTU_API = "https://api.freetouse.com/v3";
const JAMENDO_API = "https://api.jamendo.com/v3.0/tracks/";

export function normalizeTrack(item) {
  return {
    id: String(item.trackId),
    title: item.trackName || "Unknown track",
    artist: item.artistName || "Unknown artist",
    album: item.collectionName || "",
    cover: (item.artworkUrl100 || "").replace("100x100", "400x400"),
    preview: item.previewUrl || "",
    audioUrl: "",
    link: item.trackViewUrl || "",
    source: "iTunes",
    duration: item.trackTimeMillis ? Math.round(item.trackTimeMillis / 1000) : 30
  };
}

function normalizeFtu(item) {
  const artistList = Array.isArray(item.artists) ? item.artists.map(a => Array.isArray(a) ? a[1]?.name : a?.name).filter(Boolean) : [];
  return {
    id: "ftu-" + item.id,
    title: item.title || "Unknown track",
    artist: artistList.join(", ") || "Independent artist",
    album: item.genre || "Free To Use",
    cover: item.thumbnails?.md || item.thumbnails?.sm || "",
    preview: "",
    audioUrl: item.is_premium ? "" : (item.files?.mp3 || ""),
    link: "https://freetouse.com/",
    source: "Free To Use",
    duration: Math.round(item.duration || 0),
    premium: Boolean(item.is_premium)
  };
}

function normalizeJamendo(item) {
  return {
    id: "jamendo-" + item.id,
    title: item.name || "Unknown track",
    artist: item.artist_name || "Unknown artist",
    album: item.album_name || "Jamendo",
    cover: item.album_image || item.image || "",
    preview: item.audio || "",
    audioUrl: item.audio || "",
    link: item.shareurl || "https://www.jamendo.com/",
    source: "Jamendo",
    duration: Number(item.duration) || 0,
    license: item.license_ccurl || ""
  };
}

async function getJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Music search is temporarily unavailable.");
  return response.json();
}

export async function searchTracks(term, limit = 24) {
  const url = new URL(ITUNES_API);
  url.searchParams.set("term", term);
  url.searchParams.set("entity", "song");
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("media", "music");
  const data = await getJson(url);
  return (data.results || []).map(normalizeTrack);
}

export async function searchFreeTracks(term, limit = 24) {
  const url = new URL(FTU_API + "/music/tracks/search");
  url.searchParams.set("query", term);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("order", "plays");
  url.searchParams.set("sort", "desc");
  const data = await getJson(url);
  return (data.data || []).map(normalizeFtu).filter(t => t.audioUrl && !t.premium);
}

export async function searchJamendoTracks(term, limit = 24) {
  let clientId = "";
  try { clientId = localStorage.getItem("soundify-jamendo-client-id") || ""; } catch (e) {}
  if (!clientId) throw new Error("Jamendo needs a free API client ID. Add it in Music sources settings.");
  const url = new URL(JAMENDO_API);
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("search", term);
  url.searchParams.set("audioformat", "mp32");
  url.searchParams.set("include", "licenses");
  const data = await getJson(url);
  return (data.results || []).map(normalizeJamendo).filter(t => t.audioUrl);
}
