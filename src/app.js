var $ = require('jquery');

import './style.scss'

import codeURL from './code.png'
const img = document.createElement('img')
img.src = codeURL
img.style.backgroundColor = "#2B3A42"
img.style.padding = "20px"
img.width = 32
document.body.appendChild(img)

const root = document.querySelector('#root')
root.innerHTML = '<p>Hello webpack.</p>'
