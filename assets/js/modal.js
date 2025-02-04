export class VideoModal {
  constructor() {
    this.modal = null;
    this.createModal();
  }

  createModal() {
    // Create modal HTML
    const modalHTML = `
      <div id="videoModal" class="fixed inset-0 z-[9999] hidden">
        <div class="absolute inset-0 bg-black bg-opacity-75 transition-opacity"></div>
        <div class="fixed inset-0 z-10 flex items-center justify-center p-4">
          <div class="bg-white dark:bg-black-color rounded-lg w-full max-w-4xl mx-auto relative">
            <button class="modal-close absolute -top-4 -right-4 bg-primary-color text-white w-10 h-10 rounded-full flex items-center justify-center">
              ×
            </button>
            <div class="relative w-full" style="padding-bottom: 56.25%;">
              <iframe 
                id="videoFrame" 
                class="absolute top-0 left-0 w-full h-full rounded-lg"
                frameborder="0"
                allowfullscreen
                allow="autoplay; encrypted-media">
              </iframe>
            </div>
          </div>
        </div>
      </div>
    `;

    // Add modal to body
    document.body.insertAdjacentHTML("beforeend", modalHTML);

    this.modal = document.getElementById("videoModal");
    this.closeBtn = this.modal.querySelector(".modal-close");
    this.videoFrame = document.getElementById("videoFrame");

    // Add event listeners
    this.closeBtn.addEventListener("click", () => this.close());
    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal || e.target.classList.contains("bg-black")) {
        this.close();
      }
    });

    // Add keyboard event listener for ESC key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !this.modal.classList.contains("hidden")) {
        this.close();
      }
    });
  }

  open(videoUrl) {
    // Ensure the URL is in embed format
    const embedUrl = videoUrl.replace("watch?v=", "embed/");
    this.videoFrame.src = embedUrl;
    this.modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  close() {
    this.videoFrame.src = "";
    this.modal.classList.add("hidden");
    document.body.style.overflow = "";
  }
}
