// Change wedding information here. Leave unknown fields empty until details are confirmed.
const invitation = {
  groom: "박우진",
  bride: "김하나",
  dateLabel: "2027년 5월 15일",
  venue: "가족과 함께하는 작은 예식",
  address: "예식 장소와 시간은 가족분들께 개별 안내드립니다.",
  mapQuery: "", // Example: "서울특별시 중구 세종대로 110"
  musicUrl: "", // Optional local audio file path. Music never starts automatically.
  photos: [
    { crop: "crop-0", caption: "the beginning" },
    { crop: "crop-1", caption: "a little closer" },
    { crop: "crop-2", caption: "my favorite person" },
    { crop: "crop-3", caption: "and then, forever" }
  ]
};

document.querySelectorAll(".letter-names").forEach(el => { el.innerHTML = `${invitation.groom} <b>&</b> ${invitation.bride}`; });
document.querySelectorAll(".signature span")[0].textContent = invitation.groom;
document.querySelectorAll(".signature span")[1].textContent = invitation.bride;
document.querySelector(".date-value").textContent = invitation.dateLabel;
document.querySelector(".venue-name").textContent = invitation.venue;
document.querySelector(".venue-address").textContent = invitation.address;
document.querySelector(".footer-names").innerHTML = `${invitation.groom} <i>&</i> ${invitation.bride}`;

const envelope = document.querySelector(".envelope");
envelope.addEventListener("click", () => {
  const open = envelope.classList.toggle("is-open");
  envelope.setAttribute("aria-expanded", String(open));
  document.querySelector(".tap-hint").textContent = open ? "초대장이 열렸어요. 아래로 천천히 내려가 보세요" : "봉투를 눌러 초대장을 열어보세요";
  if (open) setTimeout(() => document.querySelector("#invitation").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }), 1050);
});

const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add("visible"); revealObserver.unobserve(entry.target); }
}), { threshold: .12 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

const toast = document.querySelector(".toast");
let toastTimer;
function showToast(message) {
  toast.textContent = message; toast.classList.add("show"); clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2300);
}
const lightbox = document.querySelector(".lightbox");
document.querySelectorAll(".photo-tile").forEach(tile => tile.addEventListener("click", () => {
  const index = Number(tile.dataset.photo);
  const photo = invitation.photos[index];
  const image = lightbox.querySelector(".lightbox-photo");
  image.className = `lightbox-photo crop ${photo.crop}`;
  lightbox.querySelector(".lightbox-caption").textContent = photo.caption;
  lightbox.showModal();
}));
document.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());

if (invitation.musicUrl) {
  const toggle = document.querySelector(".music-toggle");
  const audio = new Audio(invitation.musicUrl); audio.loop = true;
  toggle.hidden = false;
  toggle.addEventListener("click", async () => {
    if (audio.paused) { try { await audio.play(); toggle.querySelector(".music-label").textContent = "MUSIC ON"; toggle.setAttribute("aria-label", "배경 음악 끄기"); } catch { showToast("음악 파일을 열 수 없어요."); } }
    else { audio.pause(); toggle.querySelector(".music-label").textContent = "MUSIC OFF"; toggle.setAttribute("aria-label", "배경 음악 재생"); }
  });
}
