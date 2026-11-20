const inviteData = {
  groom: "신랑 이름",
  bride: "신부 이름",
  date: "[날짜와 시간 입력]",
  venue: "[예식장 이름]",
  address: "[주소 입력]",
  mapQuery: "",
  photos: [
    { crop: "crop-0", caption: "the beginning" },
    { crop: "crop-1", caption: "a little closer" },
    { crop: "crop-2", caption: "my favorite person" },
    { crop: "crop-3", caption: "and then, forever" }
  ]
};

document.querySelector(".date-placeholder").textContent = inviteData.date.startsWith("[") ? "예식 날짜" : inviteData.date;
document.querySelector(".date-helper").textContent = inviteData.date.startsWith("[") ? "날짜를 입력해 주세요" : "두 사람이 부부가 되는 날";
document.querySelector(".venue-placeholder").textContent = inviteData.venue.startsWith("[") ? `${inviteData.venue} · ${inviteData.address}` : `${inviteData.venue} · ${inviteData.address}`;
document.querySelector(".detail-date").textContent = inviteData.date;
document.querySelector(".detail-place").innerHTML = `${inviteData.venue}<br>${inviteData.address}`;
document.querySelector(".names").innerHTML = `${inviteData.groom} <i>&</i> ${inviteData.bride}`;

const progress = document.querySelector(".progress-line span");
function updateProgress(){
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${max > 0 ? Math.min(100, scrollY / max * 100) : 0}%`;
}
addEventListener("scroll", updateProgress, { passive:true });
addEventListener("resize", updateProgress);
updateProgress();

const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if(entry.isIntersecting){ entry.target.classList.add("visible"); revealObserver.unobserve(entry.target); }
}), { threshold:.13 });
document.querySelectorAll(".reveal").forEach(item => revealObserver.observe(item));

const miniEnvelope = document.querySelector(".mini-envelope");
miniEnvelope.addEventListener("click", () => {
  const isOpen = miniEnvelope.classList.toggle("is-open");
  miniEnvelope.setAttribute("aria-expanded", String(isOpen));
});

const mapLink = document.querySelector(".map-link");
const copyButton = document.querySelector(".copy-address");
if(inviteData.mapQuery.trim()){
  mapLink.href = `https://map.naver.com/p/search/${encodeURIComponent(inviteData.mapQuery)}`;
  mapLink.removeAttribute("aria-disabled");
  copyButton.disabled = false;
}
const toast = document.querySelector(".toast");
let toastTimer;
function showToast(message){
  toast.textContent = message; toast.classList.add("show"); clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2300);
}
copyButton.addEventListener("click", async () => {
  try { await navigator.clipboard.writeText(inviteData.address); showToast("주소를 복사했어요."); }
  catch { showToast("보안 연결에서 주소 복사가 가능합니다."); }
});

const lightbox = document.querySelector(".lightbox");
document.querySelectorAll(".photo-tile").forEach(tile => tile.addEventListener("click", () => {
  const photo = inviteData.photos[Number(tile.dataset.photo || "3")];
  lightbox.querySelector(".lightbox-photo").className = `lightbox-photo photo-crop ${photo.crop}`;
  lightbox.querySelector(".lightbox-caption").textContent = photo.caption;
  lightbox.showModal();
}));
document.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());

const rsvp = document.querySelector(".rsvp-dialog");
document.querySelector("#rsvp-open").addEventListener("click", () => rsvp.showModal());
rsvp.addEventListener("close", () => {
  if(rsvp.returnValue === "submit") showToast("미리보기 회신이 확인됐어요. 실제 전송은 되지 않았습니다.");
});
