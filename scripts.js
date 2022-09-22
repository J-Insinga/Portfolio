
document.querySelector('html').classList.remove('no-js')

document
  .querySelector('#mobile-menu-open')
  .addEventListener('click', function () {
    document.querySelector('header').classList.add('active')
    document.querySelector('body').classList.add('active')
  })

document
  .querySelector('#mobile-menu-close')
  .addEventListener('click', function () {
    document.querySelector('header').classList.remove('active')
    document.querySelector('body').classList.remove('active')
  })

let experiences = document.querySelectorAll('#experience-timeline > div')
for (let i = 0; i < experiences.length; i++) {
  let xp = experiences[i]
  let date = xp.getAttribute('data-date')
  xp.classList.add('vtimeline-content')
  let timeline = `<div class="vtimeline-point" id="xp-${i}">
      <div class="vtimeline-icon">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 23.728l-6.364-6.364a9 9 0 1 1 12.728 0L12 23.728zm4.95-7.778a7 7 0 1 0-9.9 0L12 20.9l4.95-4.95zM12 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/></svg>
      </div>
      <div class="vtimeline-block">
        <span class="vtimeline-date">${date}</span>
      </div>
    </div>`

  xp.insertAdjacentHTML('beforebegin', timeline)
  document.querySelector(`div#xp-${i} div.vtimeline-block`).appendChild(xp)
}

document.querySelector('#to-top').addEventListener('click', function () {
  scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  })
})

document.querySelector('#lead-down').addEventListener('click', function () {
  let top = document.querySelector('#about').offsetTop
  scrollTo({
    top,
    left: 0,
    behavior: 'smooth',
  })
})

let menuLinks = document.querySelectorAll('header a')
for (let j = 0; j < menuLinks.length; j++) {
  let link = menuLinks[j]
  let destination = document.querySelector(link.getAttribute('href'))
  link.addEventListener('click', function (e) {
    e.preventDefault()
    scrollTo({
      top: destination.offsetTop,
      left: 0,
      behavior: 'smooth',
    })

    if (document.querySelector('header').classList.contains('active')) {
      document.querySelector('header').classList.remove('active')
      document.querySelector('body').classList.remove('active')
    }
  })
}

const usedSkills = document.querySelectorAll('li.skill')
const uniqueUsedSkills = new Set()
const mainSkillsList = document.querySelector('#skills ul.skills-list')
for (let i = 0; i < usedSkills.length; i++) {
  const skill = usedSkills[i].innerText
  if (!uniqueUsedSkills.has(skill)) {
    uniqueUsedSkills.add(skill)
    mainSkillsList.insertAdjacentHTML(
      'beforeend',
      `<li class="skill">${skill}</li>`,
    )
  }
}

const btn = document.querySelector('button#dark-mode')
const currentTheme = localStorage.getItem('theme')
const sunIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z"/></svg>'
const moonIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-6.671-5.575A8 8 0 1 0 16.425 5.328a8.997 8.997 0 0 1-2.304 8.793 8.997 8.997 0 0 1-8.792 2.304z"/></svg>'

btn.innerHTML = ''
if (
  currentTheme === 'dark' ||
  (!currentTheme && window.matchMedia('(prefers-color-scheme: dark)').matches) // check user browser setting for dark mode
) {
  document.body.classList.add('dark-mode')
  btn.insertAdjacentHTML('afterbegin', sunIcon)
} else {
  btn.insertAdjacentHTML('afterbegin', moonIcon)
}

btn.addEventListener('click', function () {
  btn.innerHTML = ''
  document.body.classList.toggle('dark-mode')

  let theme = 'light'
  let icon = moonIcon

  if (document.body.classList.contains('dark-mode')) {
    theme = 'dark'
    icon = sunIcon
  }

  localStorage.setItem('theme', theme)
  btn.insertAdjacentHTML('afterbegin', icon)
})