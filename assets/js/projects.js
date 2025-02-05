import { data } from "./data.js";
import { VideoModal } from "./modal.js";
import { initializeContactForm } from "./contact.js";

document.addEventListener("DOMContentLoaded", function () {
  // Populate hero section data
  const profileName = document.getElementById("profileName");
  const profileSummary = document.getElementById("profileSummary");
  const linkedinLink = document.getElementById("linkedinLink");

  if (profileName) {
    profileName.textContent = data.profile.personal_info.name.split(" ")[0];
  }

  if (profileSummary) {
    profileSummary.textContent = data.profile.professional_summary;
  }

  if (linkedinLink) {
    linkedinLink.href = data.profile.personal_info.linkedin;
  }

  // Populate services section
  const servicesContainer = document.querySelector(".services-widget");

  if (servicesContainer) {
    const servicesHTML = data.services
      .map(
        (service, index) => `
        <div class="service-item px-15px lg:px-30px border dark:border-0 dark:border-b border-body-color dark:border-seondary-color relative z-10 group wow fadeInUp" data-wow-delay=".${
          index + 3
        }s">
          <a href="#" class="text-primary-color dark:text-white-color flex items-center gap-15px md:gap-5 flex-wrap md:flex-nowrap py-5 lg:py-30px group-hover:text-white">
            <span class="text-xl w-full md:w-[calc(40%-10px)] flex flex-wrap lg:flex-nowrap items-center gap-10px md:gap-5">
              <b class="service-sl-num text-primary-color group-hover:text-white transition-all duration-300">${(
                index + 1
              )
                .toString()
                .padStart(2, "0")}</b>
              <i class="${service.icon} text-2xl"></i>
              <b class="text-xl md:text-size-25 lg:text-3xl">${
                service.title
              }</b>
            </span>

            <span class="text-primary-color-light dark:text-body-color w-full md:w-[calc(45%-10px)] group-hover:text-white">
              ${service.description}
            </span>

            <i class="fas fa-arrow-right text-size-15 md:text-xl text-primary-color group-hover:text-white-color absolute top-[20%] md:top-1/2 right-5 lg:right-[55px] transition-all duration-300"></i>
          </a>
        </div>
      `
      )
      .join("");

    servicesContainer.innerHTML = `
      <div class="active-bg wow fadeInUp hidden sm:block" data-wow-delay=".6s"></div>
      ${servicesHTML}
    `;
  }

  // Populate experience section
  const experienceContent = document.getElementById("experienceContent");
  if (experienceContent) {
    const experienceHTML = data.profile.work_history
      .map(
        (job, index) => `
        <div class="resume-item wow fadeInLeft" data-wow-delay="${
          0.2 * index
        }s">
          <div class="resume-header">
            <div class="resume-icon">
              <i class="fas fa-briefcase"></i>
            </div>
            <h4 class="resume-title">${job.title}</h4>
            <span class="resume-date">${job.date}</span>
            <h5 class="resume-subtitle">
              ${job.company} - ${job.location}
            </h5>
            <ul class="resume-list">
              ${job.responsibilities.map((resp) => `<li>${resp}</li>`).join("")}
            </ul>
          </div>
        </div>
      `
      )
      .join("");

    experienceContent.innerHTML = experienceHTML;
  }

  // Populate education section
  const educationContent = document.getElementById("educationContent");
  if (educationContent) {
    const educationHTML = data.profile.education
      .map(
        (edu, index) => `
        <div class="resume-item wow fadeInRight" data-wow-delay="${
          0.2 * index
        }s">
          <div class="resume-header">
            <div class="resume-icon">
              <i class="fas fa-graduation-cap"></i>
            </div>
            <h4 class="resume-title">${edu.degree}</h4>
            <h5 class="resume-subtitle">
              ${edu.institution} - ${edu.location}
            </h5>
            <p class="resume-list">
              ${edu.details}
            </p>
          </div>
        </div>
      `
      )
      .join("");

    educationContent.innerHTML = educationHTML;
  }

  // Populate blogs section
  const blogsContainer = document.querySelector("#blogs .grid");
  const videoModal = new VideoModal();

  if (blogsContainer) {
    const blogsHTML = data.blogs
      .map(
        (blog, index) => `
        <div class="group relative flex flex-col items-center wow fadeInUp" data-wow-delay=".${
          index + 5
        }s">
          <div class="rounded-10px relative overflow-hidden w-full">
            <div class="rounded-10px overflow-hidden">
              <img src="${blog.image}" alt="${
          blog.title
        }" class="group-hover:scale-110 transition-all duration-500 h-[350px] w-full object-cover">
            </div>
            <span class="text-size-13 uppercase px-10px py-7px rounded-50px leading-1 absolute top-[15px] left-[15px] text-white-color bg-gradient-secondary-2 bg-200">
              ${blog.category}
            </span>
            <div class="absolute left-0 bottom-5 w-full px-10px lg:px-5 transition-all duration-500">
              <div class="relative z-0 p-15px pb-5 bg-white-color dark:bg-seondary-color rounded-15px w-full after:absolute after:top-0 after:left-0 after:w-full after:h-full after:opacity-0 group-hover:after:opacity-100 after:transition-all after:duration-500 after:z-1 after:bg-gradient-primary after:rounded-15px">
                <div class="relative z-10">
                  <div class="flex gap-5 items-center mb-2 justify-between">
                    <span class="text-sm font-medium text-primary-color group-hover:text-white-color transition-all duration-500">
                      <i class="fas fa-calendar-days mr-0.5"></i> ${blog.date}
                    </span>
                    <div class="flex gap-4">
                      ${
                        blog.videoUrl
                          ? `<button class="video-btn text-primary-color group-hover:text-white-color transition-all duration-500 hover:scale-110" data-video="${blog.videoUrl}">
                              <i class="fas fa-play-circle text-2xl"></i>
                            </button>`
                          : ""
                      }
                      ${
                        blog.githubUrl
                          ? `<a href="${blog.githubUrl}" target="_blank" class="text-primary-color group-hover:text-white-color transition-all duration-500 hover:scale-110">
                              <i class="fa-brands fa-github text-2xl"></i>
                            </a>`
                          : ""
                      }
                    </div>
                  </div>
                  <div class="text-primary-color-light dark:text-white-color group-hover:text-white-color w-full">
                    <h3 class="text-lg md:text-size-22 font-bold mb-3">
                      ${blog.title}
                    </h3>
                    <p class="text-sm line-clamp-3">
                      ${blog.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `
      )
      .join("");

    blogsContainer.innerHTML = blogsHTML;

    // Add event listeners for video buttons
    document.querySelectorAll(".video-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const videoUrl = btn.dataset.video;
        if (videoUrl) {
          videoModal.open(videoUrl);
        }
      });
    });
  }

  // Populate contact information
  const contactPhone = document.getElementById("contactPhone");
  const contactEmail = document.getElementById("contactEmail");
  const contactLocation = document.getElementById("contactLocation");

  if (contactPhone) {
    contactPhone.textContent = data.profile.personal_info.phone;
    contactPhone.href = `tel:${data.profile.personal_info.phone}`;
  }

  if (contactEmail) {
    contactEmail.textContent = data.profile.personal_info.email;
    contactEmail.href = `mailto:${data.profile.personal_info.email}`;
  }

  if (contactLocation) {
    contactLocation.textContent = data.profile.personal_info.location;
  }

  // Initialize contact form
  initializeContactForm();

  // Initialize odometer for stats
  const odometerElements = document.querySelectorAll(".odometer");
  odometerElements.forEach((element) => {
    const count = parseInt(element.getAttribute("data-count"));
    const odometer = new Odometer({
      el: element,
      value: 0,
      format: "",
    });
    odometer.update(count);
  });

  // Update stats with actual data
  const experienceOdometer = document.querySelector(
    '.odometer[data-count="1"]'
  );
  const projectsOdometer = document.querySelector('.odometer[data-count="15"]');

  if (experienceOdometer) {
    experienceOdometer.setAttribute(
      "data-count",
      data.profile.stats.experience.toString()
    );
    new Odometer({
      el: experienceOdometer,
      value: 0,
      format: "",
    }).update(data.profile.stats.experience);
  }

  if (projectsOdometer) {
    projectsOdometer.setAttribute(
      "data-count",
      data.profile.stats.projects.toString()
    );
    new Odometer({
      el: projectsOdometer,
      value: 0,
      format: "",
    }).update(data.profile.stats.projects);
  }
});
