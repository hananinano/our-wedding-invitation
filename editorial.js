const inviteData = {
  groom: "박우진",
  bride: "김하나",
  date: "2027년 5월 15일",
  venue: "가족과 함께하는 작은 예식",
  address: "예식 장소와 시간은 가족분들께 개별 안내드립니다.",
  mapQuery: "",
  photos: [
    { crop: "crop-0", caption: "the beginning" },
    { crop: "crop-1", caption: "a little closer" },
    { crop: "crop-2", caption: "my favorite person" },
    { crop: "crop-3", caption: "and then, forever" }
  ]
};

document.querySelector(".date-placeholder").textContent = inviteData.date;
document.querySelector(".date-helper").textContent = "토요일 · 가족과 함께하는 하루";
document.querySelector(".venue-placeholder").textContent = inviteData.venue;
document.querySelector(".detail-date").textContent = inviteData.date;
document.querySelector(".detail-place").textContent = inviteData.address;
document.querySelector(".names").innerHTML = `${inviteData.groom} <i>&</i> ${inviteData.bride}`;
document.querySelectorAll(".mail-slip strong, .contact-card i").forEach(el => { el.innerHTML = `${inviteData.groom} <i>&</i> ${inviteData.bride}`; });

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

const toast = document.querySelector(".toast");
let toastTimer;
function showToast(message){
  toast.textContent = message; toast.classList.add("show"); clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2300);
}
const lightbox = document.querySelector(".lightbox");
document.querySelectorAll(".photo-tile, .heart-photo, .instant-photo, .snapshot").forEach(tile => tile.addEventListener("click", () => {
  const photo = inviteData.photos[Number(tile.dataset.photo || "3")];
  lightbox.querySelector(".lightbox-photo").className = `lightbox-photo photo-crop ${photo.crop}`;
  lightbox.querySelector(".lightbox-caption").textContent = photo.caption;
  lightbox.showModal();
}));
document.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());

